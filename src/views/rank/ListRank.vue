<template>
    <div class="flex flex-col h-screen">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách đẳng thứ
            </h2>
            <router-link to="/ranks/add"
                class="px-3 md:px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm md:text-base">
                + Thêm đẳng thứ
            </router-link>
        </div>
        <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-120 border border-gray-300">
                <h3 class="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa đẳng thứ này không?</p>
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
                                    Tên đẳng thứ
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Loại đẳng thứ
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(rank, index) in ranks" :key="rank.rankId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm break-words">
                                    {{ rank.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm"> <span
                                        :class="rank.type ? 'text-blue-600 font-semibold' : 'text-green-600 font-semibold'">
                                        {{ rank.type ? 'Trưởng' : 'Đoàn sinh' }} </span> </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <router-link :to="`/ranks/detail/${rank.rankId}`"
                                            class="px-2.5 md:px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs md:text-sm">
                                            Xem
                                        </router-link>
                                        <router-link :to="`/ranks/update/${rank.rankId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button @click="openConfirm(rank.rankId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="ranks.length === 0" class="text-center text-gray-500 py-4">
                    Chưa có đẳng thứ nào.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import { deleteRank, getAllRank } from "@/services/rankService";
import { RankDto } from "@/types/rank.type";
import { ref, onMounted } from "vue";

const { showToast } = useToast();
const ranks = ref<RankDto[]>([]);
const showConfirm = ref(false);
const deleteId = ref<number | null>(null);

async function loadRanks() {
    const res = await getAllRank();
    ranks.value = res.data;
}

onMounted(async () => {
    await loadRanks();
});

function openConfirm(id: number) {
    deleteId.value = id;
    showConfirm.value = true;
}

async function confirmDelete() {
    if (!deleteId.value) return;
    showConfirm.value = false;
    try {
        const res = await deleteRank(deleteId.value);
        if (res.code === 200) {
            await loadRanks();
            showToast(res.message, "success");
        }
    } catch (error: any) {
        showToast(error.message, "error");
    }
}
</script>
