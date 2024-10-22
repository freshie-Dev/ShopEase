function getComplementaryColor(hexColor) {
  if (!hexColor) return "";
  // Convert hex to RGB
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // Find complementary RGB values
  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;

  // Convert complementary RGB to hex
  const compHex = `#${compR.toString(16).padStart(2, "0")}${compG
    .toString(16)
    .padStart(2, "0")}${compB.toString(16).padStart(2, "0")}`;

  return compHex;
}

const sortProducts = (duplicateImages, productId) => {
  return (duplicateImages = duplicateImages.sort((a, b) => {
    const idA = a.userId;
    const idB = b.userId;

    if (idA.startsWith(productId) && !idB.startsWith(productId)) {
      return -1; // 'a' should appear before 'b'
    } else if (!idA.startsWith(productId) && idB.startsWith(productId)) {
      return 1; // 'b' should appear before 'a'
    } else {
      return 0; // maintain original order
    }
  }));
};

const maxStock = (colorName, sizeName, product) => {
  if (colorName && sizeName) {
    let stock = product.attributes
      .filter((attr) => attr.colorName === colorName) // Filter attributes based on colorName
      .map(
        (attr) => attr.size.find((size) => size.sizeName === sizeName)?.stock
      );
    stock = stock.flat().toString();
    return stock;
  }
};

const formatDate = (dateString) => {
  const dateTime = new Date(dateString);
  const date = dateTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = dateTime.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour format (AM/PM)
  });

  return <div className="flex flex-col items-start">
    <h1>{date}</h1>
    <h1>{time}</h1>
  </div>
};
const formatDate2 = (dateString) => {
  const dateTime = new Date(dateString);
  const date = dateTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = dateTime.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour format (AM/PM)
  });

  return <span className="flex items-start gap-2">
    <h1>{date}</h1>
    <h1>{time}</h1>
  </span>
};
export { getComplementaryColor, sortProducts, maxStock, formatDate, formatDate2 };
