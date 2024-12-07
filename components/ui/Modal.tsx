import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { AntDesign } from '@expo/vector-icons';
import { ScreenLayout } from '../layouts/ScreenLayout';
import ScreenScrollView from '../layouts/ScreenScrollView';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const modalVariants = cva('bg-secondary', {
  variants: {
    elevation: {
      '1': 'bg-background',
      '2': 'bg-accent',
      '3': 'bg-secondary',
    },
  },
  defaultVariants: {
    elevation: '2',
  },
});
interface CustomModalProps
  extends React.ComponentPropsWithoutRef<typeof Modal>,
    VariantProps<typeof modalVariants> {
  title: string;
  showHeader?: boolean;
  trigger?: React.ReactElement<ModalTriggerProps> | null;
}
interface ModalTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {}

export const CustomModal = ({
  trigger = null,
  title,
  showHeader = true,
  visible,
  onRequestClose,
  onDismiss,
  elevation = '2',
  children,
  ...props
}: CustomModalProps) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [visible]);

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, { onPress: () => setShowModal(true) })}
      <Modal
        animationType='slide'
        transparent={false}
        visible={showModal}
        {...props}
      >
        <View className={cn('flex-1', modalVariants({ elevation }))}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScreenLayout className={cn(modalVariants({ elevation }))}>
              <ScreenScrollView
                className={cn('relative px-0', modalVariants({ elevation }))}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
              >
                {showHeader && (
                  <View
                    className={cn(
                      'justify-between flex-row items-center border-b border-border p-4',
                      modalVariants({ elevation })
                    )}
                  >
                    <Text variant='headline' className='font-bold'>
                      {title}
                    </Text>
                    <View className='flex-row gap-8'>
                      <Pressable
                        className='bg-accent rounded-full p-2'
                        onPress={(e) => {
                          setShowModal(false);
                          onRequestClose && onRequestClose(e);
                        }}
                      >
                        <Text>
                          <AntDesign name='close' size={25} />
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
                <View className='px-4'>{children}</View>
              </ScreenScrollView>
            </ScreenLayout>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
};
