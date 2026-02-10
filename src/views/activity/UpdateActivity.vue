<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Cập nhật sinh hoạt</h2>
            <form v-if="activity" class="space-y-4" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Châu <span class="text-red-500">*</span>
                        </label>
                        <select v-model="form.deaneryId" :class="inputClass(errors.deaneryId)" @change="onDeaneryChange">
                            <option value="">-- Chọn châu --</option>
                            <option v-for="d in deaneries" :key="d.deaneryId" :value="d.deaneryId">
                                {{ d.name }}
                            </option>
                        </select>
                        <p v-if="errors.deaneryId" class="mt-1 text-xs text-red-500 break-words">{{ errors.deaneryId }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Đội/Nhóm <span class="text-xs text-gray-400">(tùy chọn — bỏ trống = cấp châu)</span>
                        </label>
                        <select v-model="form.teamId" :class="inputClass('')">
                            <option :value="null">-- Tất cả (cấp châu) --</option>
                            <option v-for="t in teams" :key="t.teamId" :value="t.teamId">
                                {{ t.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Mô tả <span class="text-red-500">*</span>
                    </label>
                    <textarea v-model="form.description" :class="inputClass(errors.description)" rows="3"></textarea>
                    <p v-if="errors.description" class="mt-1 text-xs text-red-500 break-words">{{ errors.description }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Ghi chú</label>
                    <textarea v-model="form.note" :class="inputClass(errors.note)" rows="2"></textarea>
                    <p v-if="errors.note" class="mt-1 text-xs text-red-500 break-words">{{ errors.note }}</p>
                </div>

                <!-- Plan Rows Table -->
                <div>
                    <h3 class="text-lg font-semibold text-emerald-700 mb-3">📋 Kế hoạch sinh hoạt</h3>
                    <div class="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                        <table class="min-w-full border-collapse">
                            <thead class="bg-gray-100">
                                <tr class="border-b border-gray-200">
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-700 w-12">STT</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-700 w-28">Thời gian</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-700">Nội dung</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-700 w-32">Phụ trách</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-700 w-32">Vật dụng</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-700 w-32">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in planRows" :key="index"
                                    class="border-t border-gray-200 hover:bg-gray-50">
                                    <td class="px-2 py-1 text-sm text-center text-gray-500">{{ index + 1 }}</td>
                                    <td class="px-1 py-1">
                                        <input v-model="row.startTime" type="text"
                                            class="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="VD: 14:00" />
                                    </td>
                                    <td class="px-1 py-1">
                                        <input v-model="row.content" type="text"
                                            class="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Nội dung..." />
                                    </td>
                                    <td class="px-1 py-1">
                                        <input v-model="row.pic" type="text"
                                            class="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Người phụ trách" />
                                    </td>
                                    <td class="px-1 py-1">
                                        <input v-model="row.materials" type="text"
                                            class="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Vật dụng" />
                                    </td>
                                    <td class="px-1 py-1">
                                        <input v-model="row.notes" type="text"
                                            class="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                            placeholder="Ghi chú" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/activities" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <button type="submit"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Cập nhật sinh hoạt
                    </button>
                </div>
            </form>

            <div v-else class="text-red-500">Không tìm thấy sinh hoạt</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth";
import { inputClass } from "@/utils/inputClass";
import type { ActivityDto, ActivityUpdateRequest, PlanRowInput, ValidationErrorActivity } from "@/types/activity.type";
import { getActivityById, updateActivity } from "@/services/activityService";
import { getAllDeanery } from "@/services/deaneryService";
import { getTeamsByDeaneryId } from "@/services/teamService";
import type { DeaneryDto } from "@/types/deanery.type";
import type { TeamDto } from "@/types/team.type";

const errors = ref<ValidationErrorActivity>({});
const { showToast } = useToast();
const { canModifyActivity } = useAuth();
const route = useRoute();
const router = useRouter();

const activity = ref<ActivityDto | null>(null);
const form = ref<ActivityUpdateRequest>({
    date: "",
    time: "",
    description: "",
    note: "",
    deaneryId: null as any,
    teamId: null,
});

const deaneries = ref<DeaneryDto[]>([]);
const teams = ref<TeamDto[]>([]);
const activityId = Number(route.params.activityId);

// Initialize 10 plan rows
const planRows = ref<PlanRowInput[]>(
    Array.from({ length: 10 }, (_, i) => ({
        startTime: "",
        content: "",
        pic: "",
        materials: "",
        notes: "",
        order: i + 1,
    }))
);

onMounted(async () => {
    if (!canModifyActivity.value) {
        showToast("Bạn không có quyền sửa sinh hoạt. Vai trò DS chỉ có quyền xem và bình luận.", "error");
        router.push("/activities");
        return;
    }

    try {
        // Load activity data
        const res: ApiResponse<ActivityDto> = await getActivityById(activityId);
        if (res.code === 200) {
            activity.value = res.data;
            form.value.date = res.data.date;
            form.value.time = res.data.time;
            form.value.description = res.data.description;
            form.value.note = res.data.note;
            form.value.deaneryId = res.data.deanery?.deaneryId ?? 0;
            form.value.teamId = res.data.team?.teamId ?? null;

            // Populate plan rows from API response
            if (res.data.planRows && res.data.planRows.length > 0) {
                // Fill existing rows and pad to 10
                const existingRows: PlanRowInput[] = res.data.planRows.map(r => ({
                    startTime: r.startTime || "",
                    content: r.content || "",
                    pic: r.pic || "",
                    materials: r.materials || "",
                    notes: r.notes || "",
                    order: r.order,
                }));
                while (existingRows.length < 10) {
                    existingRows.push({
                        startTime: "", content: "", pic: "", materials: "", notes: "",
                        order: existingRows.length + 1,
                    });
                }
                planRows.value = existingRows;
            }
        }

        // Load deaneries
        const deaneryRes: ApiResponse<DeaneryDto[]> = await getAllDeanery();
        if (deaneryRes.code === 200) {
            deaneries.value = deaneryRes.data;
        }

        // Load teams for current deanery
        if (form.value.deaneryId) {
            const teamRes = await getTeamsByDeaneryId(form.value.deaneryId);
            if (teamRes.code === 200) {
                teams.value = teamRes.data;
            }
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorActivity;
        }
        showToast(apiRes.message || "Lỗi tải dữ liệu", "error");
    }
});

async function onDeaneryChange() {
    form.value.teamId = null;
    teams.value = [];
    if (form.value.deaneryId) {
        try {
            const res = await getTeamsByDeaneryId(form.value.deaneryId);
            if (res.code === 200) {
                teams.value = res.data;
            }
        } catch (e) {
            console.error("Không tải được danh sách đội/nhóm", e);
        }
    }
}

async function handleSubmit() {
    errors.value = {};
    try {
        // Filter out empty plan rows
        const filledRows = planRows.value.filter(
            r => r.startTime || r.content || r.pic || r.materials || r.notes
        );

        const payload: ActivityUpdateRequest = {
            ...form.value,
            planRows: filledRows.length > 0 ? filledRows : undefined,
        };

        const res = await updateActivity(activityId, payload);
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
