<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Cập nhật châu</h2>

            <form v-if="deanery" class="" @submit.prevent="handleSubmit">
                <label class="block text-sm font-medium text-gray-700">
                    Tên ngành <span class="text-red-500">*</span>
                </label>
                <input v-model="form.name" type="text" :class="inputClass(errors.name)" placeholder="Nhập tên ngành" />
                <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                    {{ errors.name }}
                </p>

                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/deaneries" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <button type="submit"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Cập nhật châu
                    </button>
                </div>
            </form>

            <div v-else class="text-red-500">Không tìm thấy châu</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import { DeaneryDto, DeaneryUpdateRequest, ValidationErrorDeanery } from "@/types/deanery.type";
import { getDeaneryById, updateDeanery } from "@/services/deaneryService";

const errors = ref<ValidationErrorDeanery>({});
const { showToast } = useToast();
const route = useRoute();
const router = useRouter();

const deanery = ref<DeaneryDto | null>(null);
const form = ref<DeaneryUpdateRequest>({ name: "" });

const deaneryId = Number(route.params.deaneryId);

onMounted(async () => {
    try {
        const res: ApiResponse<DeaneryDto> = await getDeaneryById(deaneryId);
        if (res.code === 200) {
            deanery.value = res.data;
            form.value.name = res.data.name
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorDeanery;
        }
        showToast(apiRes.message, "error");
    }
});

async function handleSubmit() {
    errors.value = {};
    try {
        const res = await updateDeanery(deaneryId, form.value);
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
