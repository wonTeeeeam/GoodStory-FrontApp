import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const hs = size => (width / guidelineBaseWidth) * size;
const vs = size => (height / guidelineBaseHeight) * size;
const ss = (size, factor = 0.5) => size + (hs(size) - size) * factor;

export {hs, vs, ss};
