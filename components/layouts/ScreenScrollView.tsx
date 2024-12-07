import { ScrollView } from 'react-native';
import React from 'react';
import { cn } from '@/lib/utils';

interface ScreenScrollViewProps
  extends React.ComponentPropsWithoutRef<typeof ScrollView> {
  children: React.ReactNode;
}
export default function ScreenScrollView({
  children,
  className,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  ...props
}: ScreenScrollViewProps) {
  return (
    <ScrollView
      className={cn('bg-background flex-1 px-4', className)}
      contentContainerStyle={[
        {
          paddingBottom: 20,
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
