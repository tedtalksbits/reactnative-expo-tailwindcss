import { Keyboard, ScrollView, View } from 'react-native';
import React from 'react';
import { cn } from '@/lib/utils';

interface ScreenViewProps
  extends React.ComponentPropsWithoutRef<typeof ScrollView> {
  children: React.ReactNode;
}
export default function ScreenView({
  children,
  className,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  ...props
}: ScreenViewProps) {
  return (
    <View
      className={cn('bg-background flex-1 px-4', className)}
      {...props}
      accessible={false}
      onTouchStart={Keyboard.dismiss}
    >
      {children}
    </View>
  );
}
