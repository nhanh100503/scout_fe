<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" @click="$emit('close')">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 border border-gray-200 flex flex-col max-h-[90vh]" @click.stop>
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-emerald-700">Lịch sử đẳng thứ - {{ memberName }}</h3>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="flex-1 overflow-auto">
                <table class="min-w-full border-collapse">
                    <thead class="bg-gray-50 sticky top-0">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày cập nhật</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đẳng thứ</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người cập nhật</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minh chứng</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="history in histories" :key="history.rankHistoryId" class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                {{ formatDate(history.createdAt) }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                <span class="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                                    {{ history.rank?.name }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-900">
                                {{ history.assigner?.name }}
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-500 break-words max-w-xs">
                                {{ history.notes || '-' }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                <div class="flex gap-1 flex-wrap">
                                    <img v-for="url in history.evidenceUrls.slice(0, 3)" :key="url" :src="url" alt="Evidence" class="w-16 h-16 object-cover rounded cursor-pointer" @click="openImageModal(url)" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="loading" class="text-center py-10 text-gray-500">
                    Đang tải dữ liệu...
                </div>
                <div v-else-if="histories.length === 0" class="text-center py-10 text-gray-500">
                    Chưa có lịch sử cập nhật đẳng thứ nào.
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button @click="$emit('close')"
                    class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition">
                    Đóng
                </button>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" @click="closeImageModal">
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-4xl max-h-[90vh] overflow-auto" @click.stop>
            <div class="flex justify-between items-center mb-4">
                <button @click="closeImageModal" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <img :src="currentImage" alt="Evidence" class="w-full h-auto" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getRankHistory, type RankHistoryDto } from "@/services/rankHistoryService";
import { formatDate } from "@/utils/dateFormat";
import { useToast } from "@/composables/useToast";

const props = defineProps<{
    show: boolean;
    memberId: number;
    memberName: string;
}>();

const emit = defineEmits(["close"]);
const { showToast } = useToast();
const histories = ref<RankHistoryDto[]>([]);
const loading = ref(false);
const showImageModal = ref(false);
const currentImage = ref('');

watch(() => props.show, async (newVal) => {
    if (newVal && props.memberId) {
        await fetchHistory();
    }
});

async function fetchHistory() {
    loading.value = true;
    try {
        const res = await getRankHistory(props.memberId);
        if (res.code === 200) {
            histories.value = res.data;
        }
    } catch (error: any) {
        showToast("Không thể tải lịch sử đẳng thứ", "error");
    } finally {
        loading.value = false;
    }
}

function openImageModal(url: string) {
    currentImage.value = url;
    showImageModal.value = true;
}

function closeImageModal() {
    showImageModal.value = false;
    currentImage.value = '';
}
</script>
