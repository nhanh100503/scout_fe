<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-200">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-emerald-700">Cập nhật đẳng thứ</h3>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Đẳng thứ <span class="text-red-500">*</span></label>
                    <VueMultiselect v-model="selectedRank" :options="ranks" label="name" track-by="rankId"
                        placeholder="Chọn Đẳng thứ" :multiple="false" :close-on-select="true" :allow-empty="false">
                    </VueMultiselect>
                    <p v-if="errors.rankId" class="mt-1 text-xs text-red-500">{{ errors.rankId }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                    <textarea v-model="form.notes" rows="3"
                        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                        placeholder="Thêm ghi chú nếu có..."></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Minh chứng (Tối đa 3)</label>
                    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*"
                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                    <p class="mt-1 text-xs text-gray-500">Chỉ chấp nhận file ảnh. Bạn đã chọn {{ form.evidenceFiles.length }}/3 ảnh.</p>
                    
                    <div v-if="form.evidenceFiles.length > 0" class="mt-2 space-y-2">
                        <div v-for="(file, index) in form.evidenceFiles" :key="index" class="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200">
                            <span class="text-xs text-gray-600 truncate max-w-[200px]">{{ file.name }}</span>
                            <button type="button" @click="removeFile(index)" class="text-red-500 hover:text-red-700">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition text-sm">
                        Hủy
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition disabled:opacity-50 text-sm">
                        {{ loading ? 'Đang xử lý...' : 'Xác nhận' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { getAllRanksTypeFalse } from "@/services/rankService";
import { assignRank } from "@/services/rankHistoryService";
import { useToast } from "@/composables/useToast";
import type { RankDto } from "@/types/rank.type";

const props = defineProps<{
    show: boolean;
    memberId: number;
}>();

const emit = defineEmits(["close", "success"]);

const { showToast } = useToast();
const ranks = ref<RankDto[]>([]);
const selectedRank = ref<RankDto | null>(null);
const loading = ref(false);
const errors = ref<Record<string, string>>({});

const form = ref({
    notes: "",
    evidenceFiles: [] as File[]
});

const fileInput = ref<HTMLInputElement | null>(null);

onMounted(async () => {
    try {
        const res = await getAllRanksTypeFalse();
        if (res.code === 200) {
            ranks.value = res.data;
        }
    } catch (error: any) {
        showToast("Không thể tải danh sách Đẳng thứ", "error");
    }
});

function handleFileChange(event: any) {
    const selectedFiles = Array.from(event.target.files) as File[];
    const totalFiles = form.value.evidenceFiles.length + selectedFiles.length;
    
    if (totalFiles > 3) {
        showToast("Chỉ được chọn tối đa 3 ảnh minh chứng", "warning");
    } else {
        form.value.evidenceFiles = [...form.value.evidenceFiles, ...selectedFiles];
    }

    // Clear the input so the same file can be selected again if removed
    if (fileInput.value) {
        fileInput.value.value = "";
    }
}

const removeFile = (index: number) => {
    form.value.evidenceFiles.splice(index, 1);
};

async function handleSubmit() {
    if (!selectedRank.value) {
        errors.value.rankId = "Vui lòng chọn đẳng thứ";
        return;
    }
    errors.value = {};
    loading.value = true;

    try {
        const res = await assignRank({
            memberId: props.memberId,
            rankId: selectedRank.value.rankId,
            notes: form.value.notes,
            evidenceFiles: form.value.evidenceFiles
        });

        if (res.code === 201) {
            showToast("Chỉnh sửa đẳng thứ thành công", "success");
            emit("success");
            emit("close");
        }
    } catch (error: any) {
        showToast(error.message || "Có lỗi xảy ra", "error");
    } finally {
        loading.value = false;
    }
}
</script>

<style>
/* Custom multiselect styles to match the emerald theme */
.multiselect__option--highlight {
    background: #059669 !important;
}
.multiselect__tag {
    background: #059669 !important;
}
</style>
