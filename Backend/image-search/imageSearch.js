const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const tf = require('@tensorflow/tfjs-node');
const { Image } = require('image-js');

const torch = require('torch')

const imagesDir = "../Backend/uploads";
const modelWeightsDir = "E:/model_weights_edir";

// Load the ResNet18 model
const model = await tf.loadLayersModel('file://' + modelWeightsDir);
model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=True)


// Read the list of image files
const images = fs.readdirSync(imagesDir);

const allNames = [];
let allVecs = null;

// Define the image transformation pipeline
const transformImage = async (imagePath) => {
    const image =  Image.load(imagePath);
    const resizedImage =  image.resize({ width: 256, height: 256 });
    const normalizedImage = resizedImage.normalize();
    return normalizedImage;
}

// Define the hook to capture activation
const activation = {};
const getActivation = (name) => {
    return (model, input, output) => {
        activation[name] = output.dataSync();
    };
};

model.getLayer('avgpool').call = getActivation("avgpool");

// Process each image
for (let i = 0; i < images.length; i++) {
    try {
        const imagePath = `${imagesDir}/${images[i]}`;
        const imgTensor =  transformImage(imagePath);
        const out = model.predict(imgTensor.expandDims());

        const vec = Array.from(activation["avgpool"]).map(e => [e]);
        if (allVecs === null) {
            allVecs = vec;
        } else {
            allVecs = allVecs.concat(vec);
        }
        allNames.push(images[i]);
    } catch (error) {
        console.error("Error processing image:", error);
        continue;
    }

    if (i % 100 === 0 && i !== 0) {
        console.log(i, "done");
    }
}

// Save the processed data
fs.writeFileSync('all_vecs.json', JSON.stringify(allVecs));
fs.writeFileSync('all_names.json', JSON.stringify(allNames));

console.log("Processing completed.");
