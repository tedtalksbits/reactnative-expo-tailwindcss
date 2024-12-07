import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';

interface CollapseTriggerProps {
  children: React.ReactNode;
  onToggle: () => void;
  expanded: boolean;
}

interface CollapseContentProps {
  children: React.ReactNode;
  expanded: boolean;
}

const CollapseTrigger = ({
  children,
  onToggle,
  expanded,
}: CollapseTriggerProps) => {
  const rotateAnimation = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const handlePress = () => {
    onToggle();
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.trigger}>
        {children}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialCommunityIcons name='chevron-down' size={24} color='black' />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CollapseContent = ({ children, expanded }: CollapseContentProps) => {
  const [height, setHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? height : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View
      style={[styles.content, { maxHeight: animation }]}
      onLayout={({ nativeEvent }) => {
        if (!height) setHeight(nativeEvent.layout.height);
      }}
    >
      <View>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // Convert your Tailwind CSS classes to equivalent React Native style properties
  },
  content: {
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 'auto',
  },
  // Add styles for text, SVG icon, and other elements as needed
});

export { CollapseTrigger, CollapseContent };
