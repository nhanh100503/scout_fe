<template>
    <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách tôn giáo
            </h2>
            <router-link to="/religions/add"
                class="px-3 md:px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm md:text-base">
                + Thêm tôn giáo
            </router-link>
        </div>
        <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-120 border border-gray-300">
                <h3 class="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa tôn giáo này không?</p>
                <div class="flex justify-center gap-6">
                    <button @click="showConfirm = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Hủy
                    </button>
                    <LoadingButton
                        type="button"
                        :loading="isLoading"
                        loading-text="Đang xóa..."
                        base-class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 inline-flex items-center justify-center transition-opacity duration-200"
                        @click="confirmDelete">
                        Chắc chắn
                    </LoadingButton>
                </div>
            </div>
        </div>
        <LoadingScreen v-if="isPageLoading" />
        <div v-else class="flex-1 overflow-auto px-4 md:px-6 pb-6">
            <div class="bg-white rounded-lg shadow">
                <div class="overflow-x-auto">
                    <table class="min-w-full border-collapse">
                        <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr class="border-b border-gray-200">
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    STT
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Tên tôn giáo
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(religion, index) in religions" :key="religion.religionId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm break-words">
                                    {{ religion.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <router-link :to="`/religions/detail/${religion.religionId}`"
                                            class="px-2.5 md:px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs md:text-sm">
                                            Xem
                                        </router-link>
                                        <router-link :to="`/religions/update/${religion.religionId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button @click="openConfirm(religion.religionId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="religions.length === 0" class="text-center text-gray-500 py-4">
                    Chưa có tôn giáo nào.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import { useLoading } from "@/composables/useLoading";
import { deleteReligion, getAllReligion } from "@/services/religionService";
import { ReligionDto } from "@/types/religion.type";
import { ref, onMounted } from "vue";
import LoadingButton from "@/components/common/LoadingButton.vue";
import LoadingScreen from "@/components/common/LoadingScreen.vue";

const religions = ref<ReligionDto[]>([]);
const showConfirm = ref(false);
const deleteId = ref<number | null>(null);
const { showToast } = useToast();
const { isLoading, withLoading } = useLoading();
const isPageLoading = ref(true);


async function loadReligions() {
    const res = await getAllReligion();
    religions.value = res.data;
}

onMounted(async () => {
    try {
        await loadReligions();
    } finally {
        isPageLoading.value = false;
    }
});

function openConfirm(id: number) {
    deleteId.value = id;
    showConfirm.value = true;
}

async function confirmDelete() {
    if (!deleteId.value) return;
    await withLoading(async () => {
        try {
            const res = await deleteReligion(deleteId.value!);
            if (res.code === 200) {
                showConfirm.value = false;
                await loadReligions();
                showToast(res.message, "success");
            }
        } catch (error: any) {
            showToast(error.message, "error");
        }
    });
    showConfirm.value = false;
}
</script>
