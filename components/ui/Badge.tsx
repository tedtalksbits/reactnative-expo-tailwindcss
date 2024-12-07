import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-success text-success-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Badge = ({
  variant,
  className,
  children,
}: React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof badgeVariants>) => {
  return (
    <View className={cn(badgeVariants({ variant }), className)}>
      {children}
    </View>
  );
};

export { Badge, badgeVariants };
