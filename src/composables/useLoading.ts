import { ref } from "vue";

const isLoading = ref(false);

export function useLoading() {
    function setLoading(val: boolean) {
        isLoading.value = val;
    }

    /**
     * Bọc một async function bằng loading state tự động
     */
    async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
        isLoading.value = true;
        try {
            return await fn();
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        setLoading,
        withLoading,
    };
}
