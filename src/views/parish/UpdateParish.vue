<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Cập nhật đạo</h2>

            <form v-if="parish" class="space-y-4" @submit.prevent="handleSubmit">
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Châu <span class="text-red-500">*</span>
                    </label>
                    <select v-model="form.deaneryId" :class="inputClass(errors.deaneryId)">
                        <option value="">-- Chọn châu --</option>
                        <option v-for="deanery in deaneries" :key="deanery.deaneryId" :value="deanery.deaneryId">
                            {{ deanery.name }}
                        </option>
                    </select>
                    <p v-if="errors.deaneryId" class="mt-1 text-xs text-red-500 break-words">
                        {{ errors.deaneryId }}
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Tên đạo <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.name" type="text" :class="inputClass(errors.name)" placeholder="Nhập tên đạo" />
                    <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                        {{ errors.name }}
                    </p>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/parishes" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <button type="submit"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Cập nhật đạo
                    </button>
                </div>
            </form>

            <div v-else class="text-red-500">Không tìm thấy đạo</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import { ParishDto, ParishUpdateRequest } from "@/types/parish.type";
import { getParishById, updateParish } from "@/services/parishService";
import { getAllDeanery } from "@/services/deaneryService";
import { DeaneryDto } from "@/types/deanery.type";

const errors = ref<any>({});
const { showToast } = useToast();
const route = useRoute();
const router = useRouter();

const parish = ref<ParishDto | null>(null);
const form = ref<ParishUpdateRequest>({ name: "", deaneryId: null });
const deaneries = ref<DeaneryDto[]>([]);

const parishId = Number(route.params.parishId);

onMounted(async () => {
    try {
        // Load deaneries
        const resDeaneries = await getAllDeanery();
        deaneries.value = resDeaneries.data;

        // Load parish
        const res: ApiResponse<ParishDto> = await getParishById(parishId);
        if (res.code === 200) {
            parish.value = res.data;
            form.value.name = res.data.name;
            form.value.deaneryId = res.data.deaneryId;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data;
        }
        showToast(apiRes.message, "error");
    }
});

async function handleSubmit() {
    errors.value = {};
    try {
        const res = await updateParish(parishId, form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/parishes");
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
