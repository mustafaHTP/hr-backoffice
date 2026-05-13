import { toast, ToastOptions, TypeOptions } from "react-toastify";

export class NotificationService {
  private static readonly defaultOptions: ToastOptions = {
    pauseOnHover: false,
    autoClose: 2000,
    position: "bottom-right",
  };

  public static show(
    message: string,
    type: TypeOptions,
    options?: ToastOptions,
  ) {
    return toast.success(message, {
      ...this.defaultOptions,
      ...options,
      type,
    });
  }

  public static success(message: string, options?: ToastOptions) {
    return toast.success(message, {
      ...this.defaultOptions,
      ...options,
    });
  }

  public static error(message: string, options?: ToastOptions) {
    return toast.error(message, {
      ...this.defaultOptions,
      ...options,
    });
  }

  public static info(message: string, options?: ToastOptions) {
    return toast.info(message, {
      ...this.defaultOptions,
      ...options,
    });
  }
}
