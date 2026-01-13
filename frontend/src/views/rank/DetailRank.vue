<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Chi tiết đẳng thứ</h2>
            <div v-if="rank" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Tên đẳng thứ <span class="text-red-500">*</span>
                    </label>
                    <input type="text" :value="rank.name" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Loại đẳng thứ <span class="text-red-500">*</span>
                    </label>
                    <div class="flex gap-6">
                        <label class="flex items-center gap-2">
                            <input type="radio" value="true" v-model="rank.type" disabled />
                            <span>Trưởng</span>
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="radio" value="false" v-model="rank.type" disabled />
                            <span>Đoàn sinh</span>
                        </label>
                    </div>
                </div>
                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/ranks" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <router-link :to="`/ranks/update/${rank.rankId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Sửa đẳng thứ
                    </router-link>
                </div>
            </div>
            <div v-else class="text-red-500">Không tìm thấy đẳng thứ</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { RankDto, ValidationErrorRank } from "@/types/rank.type";
import { getRankById } from "@/services/rankService";

const errors = ref<ValidationErrorRank>({});
const { toast, showToast } = useToast();
const route = useRoute();
const rank = ref<RankDto | null>(null);
const rankId = Number(route.params.rankId);
onMounted(async () => {
    try {
        const res: ApiResponse<RankDto> = await getRankById(rankId);
        if (res.code === 200) {
            rank.value = res.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorRank;
        }
        showToast(apiRes.message, "error");
    }
});
</script>
