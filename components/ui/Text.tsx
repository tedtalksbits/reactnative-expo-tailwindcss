import { Text as TextComponent } from 'react-native';
import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const textVariants = cva('text-base text-foreground', {
  variants: {
    variant: {
      largeTitle: 'text-[41px] font-normal leading-[51px]',
      title1: 'text-[33px] font-normal leading-[41px]',
      title2: 'text-[25px] font-normal leading-[32px]',
      title3: 'text-[23px] font-normal leading-[29px]',
      headline: 'text-[19px] font-semibold leading-[25px]',
      body: 'text-[19px] font-normal leading-[25px]',
      callout: 'text-[17px] font-normal leading-[22px]',
      subhead: 'text-[15px] font-normal leading-[20px]',
      footnote: 'text-[13px] font-normal leading-[18px]',
      caption1: 'text-[12px] font-normal leading-[16px]',
      caption2: 'text-[11px] font-normal leading-[13px]',
      link: 'text-blue-500 underline',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});
interface TextProps
  extends React.ComponentPropsWithoutRef<typeof TextComponent>,
    VariantProps<typeof textVariants> {}

const Text = ({ children, className, variant, ...props }: TextProps) => {
  return (
    <TextComponent
      className={cn(textVariants({ variant }), className)}
      {...props}
    >
      {children}
    </TextComponent>
  );
};

export { Text };
