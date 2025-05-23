import { ScreenLayout } from '@/components/layouts/ScreenLayout';
import ScreenScrollView from '@/components/layouts/ScreenScrollView';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import ConfirmDialog from '@/components/ui/Dialog';
import { FloatingDebugPanel } from '@/components/ui/Draggabe';
import { Input } from '@/components/ui/Input';
import { CustomModal } from '@/components/ui/Modal';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Select } from '@/components/ui/Select';
import { Table, TableHeader, TableRow } from '@/components/ui/Table';
import { Tabs } from '@/components/ui/Tabs';
import { Text } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    toast.success({
      title: 'Item Deleted',
      description: 'The item has been successfully deleted.',
    });
  };

  return (
    <ScreenLayout>
      <ScreenScrollView>
        <Text variant='title1'>Edit app/index.tsx to edit this screen.</Text>
        <Card>
          <CardHeader>
            <Text variant='title2'>Title</Text>
          </CardHeader>
          <CardContent>
            <Text variant='body'>Body</Text>
          </CardContent>
        </Card>
        <Tabs
          defaultTab='tab1'
          tabs={{
            'This is Tab One': (
              <ScreenScrollView horizontal>
                <View className='flex flex-row'>
                  <Badge variant='default'>Default</Badge>
                  <Badge variant='secondary'>Secondary</Badge>
                  <Badge variant='success'>Success</Badge>
                  <Badge variant='destructive'>Destructive</Badge>
                </View>
              </ScreenScrollView>
            ),
            'This is Tab Two': (
              <View>
                <Text>Tab 2</Text>
              </View>
            ),
          }}
        />
        <Button
          label='Click for success toast'
          variant='success'
          onPress={() =>
            toast.success({
              title: 'Success',
              description: 'This is a success toast',
            })
          }
        />

        <Button
          className='bg-info'
          label='Click for info toast'
          onPress={() =>
            toast.info({
              title: 'Info',
              description: 'This is an info toast',
            })
          }
          labelProps={{
            className: 'text-primary-foreground',
          }}
        />

        <Button
          label='Click for warning toast'
          className='bg-warning'
          onPress={() =>
            toast.warning({
              title: 'Warning',
              description: 'This is a warning toast',
            })
          }
          labelProps={{
            className: 'text-primary-foreground',
          }}
        />

        <Button
          label='Click for error toast'
          className='bg-destructive'
          onPress={() =>
            toast.destructive({
              title: 'Error',
              description: 'This is an error toast',
            })
          }
          labelProps={{
            className: 'text-primary-foreground',
          }}
        />

        <Input placeholder='Input' />

        <RadioGroup
          indicatorType='circle'
          defaultValue='1'
          onChange={(value) => console.log(value)}
          label='Radio Group'
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ]}
        />

        <Table>
          <TableHeader>Header</TableHeader>
          <TableRow title='Title' description='Description' />
          <TableRow title='Title' description='Description' />
        </Table>

        <Button label='Expand' onPress={() => setExpanded(!expanded)} />

        <CustomModal
          elevation={'3'}
          visible={expanded}
          title='Modal'
          onRequestClose={() => setExpanded(false)}
          onDismiss={() => setExpanded(false)}
        >
          <Text>Modal Content</Text>
        </CustomModal>

        <Button label='Delete Item' onPress={() => setDialogOpen(true)} />

        <ConfirmDialog
          open={dialogOpen}
          title='Delete Item'
          onClose={handleClose}
          onConfirm={handleConfirm}
        >
          <Text>Dialog Content</Text>
        </ConfirmDialog>
        <Select
          defaultValue='1'
          label='Select'
          options={[
            { label: 'Option', value: '1' },
            { label: 'Option', value: '2' },
          ]}
        />
      </ScreenScrollView>
      <FloatingDebugPanel>
        <Text variant='title1'>Debug Panel</Text>
      </FloatingDebugPanel>
    </ScreenLayout>
  );
}
