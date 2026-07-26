import { toast } from "react-toastify";

export const showSuccess = (message: any) => {
  toast.success(message);
};

export const showError = (message: any) => {
  toast.error(message);
};

export const showInfo = (message: any) => {
  toast.info(message);
};

export const showWarning = (message: any) => {
  toast.warning(message);
};