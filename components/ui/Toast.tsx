import { FontAwesome } from '@expo/vector-icons';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Toast, ToastContextData, ToastProviderProps } from '@/types/toaster';
import { Theme, ThemeColors, useTheme } from '@/hooks/theme/useTheme';

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  const { addToast, removeToast } = context;

  const toast = {
    success: ({
      title,
      description,
      icon,
      action,
    }: Omit<Toast, 'id' | 'type'>) =>
      addToast({ title, description, icon, type: 'success', action }),
    info: ({ title, description, icon, action }: Omit<Toast, 'id' | 'type'>) =>
      addToast({ title, description, icon, type: 'info', action }),
    warning: ({
      title,
      description,
      icon,
      action,
    }: Omit<Toast, 'id' | 'type'>) =>
      addToast({ title, description, icon, type: 'warning', action }),
    destructive: ({
      title,
      description,
      icon,
      action,
    }: Omit<Toast, 'id' | 'type'>) =>
      addToast({ title, description, icon, type: 'destructive', action }),
  };

  return { toast, removeToast };
};

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [offset, setOffset] = useState(40); // offset will be used to position toasts, each toast will be slightly higher than the previous one

  const addToast = (toast: Omit<Toast, 'id'>) => {
    // limit toasts to 3
    if (toasts.length >= 3) {
      removeToast(toasts[0].id);
    }
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <View>
        {toasts.map((toast, i) => (
          <Toaster
            key={toast.id}
            toast={toast}
            offset={offset + i * (TOAST_HEIGHT - 40)}
            index={i}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

// Toast component
const Toaster = ({
  toast,
  offset,
  index,
}: {
  toast: Toast;
  offset?: number;
  index: number;
}) => {
  const { colors } = useTheme();
  const [animation] = useState(new Animated.Value(0)); // initial value for opacity: 0
  const { type, title, description, icon } = toast;
  const { removeToast } = useToast();
  // we can update the colors to match our brand
  const bgClassName = {
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    destructive: colors.destructive,
  }[type];

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, getsterState) => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log('moving', gestureState);
        const { dy } = gestureState;
        if (dy > 0) {
          console.log('swiping down', dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('released', gestureState);
        const { dy } = gestureState;
        // check if the gesture is a swipe down
        if (dy > 50) {
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            removeToast(toast.id);
          });
        }
      },
    })
  ).current;

  useEffect(() => {
    // Start the animation when the component mounts
    Animated.sequence([
      // Step 1: Fade in and slide up
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [animation, removeToast, toast.id]);

  // Step 2: Fade out after 5 seconds
  setTimeout(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      removeToast(toast.id);
    });
  }, 5000);

  // Calculate the Y position for slide animation
  const translateY = animation.interpolate({
    inputRange: [0, 1], // Opacity from 0 to 1
    outputRange: [20, 0], // Slide up from 20 to 0
  });

  const successIcon = (
    <FontAwesome
      name='check-circle'
      size={24}
      color={colors['secondary-foreground']}
    />
  );
  const infoIcon = (
    <FontAwesome
      name='info-circle'
      size={24}
      color={colors['info-foreground']}
    />
  );
  const warningIcon = (
    <FontAwesome
      name='exclamation-circle'
      size={24}
      color={colors['warning-foreground']}
    />
  );
  const destructiveIcon = (
    <FontAwesome
      name='exclamation-circle'
      size={24}
      color={colors['destructive-foreground']}
    />
  );

  const iconMap = {
    success: successIcon,
    info: infoIcon,
    warning: warningIcon,
    destructive: destructiveIcon,
  };

  const toastIcon = icon || iconMap[type];

  const themeStyles = styles(colors);

  return (
    <Animated.View
      style={[
        themeStyles.base,
        {
          backgroundColor: bgClassName,
          bottom: offset,
          opacity: animation,
          transform: [{ translateY }], // Bind translateY to animated value
        },
      ]}
    >
      <View
        style={themeStyles.contentContainer}
        // dismiss toast when user taps on it
        // onTouchStart={() => {
        //   Animated.timing(animation, {
        //     toValue: 0,
        //     duration: 300,
        //     useNativeDriver: true,
        //   }).start(() => {
        //     removeToast(toast.id);
        //   });
        // }}

        //dismiss toast when user swipes down
        {...panResponder.panHandlers}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {toastIcon && (
            <Text style={themeStyles.iconContainer}>{toastIcon}</Text>
          )}
          <Text style={themeStyles.title}>
            {title.length > 32 ? title.substring(0, 32) + '...' : title}
          </Text>
        </View>
        {description && (
          <Text style={themeStyles.description}>{description}</Text>
        )}
      </View>
      <View
        style={themeStyles.iconContainer}
        onTouchStart={() => {
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            removeToast(toast.id);
          });
        }}
      >
        {toast.action ? (
          <TouchableOpacity
            style={[
              themeStyles.iconContainer,
              themeStyles.toastActionIconContainer,
            ]}
            onPress={() => {
              toast.action && toast.action.onPress();
              removeToast(toast.id);
            }}
          >
            <Text style={[themeStyles.toastActionLabel]}>
              {toast.action.label}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              padding: 10,
            }}
          >
            <FontAwesome name='times' size={20} color={colors.foreground} />
          </Text>
        )}
      </View>
    </Animated.View>
  );
};
const TOAST_WIDTH = Math.min(Dimensions.get('window').width - 40, 400);
const TOAST_INNER_PADDING = 20;
const TOAST_HEIGHT = 30 + TOAST_INNER_PADDING * 2;
const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    base: {
      position: 'absolute',
      bottom: 40,
      left: Dimensions.get('window').width / 2 - TOAST_WIDTH / 2, // center toast horizontally by dividing screen width by 2 and subtracting half of toast width
      flexDirection: 'row',
      // height: TOAST_HEIGHT,
      width: TOAST_WIDTH,
      borderRadius: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    contentContainer: {
      paddingHorizontal: 25,
      paddingVertical: TOAST_INNER_PADDING,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
      color: theme.foreground,
      width: '100%',
    },
    description: {
      color: theme.foreground,
      fontSize: 14,
      width: '100%',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,
      marginBottom: 2,
    },
    toastActionLabel: {
      color: theme.foreground,
      fontWeight: 'bold',
      padding: 10,
    },
    toastActionIconContainer: {
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 10,
    },
  });

export { ToastProvider };
