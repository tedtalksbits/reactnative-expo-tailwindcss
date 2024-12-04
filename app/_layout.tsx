import { Stack } from 'expo-router';
import '../global.css';
import { useTheme } from '@/hooks/theme/useTheme';
export default function RootLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background, // background color
        },
        headerTintColor: colors.foreground, // text color
      }}
    />
  );
}
