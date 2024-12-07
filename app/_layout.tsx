import { Stack } from 'expo-router';
import '../global.css';
import { useTheme } from '@/hooks/theme/useTheme';
import { ToastProvider } from '@/components/ui/Toast';
export default function RootLayout() {
  const { colors } = useTheme();
  return (
    <ToastProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background, // background color
          },
          headerTintColor: colors.foreground, // text color
        }}
      />
    </ToastProvider>
  );
}
