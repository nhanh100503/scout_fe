<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Thêm đẳng thứ mới</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Tên đẳng thứ <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.name" type="text" :class="inputClass(errors.name)"
                            placeholder="Nhập tên đẳng thứ" />
                        <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                            {{ errors.name }}
                        </p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Loại đẳng thứ <span class="text-red-500">*</span>
                        </label>
                        <div class="flex gap-6">
                            <label class="flex items-center gap-2">
                                <input type="radio" value="true" v-model="form.type" />
                                <span>Trưởng</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" value="false" v-model="form.type" />
                                <span>Đoàn sinh</span>
                            </label>
                        </div>
                        <p v-if="errors.type" class="mt-1 text-xs text-red-500 break-words">
                            {{ errors.type }}
                        </p>
                    </div>

                    <div class="flex justify-end gap-3 mt-4">
                        <router-link to="/ranks" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                            Hủy
                        </router-link>
                        <button type="submit"
                            class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                            Lưu đẳng thứ
                        </button>
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
import { RankCreateRequest, ValidationErrorRank } from "@/types/rank.type";
import { createRank } from "@/services/rankService";

const form = ref<RankCreateRequest>({ name: "", type: true });
const errors = ref<ValidationErrorRank>({});
const { showToast } = useToast();

async function handleSubmit() {
    errors.value = {};
    try {
        const res = await createRank(form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/ranks");
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorRank;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
