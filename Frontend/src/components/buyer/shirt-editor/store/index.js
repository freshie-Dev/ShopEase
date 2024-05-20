import { proxy } from 'valtio';
import threejslogo from "../assets/threejs.png"

const state = proxy({
  intro: false,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: threejslogo,
  fullDecal: threejslogo,
});

export default state;