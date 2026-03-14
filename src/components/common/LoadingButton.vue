<template>
    <button
        :type="type"
        :disabled="loading"
        :class="[
            baseClass,
            loading ? 'opacity-70 cursor-not-allowed' : '',
            customClass,
        ]"
        v-bind="$attrs"
    >
        <span v-if="loading" class="inline-flex items-center gap-2">
            <svg
                class="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                />
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            {{ loadingText }}
        </span>
        <span v-else>
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        loading?: boolean;
        loadingText?: string;
        type?: "submit" | "button" | "reset";
        baseClass?: string;
        customClass?: string;
    }>(),
    {
        loading: false,
        loadingText: "Đang xử lý...",
        type: "submit",
        baseClass:
            "px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm inline-flex items-center justify-center transition-opacity duration-200",
        customClass: "",
    }
);
</script>
