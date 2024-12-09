import { ScreenLayout } from '@/components/layouts/ScreenLayout';
import ScreenScrollView from '@/components/layouts/ScreenScrollView';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { CollapseContent, CollapseTrigger } from '@/components/ui/Collapse';
import ConfirmDialog from '@/components/ui/Dialog';
import { FloatingDebugPanel } from '@/components/ui/Draggabe';
import { Input } from '@/components/ui/Input';
import { CustomModal } from '@/components/ui/Modal';
import {
  PopoverMenu,
  PopoverMenuItem,
  PopoverButton,
} from '@/components/ui/PopoverMenu';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Select } from '@/components/ui/Select';
import { Table, TableHeader, TableRow } from '@/components/ui/Table';
import { Tabs } from '@/components/ui/Tabs';
import { Text } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast';
import { useRef, useState } from 'react';
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

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const targetRef = useRef(null);

  const togglePopover = () => {
    setPopoverOpen((prev) => !prev);
  };

  const handleSelectItem = (item: string) => {
    console.log(`Selected item: ${item}`);
    setPopoverOpen(false);
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
          details='Are you sure you want to delete this item?'
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
        <Select
          defaultValue='1'
          label='Select'
          options={[
            { label: 'Option', value: '1' },
            { label: 'Option', value: '2' },
          ]}
        />
        <PopoverButton
          onPress={togglePopover}
          label='Open Popover'
          ref={targetRef}
        />

        <PopoverMenu
          open={isPopoverOpen}
          onClose={() => setPopoverOpen(false)}
          targetRef={targetRef}
          position='bottom'
        >
          <PopoverMenuItem
            onPress={() => handleSelectItem('Item 1')}
            label='Item 1'
          />
          <PopoverMenuItem
            onPress={() => handleSelectItem('Item 2')}
            label='Item 2'
          />
          <PopoverMenuItem
            onPress={() => handleSelectItem('Item 3')}
            label='Item 3'
          />
          <PopoverMenuItem
            onPress={() => handleSelectItem('Item 4')}
            label='Item 4'
          />
        </PopoverMenu>
      </ScreenScrollView>
      <FloatingDebugPanel>
        <Text variant='title1'>Debug Panel</Text>
      </FloatingDebugPanel>
    </ScreenLayout>
  );
}
