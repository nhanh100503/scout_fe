import { ref } from "vue";

export interface ToastMessage {
    message: string;
    type: "success" | "error" | "info" | "warning";
}

const toast = ref<ToastMessage | null>(null);

export function useToast() {
    function showToast(message: string, type: "success" | "error" | "info" | "warning" = "info") {
        toast.value = { message, type };
        setTimeout(() => {
            toast.value = null;
        }, 2000);
    }

    function clearToast() {
        toast.value = null;
    }

    return {
        toast,
        showToast,
        clearToast,
    };
}
