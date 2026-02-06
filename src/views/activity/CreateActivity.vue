<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Thêm sinh hoạt mới</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Châu <span class="text-red-500">*</span>
                        </label>
                        <select v-model="form.deaneryId" :class="inputClass(errors.deaneryId)">
                            <option value="" disabled>-- Chọn châu --</option>
                            <option v-for="d in deaneries" :key="d.deaneryId" :value="d.deaneryId">
                                {{ d.name }}
                            </option>
                        </select>
                        <p v-if="errors.deaneryId" class="mt-1 text-xs text-red-500 break-words">{{ errors.deaneryId }}
                        </p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Ngày <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.date" type="date" :class="inputClass(errors.date)" />
                        <p v-if="errors.date" class="mt-1 text-xs text-red-500 break-words">{{ errors.date }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Giờ <span class="text-red-500">*</span>
                        </label>
                        <input v-model="form.time" type="time" :class="inputClass(errors.time)" />
                        <p v-if="errors.time" class="mt-1 text-xs text-red-500 break-words">{{ errors.time }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Mô tả <span class="text-red-500">*</span>
                        </label>
                        <textarea v-model="form.description" :class="inputClass(errors.description)"
                            placeholder="Nhập mô tả hoạt động" rows="3"></textarea>
                        <p v-if="errors.description" class="mt-1 text-xs text-red-500 break-words">{{ errors.description
                        }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Ghi chú</label>
                        <textarea v-model="form.note" :class="inputClass(errors.note)"
                            placeholder="Nhập ghi chú (nếu có)" rows="2"></textarea>
                        <p v-if="errors.note" class="mt-1 text-xs text-red-500 break-words">{{ errors.note }}</p>
                    </div>

                    <!-- Deanery select -->


                    <div class="flex justify-end gap-3 mt-4">
                        <router-link to="/activities" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                            Hủy
                        </router-link>
                        <button type="submit"
                            class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                            Lưu sinh hoạt
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/routers";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth";
import { inputClass } from "@/utils/inputClass";
import type { ApiResponse } from "@/types/api.type";
import { ActivityCreateRequest, ValidationErrorActivity } from "@/types/activity.type";
import { createActivity } from "@/services/activityService";
import { getAllDeanery } from "@/services/deaneryService";
import type { DeaneryDto } from "@/types/deanery.type";

const form = ref<ActivityCreateRequest>({
    date: "",
    time: "",
    description: "",
    note: "",
    deaneryId: null
});

const errors = ref<ValidationErrorActivity>({});
const deaneries = ref<DeaneryDto[]>([]);
const { showToast } = useToast();
const { canModifyActivity, isDSOnly } = useAuth();

onMounted(async () => {
    // Route guard: Redirect DS-only users
    if (!canModifyActivity.value) {
        showToast("Bạn không có quyền tạo sinh hoạt. Vai trò Đoàn Sinh chỉ có quyền xem và bình luận.", "error");
        router.push("/activities");
        return;
    }

    try {
        const res: ApiResponse<DeaneryDto[]> = await getAllDeanery();
        if (res.code === 200) {
            deaneries.value = res.data;
        }
    } catch (err: any) {
        showToast("Không tải được danh sách châu", "error");
    }
});

async function handleSubmit() {
    errors.value = {};
    try {
        const res: ApiResponse<any> = await createActivity(form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/activities");
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorActivity;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
