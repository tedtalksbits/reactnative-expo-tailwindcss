import React from 'react';
import { cn } from '@/lib/utils';
import {
  Dimensions,
  Keyboard,
  Modal,
  ScrollView,
  TextInput,
  TextProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from './Text';
import { useRef, useState } from 'react';
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Button } from './Button';
import { useTheme } from '@/hooks/theme/useTheme';
import { Input } from './Input';

type SelectOptions = {
  label: any;
  value: any;
  onSelect?: ({ value, label }: { value: any; label: any }) => void;
  groupLabel?: string;
};
interface SelectProps extends React.ComponentPropsWithoutRef<typeof View> {
  defaultValue: string;
  options: SelectOptions[];
  children?: React.ReactNode;
  onSelect?: ({ value, label }: { value: any; label: any }) => void;
  label?: string;
  labelClassName?: string;
  labelStyle?: TextProps['style'];
  onSearch?: (value: string) => void;
}

const Select = ({
  className,
  defaultValue,
  options,
  onSelect,
  label,
  labelClassName,
  labelStyle,
  onSearch,
  ...props
}: SelectProps) => {
  const { colors } = useTheme();
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0].value
  );
  const [showOptions, setShowOptions] = useState(false);
  const selectedClass = 'bg-primary text-primary-background rounded-xl';
  const handleSelect = ({ value, label }: { value: string; label: string }) => {
    onSelect && onSelect({ value, label });
    setSelectedValue(value);
  };

  return (
    <>
      {label && (
        <Text
          className={cn('text-muted-foreground', labelClassName)}
          style={[{ fontSize: 18 }, labelStyle]}
        >
          {label}
        </Text>
      )}

      <View className={cn('rounded-xl  bg-background', className)} {...props}>
        <TouchableOpacity
          className='flex-row items-center justify-between'
          onPress={() => {
            Keyboard.dismiss();
            setShowOptions(!showOptions);
          }}
        >
          <Text
            className={cn('p-4', labelClassName)}
            style={[{ fontSize: 18 }, labelStyle]}
          >
            <AntDesign name='check' size={20} className='mr-2' />{' '}
            {options.find((option) => option.value === selectedValue)?.label ||
              defaultValue}
          </Text>
          <Text>
            <Ionicons
              color={colors.ring}
              name={showOptions ? 'chevron-collapse' : 'chevron-expand'}
              size={24}
            />
          </Text>
        </TouchableOpacity>

        <SelectOptionsList
          label={label}
          setShowOptions={setShowOptions}
          options={options}
          selectedValue={selectedValue}
          setSelectedValue={handleSelect}
          selectedClass={selectedClass}
          showOptions={showOptions}
        />
      </View>
    </>
  );
};

interface SelectOptionProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  children: React.ReactNode;
}

const SelectOption = ({ children, className, ...props }: SelectOptionProps) => {
  return (
    <TouchableOpacity className={cn('p-2', className)} {...props}>
      <Text variant='body'>{children}</Text>
    </TouchableOpacity>
  );
};

interface SelectOptionsListProps {
  options: SelectOptions[];
  selectedValue: string;
  setSelectedValue: ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => void;
  selectedClass: string;
  setShowOptions?: (value: boolean) => void;
  showOptions: boolean;
  label?: string;
}

const SelectOptionsList = ({
  options,
  selectedValue,
  setSelectedValue,
  selectedClass,
  setShowOptions,
  showOptions,
  label,
}: SelectOptionsListProps) => {
  const displayedGroups = new Set<string>();

  // comment out the following code to allow the modal to be closed by swiping down
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: (evt, gestureState) => {
  //       // Check if the swipe is a downward swipe and exceeds 50 units
  //       if (gestureState.dy > 50) {
  //         setShowOptions && setShowOptions(false);
  //       }
  //     },
  //   })
  // ).current;
  return (
    <Modal
      visible={showOptions}
      transparent={true}
      animationType='slide'
      onRequestClose={() => setShowOptions && setShowOptions(false)}
      onDismiss={() => setShowOptions && setShowOptions(false)}

      // close modal when clicking outside
    >
      <View
        className='bg-overlay'
        // {...panResponder.panHandlers}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundColor: 'rgba(0,0,0,0.9)',
        }}
        onTouchEnd={() => setShowOptions && setShowOptions(false)}
      />
      <ScrollView
        // make the header sticky when scrolling if there is a label
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        onScrollToTop={(e) => {
          console.log('scroll to top', e);
        }}
        style={{
          width: Dimensions.get('window').width,
          position: 'absolute',
          bottom: 20,
          flex: 1,
          maxHeight: Dimensions.get('window').height * 0.5,
        }}
        className='bg-card rounded-xl px-4 pb-4'
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View className='bg-card py-4 '>
          <View className='justify-between flex-row items-center'>
            <Text variant='subhead' className='text-muted-foreground'>
              {label ? label : 'Select an option'}
            </Text>
            <Button
              size='icon'
              className='ml-auto'
              variant='ghost'
              onPress={() => setShowOptions && setShowOptions(false)}
            >
              <AntDesign name='close' size={20} />
            </Button>
          </View>
        </View>

        {options.map((option, index) => {
          const isLastOption = index === options.length - 1;
          // determine if we need to show the group label
          let showGroupLabel = false;
          if (option.groupLabel && !displayedGroups.has(option.groupLabel)) {
            showGroupLabel = true;
            displayedGroups.add(option.groupLabel);
          }
          return (
            <View
              key={index}
              className={cn(
                'border-b border-border w-full py-2',
                showGroupLabel ? 'pt-2' : '',
                isLastOption ? 'border-b-0' : ''
              )}
            >
              {showGroupLabel && (
                <Text variant='subhead' className='text-muted-foreground my-2'>
                  {option.groupLabel}
                </Text>
              )}
              <SelectOption
                onPress={() => {
                  setSelectedValue({
                    value: option.value,
                    label: option.label,
                  });
                  setShowOptions && setShowOptions(false);
                }}
                className={cn(
                  selectedValue === option.value ? selectedClass : ''
                )}
              >
                {selectedValue === option.value && (
                  <Text className='mr-3'>
                    <AntDesign name='check' size={20} />
                  </Text>
                )}
                {option.label}
              </SelectOption>
            </View>
          );
        })}
      </ScrollView>
    </Modal>
  );
};

export { Select };
