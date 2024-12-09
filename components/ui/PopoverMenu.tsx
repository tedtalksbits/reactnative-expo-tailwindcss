import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { cn } from '@/lib/utils'; // Assuming cn is your utility for combining classNames
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './Button'; // Assuming Button is another component

// Define popover menu variants using cva for styling
const popoverMenuVariants = cva(
  'absolute bg-background border border-border rounded-lg shadow-lg',
  {
    variants: {
      variant: {
        default: 'w-48',
        small: 'w-36',
        large: 'w-64',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const popoverItemVariants = cva(
  'px-4 py-2 text-sm text-foreground cursor-pointer',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted',
        danger: 'hover:bg-danger text-danger-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface PopoverMenuProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  targetRef: React.RefObject<any>;
  variant?: 'default' | 'small' | 'large';
  position?: 'top' | 'bottom' | 'left' | 'right'; // New prop for position
}

const PopoverMenu = ({
  open,
  onClose,
  children,
  targetRef,
  variant,
  position = 'bottom',
}: PopoverMenuProps) => {
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Use onLayout to get the position and size of the trigger
  const onLayout = (event: any) => {
    const layout = event.nativeEvent.layout;
    let top, left;

    // Calculate position based on the desired popover position
    switch (position) {
      case 'top':
        top = layout.y - 10; // Adjust the vertical positioning to be above the trigger
        left = layout.x + layout.width / 2 - 100; // Center horizontally
        break;
      case 'bottom':
        top = layout.y + layout.height + 10; // Adjust vertical positioning to be below the trigger
        left = layout.x + layout.width / 2 - 100; // Center horizontally
        break;
      case 'left':
        top = layout.y + layout.height / 2 - 50; // Center vertically
        left = layout.x - 110; // Position to the left of the trigger
        break;
      case 'right':
        top = layout.y + layout.height / 2 - 50; // Center vertically
        left = layout.x + layout.width + 10; // Position to the right of the trigger
        break;
      default:
        top = layout.y + layout.height + 10; // Default to bottom
        left = layout.x + layout.width / 2 - 100;
        break;
    }

    setPopoverPosition({ top, left });
  };

  return (
    <Modal
      transparent={true}
      visible={open}
      onRequestClose={onClose}
      animationType='fade'
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.popover,
              { top: popoverPosition.top, left: popoverPosition.left },
            ]}
            className={cn(popoverMenuVariants({ variant }))}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface PopoverMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof popoverItemVariants> {
  onPress: () => void;
  label: string;
}

const PopoverMenuItem = ({
  onPress,
  label,
  className,
  variant,
  ...props
}: PopoverMenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(popoverItemVariants({ variant }), className)}
      {...props}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const PopoverButton = React.forwardRef(
  ({ onPress, label }: { onPress: () => void; label: string }, ref) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        className='px-4 py-2 bg-primary text-primary-foreground rounded-lg'
        ref={ref}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  }
);

PopoverButton.displayName = 'PopoverButton';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for the modal
  },
  popover: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export { PopoverMenu, PopoverMenuItem, PopoverButton };
