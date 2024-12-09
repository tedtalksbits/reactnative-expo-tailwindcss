import React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from './Text';

const badgeVariants = cva(
  'flex items-center justify-center px-4 py-2 rounded-full',
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
      <Text variant='caption1'>{children}</Text>
    </View>
  );
};

export { Badge, badgeVariants };
