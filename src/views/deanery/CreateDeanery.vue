<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Thêm châu mới</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Tên châu <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.name" type="text" :class="inputClass(errors.name)"
                            placeholder="Nhập tên châu" />
                        <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                            {{ errors.name }}
                        </p>
                        <div class="flex justify-end gap-3 mt-4">
                            <router-link to="/deaneries"
                                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                                Hủy
                            </router-link>
                            <button type="submit"
                                class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                                Lưu châu
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import router from "@/routers";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import type { ApiResponse } from "@/types/api.type";
import { DeaneryCreateRequest, ValidationErrorDeanery } from "@/types/deanery.type";
import { createDeanery } from "@/services/deaneryService";

const form = ref<DeaneryCreateRequest>({ name: "" });
const errors = ref<ValidationErrorDeanery>({});
const { showToast } = useToast();

async function handleSubmit() {
    errors.value = {};
    try {
        const res = await createDeanery(form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/deaneries");
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorDeanery;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
