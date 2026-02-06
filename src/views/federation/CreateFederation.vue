<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Thêm liên đoàn mới</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Châu <span class="text-red-500">*</span>
                        </label>
                        <select v-model="selectedDeaneryId" :class="inputClass(errors.deaneryId)" @change="onDeaneryChange">
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
                            Đạo <span class="text-red-500">*</span>
                        </label>
                        <select v-model="form.parishId" :class="inputClass(errors.parishId)">
                            <option value="">-- Chọn đạo --</option>
                            <option v-for="parish in parishes" :key="parish.parishId" :value="parish.parishId">
                                {{ parish.name }}
                            </option>
                        </select>
                        <p v-if="errors.parishId" class="mt-1 text-xs text-red-500 break-words">
                            {{ errors.parishId }}
                        </p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Tên liên đoàn <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.name" type="text" :class="inputClass(errors.name)"
                            placeholder="Nhập tên liên đoàn" />
                        <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                            {{ errors.name }}
                        </p>
                    </div>
                    <div class="flex justify-end gap-3 mt-4">
                        <router-link to="/federations"
                            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                            Hủy
                        </router-link>
                        <button type="submit"
                            class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                            Lưu liên đoàn
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/routers";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import type { ApiResponse } from "@/types/api.type";
import { FederationCreateRequest } from "@/types/federation.type";
import { createFederation } from "@/services/federationService";
import { getAllDeanery } from "@/services/deaneryService";
import { getParishesByDeaneryId } from "@/services/parishService";
import { DeaneryDto } from "@/types/deanery.type";
import { ParishDto } from "@/types/parish.type";

const form = ref<FederationCreateRequest>({ name: "", parishId: null });
const errors = ref<any>({});
const deaneries = ref<DeaneryDto[]>([]);
const parishes = ref<ParishDto[]>([]);
const selectedDeaneryId = ref<number | "">("");
const { showToast } = useToast();

onMounted(async () => {
    try {
        const res = await getAllDeanery();
        deaneries.value = res.data;
    } catch (error: any) {
        showToast(error.message, "error");
    }
});

async function onDeaneryChange() {
    form.value.parishId = null;
    parishes.value = [];
    
    if (selectedDeaneryId.value) {
        try {
            const res = await getParishesByDeaneryId(selectedDeaneryId.value as number);
            parishes.value = res.data;
        } catch (error: any) {
            showToast(error.message, "error");
        }
    }
}

async function handleSubmit() {
    errors.value = {};
    try {
        const res = await createFederation(form.value);
        if (res.code === 201) {
            showToast(res.message, "success");
            router.push("/federations");
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
