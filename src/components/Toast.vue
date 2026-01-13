<template>
    <div v-if="show" class="fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white"
        :class="type === 'success' ? 'bg-emerald-600' : 'bg-red-600'">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
const message = ref("");
const type = ref<"success" | "error">("success");

function notify(msg: string, t: "success" | "error" = "success") {
    message.value = msg;
    type.value = t;
    show.value = true;
    setTimeout(() => show.value = false, 3000);
}

defineExpose({ notify });
</script>
