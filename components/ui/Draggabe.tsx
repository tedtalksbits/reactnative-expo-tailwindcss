import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';

interface ReactQueryFloatingDebuggerProps
  extends React.ComponentPropsWithRef<typeof Animated.View> {
  children?: React.ReactNode;
}
const FloatingDebugPanel = ({
  style,
  children,
  ...props
}: ReactQueryFloatingDebuggerProps) => {
  const [isShowing, setIsShowing] = React.useState(false);

  // Animated value for dragging
  const pan = useRef(new Animated.ValueXY()).current;

  // PanResponder to handle drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      // When the gesture ends, extract the offset so you can drag from where you left off
      onPanResponderRelease: (e, gestureState) => {
        pan.extractOffset();
      },
    })
  ).current;

  function handleShow() {
    setIsShowing(!isShowing);
  }

  if (process.env.NODE_ENV !== 'development') return null;

  // If not showing, return a button to show the debug panel
  if (!isShowing) {
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 200,
            right: 0,
            zIndex: 1000,
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers} // Attach the pan gesture to this view
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: 'orange',
            borderRadius: 10,
          }}
          onPress={handleShow}
        >
          <Ionicons name='bug' size={24} color='black' />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 200,
          right: 0,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          zIndex: 1000,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
        style,
      ]}
      {...panResponder.panHandlers} // Attach the pan gesture to the debug panel
      {...props}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: -30,
          left: -20,
          padding: 10,
          backgroundColor: 'orange',
          borderRadius: 10,
        }}
        onPress={handleShow}
      >
        <MaterialCommunityIcons name='minus' size={24} color='white' />
      </TouchableOpacity>
      <DebugText
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Floating Debugger
      </DebugText>
      {children}
    </Animated.View>
  );
};

interface DebugTextProps
  extends React.ComponentPropsWithRef<typeof Animated.Text> {
  property?: string;
  value?: boolean | number | string;
}
const DebugText = ({ property, value, children, ...props }: DebugTextProps) => {
  // Animated value to handle color flash
  const colorAnim = useRef(new Animated.Value(0)).current;

  // Effect to animate when the value changes
  useEffect(() => {
    // Trigger the animation when value changes
    Animated.sequence([
      Animated.timing(colorAnim, {
        toValue: 1, // Flash to highlight color
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: 0, // Return to normal color
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  // Interpolate the animated value into colors
  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#FF0000'], // From black to red and back
  });
  if (children) {
    return (
      <Animated.Text {...props} style={[props.style, DebugTextStyles.text]}>
        {children}
      </Animated.Text>
    );
  }
  return (
    <Animated.Text
      {...props}
      style={[props.style, DebugTextStyles.text, { color: interpolatedColor }]}
    >
      {property}: {value?.toString()}
    </Animated.Text>
  );
};

const DebugTextStyles = StyleSheet.create({
  text: {
    fontFamily: 'American Typewriter',
  },
});

export { FloatingDebugPanel, DebugText };
