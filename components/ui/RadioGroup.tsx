import { cn } from '@/lib/utils';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/theme/useTheme';

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  defaultValue: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  indicatorType?: 'circle' | 'check';
  label?: string;
}

const RadioGroup = ({
  defaultValue,
  options,
  onChange,
  label,
  indicatorType = 'check',
  ...props
}: RadioGroupProps) => {
  const { colors } = useTheme();
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <View {...props}>
      {label && (
        <Text className={cn('text-muted-foreground mb-2')}>{label}</Text>
      )}
      {options.map((option, index) => {
        const isLastOption = index === options.length - 1;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => {
              setSelectedValue(option.value);
              onChange(option.value);
            }}
            className={cn(
              'flex-row gap-4 items-center py-4 border-b border-border',
              isLastOption && 'border-b-0'
            )}
          >
            {indicatorType === 'circle' ? (
              <View
                className={cn(
                  'rounded-full bg-accent w-6 h-6',
                  selectedValue === option.value &&
                    'border-[4px] bg-card border-primary'
                )}
              />
            ) : (
              <MaterialCommunityIcons
                name={selectedValue === option.value ? 'check' : 'circle'}
                size={24}
                color={
                  selectedValue === option.value
                    ? colors['primary']
                    : 'transparent'
                }
              />
            )}
            <Text
              className={cn('text-foreground/50', {
                'text-foreground': selectedValue === option.value,
              })}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export { RadioGroup };
