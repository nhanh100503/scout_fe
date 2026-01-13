<template>
    <div class="flex flex-col h-screen">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách trách vụ theo ngành
            </h2>
        </div>

        <div class="px-4 md:px-6 mb-4">
            <label for="major" class="block text-sm font-medium text-gray-700 mb-2">
                Chọn ngành
            </label>
            <select id="major" v-model="selectedMajorId" @change="fetchResponsibilities"
                class="w-full md:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="" disabled>-- Chọn ngành --</option>
                <option v-for="major in majors" :key="major.majorId" :value="major.majorId">
                    {{ major.name }}
                </option>
            </select>
        </div>

        <div class="flex-1 overflow-auto px-4 md:px-6 pb-6">
            <div class="bg-white rounded-lg shadow">
                <div class="overflow-x-auto">
                    <table class="min-w-full border-collapse">
                        <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr class="border-b border-gray-200">
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    STT
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Tên trách vụ
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Loại
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(resp, index) in responsibilities" :key="resp.responsibilityId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm break-words">
                                    {{ resp.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <span :class="resp.type === 2
                                        ? 'text-blue-600 font-semibold'
                                        : resp.type === 1
                                            ? 'text-green-600 font-semibold'
                                            : 'text-purple-600 font-semibold'">
                                        {{
                                            resp.type === 1
                                                ? 'Đoàn sinh'
                                                : resp.type === 2
                                                    ? 'Trưởng'
                                                    : 'Sử dụng chung'
                                        }}
                                    </span>
                                </td>

                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <router-link :to="`/responsibilities/detail/${resp.responsibilityId}`"
                                            class="px-2.5 md:px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs md:text-sm">
                                            Xem
                                        </router-link>
                                        <router-link :to="`/responsibilities/update/${resp.responsibilityId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button @click="openConfirm(resp.responsibilityId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="responsibilities.length === 0 && selectedMajorId" class="text-center text-gray-500 py-4">
                    Ngành này chưa có trách vụ nào.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllMajor } from "@/services/majorService";
import { getAllResponsibilitiesByMajorId } from "@/services/responsibilityService";
import type { MajorDto } from "@/types/major.type";
import type { ResponsibilityDto } from "@/types/responsibility.type";

const majors = ref<MajorDto[]>([]);
const responsibilities = ref<ResponsibilityDto[]>([]);
const selectedMajorId = ref<number | "">("");

onMounted(async () => {
    const res = await getAllMajor();
    majors.value = res.data;
});

async function fetchResponsibilities() {
    if (!selectedMajorId.value) return;
    const res = await getAllResponsibilitiesByMajorId(Number(selectedMajorId.value));
    responsibilities.value = res.data;
}

function openConfirm(id: number) {
}
</script>
