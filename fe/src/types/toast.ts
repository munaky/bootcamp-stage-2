export type ToastType = "info" | "success" | "error";

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  description?: string;
}

export interface ToastContextType {
  addToast: (toast: {type: ToastType, title: string, description?: string, duration?: number}) => void;
}