export type ToastType = "success" | "error";
export type Toast = (_msg: string, _type?: ToastType) => void;
