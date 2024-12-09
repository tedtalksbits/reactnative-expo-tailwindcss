import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './Text';
import React, { LegacyRef } from 'react';

const buttonVariants = cva('flex flex-row items-center justify-center', {
  variants: {
    variant: {
      success: 'bg-success',
      default: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
      ghost: 'bg-accent',
      link: 'text-primary underline-offset-4',
      outline: 'bg-transparent border border-border',
    },
    size: {
      default: 'h-14 px-6',
      sm: 'h-8 px-2',
      lg: 'h-12 px-8',
      icon: 'h-12 w-12 p-0',
      'icon sm': 'h-8 w-8 p-0',
      'icon lg': 'h-16 w-16 p-0',
      'icon xl': 'h-20 w-20 p-0',
    },
    type: {
      pill: 'rounded-[999px]',
      default: 'rounded-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    type: 'default',
  },
});

const buttonTextVariants = cva('text-center capitalize', {
  variants: {
    variant: {
      success: 'text-success-foreground',
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      ghost: 'text-accent-foreground',
      link: 'text-primary-foreground underline',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps
  extends React.ComponentPropsWithRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  labelProps?: TextProps;
}
interface TextProps extends React.ComponentPropsWithoutRef<typeof Text> {}
const Button = React.forwardRef<View, ButtonProps>(
  ({ labelProps, label, className, variant, type, size, ...props }, ref) => {
    return (
      <TouchableOpacity
        {...props}
        className={cn(buttonVariants({ variant, size, type, className }))}
      >
        {label && (
          <Text
            variant='callout'
            className={cn(
              'font-semibold',
              buttonTextVariants({ variant }),
              labelProps?.className
            )}
            {...labelProps}
          >
            {label}
          </Text>
        )}
        <Text
          {...labelProps}
          variant='callout'
          className={cn(buttonTextVariants({ variant }), labelProps?.className)}
        >
          {props.children}
        </Text>
      </TouchableOpacity>
    );
  }
);

export { Button, buttonVariants, buttonTextVariants };
