<template>
    <div class="flex flex-col h-screen">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách châu
            </h2>
            <router-link to="/deaneries/add"
                class="px-3 md:px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm md:text-base">
                + Thêm châu
            </router-link>
        </div>
        <div class="px-4 md:px-6 mb-4">
            <input v-model="searchQuery" type="text" placeholder="🔍 Tìm kiếm theo tên châu..."
                class="w-full md:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
        </div>
        <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-120 border border-gray-300">
                <h3 class="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa châu này không?</p>
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
                                    Tên châu
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(deanery, index) in filteredDeaneries" :key="deanery.deaneryId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm break-words">
                                    {{ deanery.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <router-link :to="`/deaneries/detail/${deanery.deaneryId}`"
                                            class="px-2.5 md:px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs md:text-sm">
                                            Xem
                                        </router-link>
                                        <router-link :to="`/deaneries/update/${deanery.deaneryId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button @click="openConfirm(deanery.deaneryId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="filteredDeaneries.length === 0" class="text-center text-gray-500 py-4">
                    {{ searchQuery ? 'Không tìm thấy kết quả phù hợp.' : 'Chưa có châu nào.' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import { deleteDeanery, getAllDeanery } from "@/services/deaneryService";
import { DeaneryDto } from "@/types/deanery.type";
import { ref, onMounted, computed } from "vue";

const { showToast } = useToast();
const deaneries = ref<DeaneryDto[]>([]);
const showConfirm = ref(false);
const deleteId = ref<number | null>(null);
const searchQuery = ref("");

const filteredDeaneries = computed(() => {
    if (!searchQuery.value.trim()) return deaneries.value;
    const q = searchQuery.value.toLowerCase().trim();
    return deaneries.value.filter(d => d.name?.toLowerCase().includes(q));
});

async function loadDeaneries() {
    const res = await getAllDeanery();
    deaneries.value = res.data;
}
onMounted(async () => {
    await loadDeaneries();
});

function openConfirm(id: number) {
    deleteId.value = id;
    showConfirm.value = true;
}

async function confirmDelete() {
    if (!deleteId.value) return;
    showConfirm.value = false;
    try {
        const res = await deleteDeanery(deleteId.value);
        if (res.code === 200) {
            await loadDeaneries();
            showToast(res.message, "success");
        }
    } catch (error: any) {
        showToast(error.message, "error");
    }
}
</script>
