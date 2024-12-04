import { useTheme } from '@/hooks/theme/useTheme';
import { cn } from '@/lib/utils';
import { AntDesign } from '@expo/vector-icons';
import { VariantProps, cva } from 'class-variance-authority';
import { TextInput } from 'react-native';

const inputVariants = cva(
  'flex text-foreground w-full py-1 placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-50 py-4 disabled:bg-card',
  {
    variants: {
      variant: {
        default: 'rounded-2xl border border-input bg-transparent px-4',
        ghost: 'bg-transparent border-none',
        search: 'rounded-2xl border border-input bg-card px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  error?: string;
}

export const Input = ({ className, style, variant, ...props }: InputProps) => {
  const { colors } = useTheme();
  const hasValue = props.value && props.value?.toString().length > 0;
  return (
    <>
      <TextInput
        className={cn(inputVariants({ variant }), className)}
        style={[{ fontSize: 18 }, style]}
        {...props}
      />
      {hasValue && (
        <AntDesign
          name='closecircle'
          size={18}
          color={colors['ring']}
          onPress={() => props.onChangeText && props.onChangeText('')}
        />
      )}
    </>
  );
};
