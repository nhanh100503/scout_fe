<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Cập nhật sinh hoạt</h2>
            <form v-if="activity" class="space-y-4" @submit.prevent="handleSubmit">
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Châu <span class="text-red-500">*</span>
                    </label>
                    <select v-model="form.deaneryId" :class="inputClass(errors.deaneryId)">
                        <option value="">-- Chọn châu --</option>
                        <option v-for="d in deaneries" :key="d.deaneryId" :value="d.deaneryId">
                            {{ d.name }}
                        </option>
                    </select>
                    <p v-if="errors.deaneryId" class="mt-1 text-xs text-red-500 break-words">{{ errors.deaneryId }}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Ngày <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.date" type="date" :class="inputClass(errors.date)" />
                    <p v-if="errors.date" class="mt-1 text-xs text-red-500 break-words">{{ errors.date }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Giờ <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.time" type="time" :class="inputClass(errors.time)" />
                    <p v-if="errors.time" class="mt-1 text-xs text-red-500 break-words">{{ errors.time }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Mô tả <span class="text-red-500">*</span>
                    </label>
                    <textarea v-model="form.description" :class="inputClass(errors.description)" rows="3"></textarea>
                    <p v-if="errors.description" class="mt-1 text-xs text-red-500 break-words">{{ errors.description }}
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Ghi chú</label>
                    <textarea v-model="form.note" :class="inputClass(errors.note)" rows="2"></textarea>
                    <p v-if="errors.note" class="mt-1 text-xs text-red-500 break-words">{{ errors.note }}</p>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/activities" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <button type="submit"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Cập nhật sinh hoạt
                    </button>
                </div>
            </form>

            <div v-else class="text-red-500">Không tìm thấy sinh hoạt</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import type { ActivityDto, ActivityUpdateRequest, ValidationErrorActivity } from "@/types/activity.type";
import { getActivityById, updateActivity } from "@/services/activityService";
import { getAllDeanery } from "@/services/deaneryService";
import type { DeaneryDto } from "@/types/deanery.type";

const errors = ref<ValidationErrorActivity>({});
const { showToast } = useToast();
const route = useRoute();
const router = useRouter();

const activity = ref<ActivityDto | null>(null);
const form = ref<ActivityUpdateRequest>({
    date: "",
    time: "",
    description: "",
    note: "",
    deaneryId: null
});

const deaneries = ref<DeaneryDto[]>([]);
const activityId = Number(route.params.activityId);

onMounted(async () => {
    try {
        const res: ApiResponse<ActivityDto> = await getActivityById(activityId);
        if (res.code === 200) {
            activity.value = res.data;
            form.value.date = res.data.date;
            form.value.time = res.data.time;
            form.value.description = res.data.description;
            form.value.note = res.data.note;
            form.value.deaneryId = res.data.deanery?.deaneryId ?? 0;
        }

        const deaneryRes: ApiResponse<DeaneryDto[]> = await getAllDeanery();
        if (deaneryRes.code === 200) {
            deaneries.value = deaneryRes.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorActivity;
        }
        showToast(apiRes.message, "error");
    }
});

async function handleSubmit() {
    errors.value = {};
    try {
        const res = await updateActivity(activityId, form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/activities");
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorActivity;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
