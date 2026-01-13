<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Chi tiết châu</h2>
            <div v-if="deanery" class="">
                <label class="block text-sm font-medium text-gray-700">
                    Tên châu <span class="text-red-500">*</span>
                </label>
                <input type="text" :value="deanery.name" readonly
                    class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" placeholder=" Nhập tên châu" />
                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/deaneries" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <router-link :to="`/deaneries/update/${deanery.deaneryId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Sửa châu
                    </router-link>
                </div>
            </div>
            <div v-else class="text-red-500">Không tìm thấy châu</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { DeaneryDto, ValidationErrorDeanery } from "@/types/deanery.type";
import { getDeaneryById } from "@/services/deaneryService";

const errors = ref<ValidationErrorDeanery>({});
const { toast, showToast } = useToast();
const route = useRoute();
const deanery = ref<DeaneryDto | null>(null);
const deaneryId = Number(route.params.deaneryId);
onMounted(async () => {
    try {
        const res: ApiResponse<DeaneryDto> = await getDeaneryById(deaneryId);
        if (res.code === 200) {
            deanery.value = res.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorDeanery;
        }
        showToast(apiRes.message, "error");
    }
});
</script>
