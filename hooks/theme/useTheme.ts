import Colors from '@/constants/Colors';
import { Appearance, useColorScheme } from 'react-native';
export type Theme = 'light' | 'dark';
export function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';
  const toggleTheme = () => {
    Appearance.setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };
  const themeColors = Colors[colorScheme];
  return {
    theme: colorScheme,
    toggleTheme,
    colors: themeColors,
  };
}

export type ThemeColors = typeof Colors.light;
