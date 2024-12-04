import { ScreenLayout } from '@/components/layouts/ScreenLayout';
import ScreenView from '@/components/layouts/ScreenView';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Table, TableHeader, TableRow } from '@/components/ui/Table';
import { Tabs } from '@/components/ui/Tabs';
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';

export default function Index() {
  return (
    <ScreenLayout>
      <ScreenView>
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
              <View>
                <Text className='text-primary'>Tab 1</Text>
              </View>
            ),
            'This is Tab Two': (
              <View>
                <Text>Tab 2</Text>
              </View>
            ),
          }}
        />
        <Button
          label='Button'
          onPress={() => console.log('Button pressed')}
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
      </ScreenView>
    </ScreenLayout>
  );
}
