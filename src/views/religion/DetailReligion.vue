<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Chi tiết tôn giáo</h2>
            <div v-if="religion" class="">
                <label class="block text-sm font-medium text-gray-700">
                    Tên tôn giáo <span class="text-red-500">*</span>
                </label>
                <input type="text" :value="religion.name" readonly
                    class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" placeholder=" Nhập tên tôn giáo" />
                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/religions" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <router-link :to="`/religions/update/${religion.religionId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Sửa tôn giáo
                    </router-link>
                </div>
            </div>
            <div v-else class="text-red-500">Không tìm thấy tôn giáo</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { ReligionDto, ValidationErrorReligion } from "@/types/religion.type";
import { getReligionById } from "@/services/religionService";

const errors = ref<ValidationErrorReligion>({});
const { toast, showToast } = useToast();
const route = useRoute();
const religion = ref<ReligionDto | null>(null);
const religionId = Number(route.params.religionId);
onMounted(async () => {
    try {
        const res: ApiResponse<ReligionDto> = await getReligionById(religionId);
        if (res.code === 200) {
            religion.value = res.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorReligion;
        }
        showToast(apiRes.message, "error");
    }
});
</script>
