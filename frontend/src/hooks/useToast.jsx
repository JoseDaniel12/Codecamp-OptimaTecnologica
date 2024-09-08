import { useContext } from "react";
import { ToastContext } from "@/contexts/Toast";


export const useToast = (position = { vertical: 'bottom', horizontal: 'right' }) => {
    const { addToast } = useContext(ToastContext);
  
    const toast = {
      show: options => addToast({ ...options, position })
    };
  
    return toast;
  };