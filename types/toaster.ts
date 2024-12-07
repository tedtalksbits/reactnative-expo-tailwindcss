export type ToastType = 'info' | 'success' | 'warning' | 'destructive';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  type: ToastType;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export interface ToastContextData {
  addToast(toast: Omit<Toast, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}
