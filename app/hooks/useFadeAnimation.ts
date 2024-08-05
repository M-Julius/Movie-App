import { useEffect } from "react";
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const useFadeAnimation = (visible: boolean, duration: number = 500) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration });
  }, [visible, opacity, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return animatedStyle;
};

export default useFadeAnimation;