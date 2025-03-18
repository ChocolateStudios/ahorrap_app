import { Easing } from 'react-native-reanimated';

export const animationConfigs = {
  spring: {
    damping: 10,
    stiffness: 100,
  },
  timing: {
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
};

export const calculateResistance = (
  translation: number,
  resistance = 0.4
): number => {
  return translation * resistance;
}; 