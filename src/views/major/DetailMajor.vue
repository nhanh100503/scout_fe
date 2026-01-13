<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Chi tiết ngành</h2>
            <div v-if="major" class="">
                <label class="block text-sm font-medium text-gray-700">
                    Tên ngành <span class="text-red-500">*</span>
                </label>
                <input type="text" :value="major.name" readonly
                    class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" placeholder=" Nhập tên ngành" />
                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/majors" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <router-link :to="`/majors/update/${major.majorId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Sửa ngành
                    </router-link>
                </div>
            </div>
            <div v-else class="text-red-500">Không tìm thấy ngành</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMajorById } from "@/services/majorService";
import type { MajorDto, ValidationErrorMajor } from "@/types/major.type";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";

const errors = ref<ValidationErrorMajor>({});
const { toast, showToast } = useToast();
const route = useRoute();
const major = ref<MajorDto | null>(null);
const majorId = Number(route.params.majorId);
onMounted(async () => {
    try {
        const res: ApiResponse<MajorDto> = await getMajorById(majorId);
        if (res.code === 200) {
            major.value = res.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorMajor;
        }
        showToast(apiRes.message, "error");
    }
});
</script>
