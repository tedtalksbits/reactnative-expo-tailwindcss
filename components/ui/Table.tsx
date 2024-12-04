import { cn } from '@/lib/utils';
import { TextProps, TouchableOpacity, View } from 'react-native';
import { Text } from './Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '@/hooks/theme/useTheme';

interface TableProps extends React.ComponentPropsWithoutRef<typeof View> {
  header?: string;
  headerClassName?: string;
  children: React.ReactNode | React.ReactNode[];
}

interface TableHeaderprops
  extends React.ComponentPropsWithoutRef<typeof Text> {}

const TableHeader = ({ children, className, ...props }: TableHeaderprops) => {
  return (
    <Text
      variant={props.variant || 'caption1'}
      className={cn('text-muted-foreground mt-8 mb-4 uppercase', className)}
      {...props}
    >
      {children}
    </Text>
  );
};

const Table = ({
  children,
  className,
  headerClassName,
  ...props
}: TableProps) => {
  const enhancedChildren = React.Children.map(children, (child, i) => {
    const isLastChild = i === React.Children.count(children) - 1;
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-ignore
        isLastChild,
      });
    }
    return child;
  });
  return (
    <>
      {props.header && (
        <Text
          variant='subhead'
          className={cn('text-muted-foreground mb-4', headerClassName)}
        >
          {props.header}
        </Text>
      )}

      <View
        className={cn('rounded-xl bg-card py-2 px-4', className)}
        {...props}
      >
        {enhancedChildren}
      </View>
    </>
  );
};

// create type for TableRow omiting children and adding the following props: title, elementLeft, elementRight, description

interface TableRowProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  title: string;
  titleClassName?: string;
  titleStyle?: TextProps['style'];
  descriptionClassName?: string;
  descriptionStyle?: TextProps['style'];
  elementLeft?: React.ReactNode;
  elementRight?: React.ReactNode;
  description?: string;
  isLastChild?: boolean;
}
const TableRow = ({
  className,
  isLastChild,
  titleClassName,
  titleStyle,
  descriptionClassName,
  descriptionStyle,
  ...props
}: TableRowProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      {...props}
      className={cn('flex flex-row items-center justify-between', className)}
    >
      {props.elementLeft && <View>{props.elementLeft}</View>}
      <View
        className={`p-2 flex-1 border-border flex flex-col justify-between row-content ${
          !isLastChild && 'border-b'
        }`}
      >
        <View>
          <Text
            variant='headline'
            className={cn('text-foreground', titleClassName)}
            style={titleStyle}
          >
            {props.title}
          </Text>
        </View>
        {props.description && (
          <View>
            <Text
              variant='subhead'
              className={cn('text-muted-foreground', descriptionClassName)}
              style={descriptionStyle}
            >
              {props.description}
            </Text>
          </View>
        )}
        {props.children}
      </View>
      {props.elementRight ? (
        <View>{props.elementRight}</View>
      ) : (
        <Text>
          <MaterialCommunityIcons
            name='chevron-right'
            size={24}
            color={colors['input']}
          />
        </Text>
      )}
    </TouchableOpacity>
  );
};

export { Table, TableRow, TableHeader };
