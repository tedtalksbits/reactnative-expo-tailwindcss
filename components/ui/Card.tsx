import { cn } from '@/lib/utils';
import { View } from 'react-native';
import { Text } from './Text';

const Card = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View
      className={cn('rounded-2xl border border-border bg-card', className)}
      {...props}
    />
  );
};

const CardHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return <View className={cn('p-8', className)} {...props} />;
};

const CardTitle = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) => {
  return (
    <Text
      variant='title2'
      className={cn('text-foreground', className)}
      {...props}
    />
  );
};

const CardDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) => {
  return (
    <Text
      variant='subhead'
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  );
};

const CardContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return <View className={cn('p-8 pt-0', className)} {...props} />;
};

const CardFooter = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View
      className={cn('flex flex-row items-center p-8 pt-0', className)}
      {...props}
    />
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
