<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Chi tiết sinh hoạt</h2>

            <div v-if="activity" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Châu</label>
                    <input type="text" :value="activity.deanery?.name" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Ngày</label>
                    <input type="text" :value="formatDate(activity.date)" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Giờ</label>
                    <input type="text" :value="activity.time" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea :value="activity.description" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Ghi chú</label>
                    <textarea :value="activity.note" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"></textarea>
                </div>
                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/activities" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <router-link :to="`/activities/update/${activity.activityId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Sửa sinh hoạt
                    </router-link>
                </div>
            </div>

            <div v-else class="text-red-500">Không tìm thấy sinh hoạt</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import type { ActivityDto, ValidationErrorActivity } from "@/types/activity.type";
import { getActivityById } from "@/services/activityService";
import { formatDate } from "@/utils/dateFormat";

const errors = ref<ValidationErrorActivity>({});
const { showToast } = useToast();
const route = useRoute();
const activity = ref<ActivityDto | null>(null);
const activityId = Number(route.params.activityId);


onMounted(async () => {
    try {
        const res: ApiResponse<ActivityDto> = await getActivityById(activityId);
        if (res.code === 200) {
            activity.value = res.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorActivity;
        }
        showToast(apiRes.message, "error");
    }
});
</script>
