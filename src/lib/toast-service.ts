import { toast, ToastOptions, ToastContent } from "react-toastify";

type ToastType = "success" | "error" | "info";

export class ToastService {
  private static readonly defaultOptions: ToastOptions = {
    pauseOnHover: false,
    autoClose: 2000,
    position: "bottom-right",
  };

  private static show(
    type: ToastType,
    message?: ToastContent,
    options?: ToastOptions,
  ) {
    // do not show empty toasts
    if (!message) return;

    return toast[type](message, {
      ...this.defaultOptions,
      ...options,
    });
  }

  public static success(message?: ToastContent, options?: ToastOptions) {
    return this.show("success", message, options);
  }

  public static error(message?: ToastContent, options?: ToastOptions) {
    return this.show("error", message, options);
  }

  public static info(message?: ToastContent, options?: ToastOptions) {
    return this.show("info", message, options);
  }
}
