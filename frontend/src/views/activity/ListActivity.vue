<template>
    <div class="flex flex-col h-screen">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách sinh hoạt theo châu
            </h2>
            <router-link to="/activities/add"
                class="px-3 md:px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm md:text-base">
                + Thêm sinh hoạt
            </router-link>
        </div>
        <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-120 border border-gray-300">
                <h3 class="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa sinh hoạt này không?</p>
                <div class="flex justify-center gap-6">
                    <button @click="showConfirm = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Hủy
                    </button>
                    <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Chắc chắn
                    </button>
                </div>
            </div>
        </div>
        <div class="px-4 md:px-6 mb-4">
            <label for="deanery" class="block text-sm font-medium text-gray-700 mb-2">
                Chọn châu
            </label>
            <select id="deanery" v-model="selectedDeaneryId" @change="loadActivities"
                class="w-full md:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="" disabled>-- Chọn châu --</option>
                <option v-for="deanery in deaneries" :key="deanery.deaneryId" :value="deanery.deaneryId">
                    {{ deanery.name }}
                </option>
            </select>
        </div>
        <div class="px-4 md:px-6 mb-4 flex gap-4">
            <button @click="changeStatus(false)"
                :class="activeStatus === false ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-4 py-2 rounded-md text-sm font-medium">
                Sắp thực hiện
            </button>
            <button @click="changeStatus(true)"
                :class="activeStatus === true ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-4 py-2 rounded-md text-sm font-medium">
                Đã thực hiện
            </button>
        </div>
        <div class="flex-1 overflow-auto px-4 md:px-6 pb-6">
            <div class="bg-white rounded-lg shadow">
                <div class="overflow-x-auto">
                    <table class="min-w-full border-collapse" v-if="activeStatus !== null && selectedDeaneryId">
                        <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr class="border-b border-gray-200">
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">STT</th>
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">Ngày & giờ
                                </th>
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">Nội dung
                                </th>
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">Người tạo
                                </th>
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">Tham dự
                                </th>
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">Điểm danh
                                </th>
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">Hoàn thành
                                </th>
                                <th class="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700">Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(activity, index) in activities" :key="activity.activityId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 py-2 text-xs md:text-sm">{{ index + 1 }}</td>
                                <td class="px-3 py-2 text-xs md:text-sm">{{ formatDate(activity.date) }} - {{
                                    activity.time }}</td>
                                <td class="px-3 py-2 text-xs md:text-sm break-words">{{ activity.description }}</td>
                                <td class="px-3 py-2 text-xs md:text-sm">{{ activity.createdBy?.name ?? '---' }}</td>
                                <td class="px-3 py-2 text-xs md:text-sm">
                                    {{activity.attendances?.filter(a => a.present).length ?? 0}}
                                </td>
                                <td class="px-3 py-2 text-xs md:text-sm">
                                    <router-link :to="`/attendances/add/${activity.activityId}`"
                                        class="px-2.5 md:px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs md:text-sm">
                                        Điểm danh
                                    </router-link>
                                </td>
                                <td class="px-3 py-2 text-xs md:text-sm">
                                    <button @click="handleChangeStatus(activity.activityId)"
                                        class="px-2.5 md:px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs md:text-sm">
                                        Hoàn thành
                                    </button>
                                </td>
                                <td class="px-3 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <router-link :to="`/activities/detail/${activity.activityId}`"
                                            class="px-2.5 md:px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs md:text-sm">
                                            Xem
                                        </router-link>
                                        <router-link :to="`/activities/update/${activity.activityId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button @click="openConfirm(activity.activityId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="activeStatus === null && selectedDeaneryId" class="text-center text-gray-500 py-4">
                    Vui lòng chọn trạng thái để xem danh sách sinh hoạt.
                </div>
                <div v-if="activities.length === 0 && activeStatus !== null && selectedDeaneryId"
                    class="text-center text-gray-500 py-4">
                    Châu này chưa có hoạt động nào.
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useToast } from "@/composables/useToast";
import { getAllDeanery } from "@/services/deaneryService";
import { deleteActivity, getAllActivitiesByDeaneryId, updateStatusActivity } from "@/services/activityService";
import type { DeaneryDto } from "@/types/deanery.type";
import type { ActivityDto } from "@/types/activity.type";
import type { ApiResponse } from "@/types/api.type";
import { formatDate } from "@/utils/dateFormat";

const { showToast } = useToast();
const deaneries = ref<DeaneryDto[]>([]);
const activities = ref<ActivityDto[]>([]);
const selectedDeaneryId = ref<number | "">("");
const activeStatus = ref<boolean | null>(null);
const showConfirm = ref(false);
const deleteId = ref<number | null>(null);

onMounted(async () => {
    try {
        const res: ApiResponse<DeaneryDto[]> = await getAllDeanery();
        if (res.code === 200) {
            deaneries.value = res.data;
        }
    } catch (error: any) {
        showToast(error.message, "error");
    }
});

function openConfirm(id: number) {
    deleteId.value = id;
    showConfirm.value = true;
}

async function loadActivities() {
    if (!selectedDeaneryId.value || activeStatus.value === null) return;
    try {
        const res: ApiResponse<ActivityDto[]> = await getAllActivitiesByDeaneryId(
            Number(selectedDeaneryId.value),
            activeStatus.value
        );
        if (res.code === 200) {
            activities.value = res.data;
        }
    } catch (error: any) {
        showToast(error.message, "error");
    }
}

function changeStatus(status: boolean) {
    activeStatus.value = status;
    activities.value = [];
    if (selectedDeaneryId.value) {
        loadActivities();
    }
}

async function handleChangeStatus(activityId) {
    try {
        const res = await updateStatusActivity(activityId);
        if (res.code === 200) {
            showToast(res.message, "success");
            await loadActivities();
        }
    } catch (error: any) {
        showToast(error.message, "error");
    }
}

async function confirmDelete() {
    if (!deleteId.value) return;
    showConfirm.value = false;
    try {
        const res = await deleteActivity(deleteId.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            await loadActivities();
        }
    } catch (error: any) {
        showToast(error.message, "error");
    }
}
</script>
