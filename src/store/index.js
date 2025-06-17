
import { proxy } from 'valtio'

const state = proxy({
    intro: true, // mean homepage is intro page
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default state; 