import React from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface AnimatedPressableProps extends PressableProps {
    style?: ViewStyle | ViewStyle[];
    children: React.ReactNode;
}

const AnimatedPressable: React.FC<AnimatedPressableProps> = ({ onPress, children, style }) => {
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(1.2, {
            damping: 2,
            stiffness: 150,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View style={[animatedStyle, style]}>
            <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                {children}
            </Pressable>
        </Animated.View>
    );
};

export default AnimatedPressable;