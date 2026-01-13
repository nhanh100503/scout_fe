<template>
    <div v-if="visible"
        class="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur-sm z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 class="text-xl font-bold text-red-600 mb-4">403 không có quyền</h2>
            <p class="text-gray-700 mb-4">{{ message }}</p>
            <p class="text-sm text-gray-500">
                Bạn sẽ được chuyển về trang chủ sau <span class="text-green-500"> {{ countdown }} </span> giây...
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { emitter } from "@/tools/axios.tool";

const visible = ref(false);
const message = ref("");
const countdown = ref(0);
const router = useRouter();

emitter.on("forbidden", (msg) => {
    message.value = msg as string;
    visible.value = true;
    countdown.value = 3;
    const interval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(interval);
            visible.value = false;
            router.push("/");
        }
    }, 1000);
});
</script>
