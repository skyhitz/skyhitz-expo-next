export type ToastType = "success" | "error";
export type Toast = (msg: string, type?: ToastType) => void;
