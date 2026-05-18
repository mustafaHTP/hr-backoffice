import { toast, ToastOptions } from "react-toastify";

export class ToastService {
  private static readonly defaultOptions: ToastOptions = {
    pauseOnHover: false,
    autoClose: 2000,
    position: "bottom-right",
  };

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
