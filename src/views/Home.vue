<template>
    <LoadingScreen v-if="isPageLoading" />
    <section v-else class="h-full flex flex-col px-4 py-6 bg-gray-50">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Bảng điều khiển</h1>
            <p class="mt-2 text-gray-600">
                👋 Chào mừng bạn quay lại! Đây là hệ thống quản lý đoàn sinh, huynh trưởng.
            </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow p-6 flex flex-col items-start">
                <span class="text-sm text-gray-500">Đoàn sinh</span>
                <span class="mt-2 text-2xl font-semibold text-indigo-600">{{ dsCount }}</span>
            </div>
            <div class="bg-white rounded-xl shadow p-6 flex flex-col items-start">
                <span class="text-sm text-gray-500">Huynh trưởng</span>
                <span class="mt-2 text-2xl font-semibold text-green-600">{{ htCount }}</span>
            </div>
            <div class="bg-white rounded-xl shadow p-6 flex flex-col items-start">
                <span class="text-sm text-gray-500">Tổng hợp</span>
                <span class="mt-2 text-2xl font-semibold text-emerald-600">{{ totalCount }}</span>
            </div>
        </div>
        <div class="flex-1 flex flex-col bg-white rounded-xl shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-800">Hoạt động gần đây</h2>
                <button class="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    Xuất báo cáo
                </button>
            </div>

            <div class="flex-1 overflow-x-auto">
                <table class="min-w-full text-sm text-left">
                    <thead class="bg-gray-100 text-gray-700">
                        <tr>
                            <th class="px-6 py-3">Thời gian</th>
                            <th class="px-6 py-3">Người dùng</th>
                            <th class="px-6 py-3">Hoạt động</th>
                            <th class="px-6 py-3">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr>
                            <td class="px-6 py-4">23/12/2025</td>
                            <td class="px-6 py-4">Nguyễn Văn A</td>
                            <td class="px-6 py-4">Đăng nhập hệ thống</td>
                            <td class="px-6 py-4 text-green-600 font-medium">Thành công</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4">22/12/2025</td>
                            <td class="px-6 py-4">Trần Thị B</td>
                            <td class="px-6 py-4">Tạo đơn hàng mới</td>
                            <td class="px-6 py-4 text-indigo-600 font-medium">Hoàn tất</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ApiResponse } from "@/types/api.type";
import { countMember } from "@/services/memberService";
import LoadingScreen from "@/components/common/LoadingScreen.vue";

const dsCount = ref<number>(0);
const htCount = ref<number>(0);
const totalCount = ref<number>(0);
const isPageLoading = ref(true);

onMounted(async () => {
    try {
        const resDS: ApiResponse<number> = await countMember("DS");
        if (resDS.code === 200) {
            dsCount.value = resDS.data || 0;
        }

        const resHT: ApiResponse<number> = await countMember("HT");
        if (resHT.code === 200) {
            htCount.value = resHT.data || 0;
        }

        totalCount.value = dsCount.value + htCount.value;
    } catch (error: any) {
        console.error("Lỗi khi lấy số lượng:", error.message);
    } finally {
        isPageLoading.value = false;
    }
});
</script>
