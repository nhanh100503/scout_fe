<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Chi tiết đạo</h2>
            <div v-if="parish" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Châu
                    </label>
                    <input type="text" :value="parish.deanery?.name" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Tên đạo
                    </label>
                    <input type="text" :value="parish.name" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/parishes" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <router-link :to="`/parishes/update/${parish.parishId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Sửa đạo
                    </router-link>
                </div>
            </div>
            <div v-else class="text-red-500">Không tìm thấy đạo</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { ParishDto } from "@/types/parish.type";
import { getParishById } from "@/services/parishService";

const errors = ref<any>({});
const { showToast } = useToast();
const route = useRoute();
const parish = ref<ParishDto | null>(null);
const parishId = Number(route.params.parishId);

onMounted(async () => {
    try {
        const res: ApiResponse<ParishDto> = await getParishById(parishId);
        if (res.code === 200) {
            parish.value = res.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data;
        }
        showToast(apiRes.message, "error");
    }
});
</script>
