import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Accordion Style Variants using cva
const accordionItemVariants = cva('border-b', {
  variants: {
    variant: {
      default: 'border-border',
      primary: 'border-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
      },
      size: {
        default: 'text-lg',
        sm: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const accordionContentVariants = cva('overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-card',
      secondary: 'bg-secondart',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof accordionItemVariants> {}

const AccordionItem = ({
  className,
  children,
  variant,
  ...props
}: AccordionItemProps) => (
  <View
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  >
    {children}
  </View>
);

AccordionItem.displayName = 'AccordionItem';

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof accordionTriggerVariants> {
  label?: string;
  onPress: () => void;
}

const AccordionTrigger = ({
  label,
  onPress,
  className,
  variant,
  size,
  ...props
}: AccordionTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsOpen((prev) => !prev);
        onPress();
      }}
      className={cn(
        accordionTriggerVariants({ variant, size }),
        'px-4',
        className
      )}
      {...props}
    >
      <Text>{label}</Text>
      <MaterialCommunityIcons
        name='chevron-down'
        size={24}
        color='black'
        className={cn('transform rotate-0', {
          'transform rotate-90': isOpen,
        })}
      />
    </TouchableOpacity>
  );
};

AccordionTrigger.displayName = 'AccordionTrigger';

interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof Animated.View>,
    VariantProps<typeof accordionContentVariants> {
  isOpen: boolean;
}
const AccordionContent = ({
  isOpen,
  children,
  className,
  variant,
  ...props
}: AccordionContentProps) => {
  const [height, setHeight] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(height, {
      toValue: isOpen ? 100 : 0, // Adjust this height as needed
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View
      className={cn(accordionContentVariants({ variant }), className)}
      style={{ height }}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

AccordionContent.displayName = 'AccordionContent';

// Parent Accordion Component
const Accordion = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
