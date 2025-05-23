import React, { useEffect } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Text } from './Text';
import { cva } from 'class-variance-authority';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptic from 'expo-haptics';
// Define the dialog variants using cva for styling
const dialogVariants = cva('p-4 bg-secondary rounded-2xl', {
  variants: {
    variant: {
      default: '',
      small: 'w-full max-w-sm',
      medium: 'w-full max-w-md',
      large: 'w-full max-w-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ConfirmDialogProps
  extends React.ComponentPropsWithoutRef<typeof Modal> {
  title: string;
  details?: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  overlayProps?: React.ComponentPropsWithoutRef<typeof View>;
  contentProps?: React.ComponentPropsWithoutRef<typeof View>;
  headerProps?: React.ComponentPropsWithoutRef<typeof View>;
  footerProps?: React.ComponentPropsWithoutRef<typeof View>;
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  details,
  overlayProps,
  contentProps,
  headerProps,
  footerProps,
  children,
  ...props
}: ConfirmDialogProps) => {
  // haptic feedback when the dialog is opened
  useEffect(() => {
    if (open) {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
    }
  }, [open]);
  return (
    <Modal
      {...props}
      transparent={true}
      animationType='fade'
      visible={open}
      onRequestClose={onClose}
    >
      <View
        className={cn(
          overlayProps?.className,
          'flex justify-center bg-black/80 flex-1 items-center'
        )}
        onTouchEnd={(e) => {
          overlayProps?.onTouchEnd && overlayProps.onTouchEnd(e);
          onClose();
        }}
        {...overlayProps}
      >
        <View
          className={cn(
            dialogVariants({
              variant: 'default',
              className: contentProps?.className,
            })
          )}
          style={{
            width: '90%',
          }}
          {...contentProps}
        >
          <View
            className={cn(
              'flex flex-row justify-between items-center mb-4',
              headerProps?.className
            )}
            {...headerProps}
          >
            {title && <Text variant={'headline'}>{title}</Text>}
            <Button variant='outline' size={'icon'} onPress={onClose}>
              <MaterialCommunityIcons name='close' size={24} />
            </Button>
          </View>

          {details ? (
            <Text variant={'callout'} className='mb-4'>
              {details}
            </Text>
          ) : (
            <>{children}</>
          )}

          <View className='border-b border-border my-4' />

          <View style={styles.footer}>
            <Button variant='outline' onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={onConfirm}>Confirm</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    padding: 8,
  },
  details: {
    marginVertical: 16,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ConfirmDialog;
