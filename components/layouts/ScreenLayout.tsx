import { View, SafeAreaView } from 'react-native';
import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { cn } from '@/lib/utils';
interface ScreenLayoutProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
}
export const ScreenLayout = ({
  children,
  className,
  ...props
}: ScreenLayoutProps) => {
  return (
    <SafeAreaView className={cn('flex-1 bg-background', className)} {...props}>
      {children}
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};
