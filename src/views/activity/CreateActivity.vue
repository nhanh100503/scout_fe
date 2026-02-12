<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Thêm sinh hoạt mới</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">

                    <!-- Activity Type Selector -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Cấp sinh hoạt <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <button v-for="opt in activityTypeOptions" :key="opt.value" type="button"
                                :class="[
                                    'px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all duration-200',
                                    form.activityType === opt.value
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                ]"
                                @click="onActivityTypeChange(opt.value)">
                                {{ opt.icon }} {{ opt.label }}
                            </button>
                        </div>
                        <p v-if="errors.activityType" class="mt-1 text-xs text-red-500 break-words">{{ errors.activityType }}</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Deanery (always shown if canSelectDeanery) -->
                        <div v-if="canSelectDeanery">
                            <label class="block text-sm font-medium text-gray-700">
                                Châu <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.deaneryId" :class="inputClass(errors.deaneryId)" @change="onDeaneryChange">
                                <option value="" disabled>-- Chọn châu --</option>
                                <option v-for="d in deaneries" :key="d.deaneryId" :value="d.deaneryId">
                                    {{ d.name }}
                                </option>
                            </select>
                            <p v-if="errors.deaneryId" class="mt-1 text-xs text-red-500 break-words">{{ errors.deaneryId }}</p>
                        </div>

                        <!-- Parish (shown when type is PARISH) -->
                        <div v-if="form.activityType === 'PARISH'">
                            <label class="block text-sm font-medium text-gray-700">
                                Giáo xứ <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.parishId" :class="inputClass(errors.parishId)">
                                <option :value="null" disabled>-- Chọn giáo xứ --</option>
                                <option v-for="p in parishes" :key="p.parishId" :value="p.parishId">
                                    {{ p.name }}
                                </option>
                            </select>
                            <p v-if="errors.parishId" class="mt-1 text-xs text-red-500 break-words">{{ errors.parishId }}</p>
                        </div>

                        <!-- Major (shown when type is MAJOR) -->
                        <div v-if="form.activityType === 'MAJOR'">
                            <label class="block text-sm font-medium text-gray-700">
                                Ngành <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.majorId" :class="inputClass(errors.majorId)">
                                <option :value="null" disabled>-- Chọn ngành --</option>
                                <option v-for="m in majors" :key="m.majorId" :value="m.majorId">
                                    {{ m.name }}
                                </option>
                            </select>
                            <p v-if="errors.majorId" class="mt-1 text-xs text-red-500 break-words">{{ errors.majorId }}</p>
                        </div>

                        <!-- Team (shown when type is TEAM) -->
                        <div v-if="form.activityType === 'TEAM'">
                            <label class="block text-sm font-medium text-gray-700">
                                Đội/Nhóm <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.teamId" :class="inputClass(errors.teamId)">
                                <option :value="null" disabled>-- Chọn đội/nhóm --</option>
                                <option v-for="t in teams" :key="t.teamId" :value="t.teamId">
                                    {{ t.name }}
                                </option>
                            </select>
                            <p v-if="errors.teamId" class="mt-1 text-xs text-red-500 break-words">{{ errors.teamId }}</p>
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
                        <textarea v-model="form.description" :class="inputClass(errors.description)"
                            placeholder="Nhập mô tả hoạt động" rows="3"></textarea>
                        <p v-if="errors.description" class="mt-1 text-xs text-red-500 break-words">{{ errors.description }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Ghi chú</label>
                        <textarea v-model="form.note" :class="inputClass(errors.note)"
                            placeholder="Nhập ghi chú (nếu có)" rows="2"></textarea>
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
import { ref, onMounted, watch } from "vue";
import router from "@/routers";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth";
import { inputClass } from "@/utils/inputClass";
import type { ApiResponse } from "@/types/api.type";
import { ActivityCreateRequest, ActivityType, PlanRowInput, ValidationErrorActivity } from "@/types/activity.type";
import { createActivity } from "@/services/activityService";
import { getAllDeanery } from "@/services/deaneryService";
import { getParishesByDeaneryId } from "@/services/parishService";
import { getAllMajor } from "@/services/majorService";
import { getTeamsByDeaneryId } from "@/services/teamService";
import type { DeaneryDto } from "@/types/deanery.type";
import type { ParishDto } from "@/types/parish.type";
import type { MajorDto } from "@/types/major.type";
import type { TeamDto } from "@/types/team.type";

const activityTypeOptions = [
    { value: 'DEANERY' as ActivityType, label: 'Cấp Châu', icon: '🏛️' },
    { value: 'PARISH' as ActivityType, label: 'Cấp Xứ', icon: '⛪' },
    { value: 'MAJOR' as ActivityType, label: 'Cấp Ngành', icon: '🎯' },
    { value: 'TEAM' as ActivityType, label: 'Cấp Đội', icon: '👥' },
];

const form = ref<ActivityCreateRequest>({
    activityType: 'DEANERY',
    date: "",
    time: "",
    description: "",
    note: "",
    deaneryId: null as any,
    parishId: null,
    majorId: null,
    teamId: null,
});

const errors = ref<ValidationErrorActivity>({});
const deaneries = ref<DeaneryDto[]>([]);
const parishes = ref<ParishDto[]>([]);
const majors = ref<MajorDto[]>([]);
const teams = ref<TeamDto[]>([]);
const { showToast } = useToast();
const { canModifyActivity, canSelectDeanery, currentMember } = useAuth();

// Initialize 10 empty plan rows
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

async function initializeView() {
     if (canSelectDeanery.value) {
        if(deaneries.value.length > 0) return;
        try {
            const res: ApiResponse<DeaneryDto[]> = await getAllDeanery();
            if (res.code === 200) {
                deaneries.value = res.data;
            }
        } catch (err: any) {
            showToast("Không tải được danh sách châu", "error");
        }
    } else {
        if (currentMember.value?.deaneryId) {
            form.value.deaneryId = currentMember.value.deaneryId;
            // Fetch dependent data for the auto-selected deanery
            await fetchDependentData(Number(form.value.deaneryId));
        }
    }

    // Always load majors (they are global, not deanery-dependent)
    await fetchMajors();
}

onMounted(async () => {
    if (!canModifyActivity.value) {
        showToast("Bạn không có quyền tạo sinh hoạt. Vai trò Đoàn Sinh chỉ có quyền xem và bình luận.", "error");
        router.push("/activities");
        return;
    }
    initializeView();
});

watch(currentMember, (newVal) => {
    if(newVal) {
        initializeView();
    }
})

async function fetchDependentData(deaneryId: number) {
    await Promise.all([
        fetchParishesForDeanery(deaneryId),
        fetchTeamsForDeanery(deaneryId),
    ]);
}

async function fetchParishesForDeanery(deaneryId: number) {
    try {
        const res = await getParishesByDeaneryId(deaneryId);
        if (res.code === 200) {
            parishes.value = res.data;
        }
    } catch (e) {
        console.error("Không tải được danh sách giáo xứ", e);
    }
}

async function fetchMajors() {
    try {
        const res = await getAllMajor();
        if (res.code === 200) {
            majors.value = res.data;
        }
    } catch (e) {
        console.error("Không tải được danh sách ngành", e);
    }
}

async function fetchTeamsForDeanery(deaneryId: number) {
    try {
        const res = await getTeamsByDeaneryId(deaneryId);
        if (res.code === 200) {
            teams.value = res.data;
        }
    } catch (e) {
        console.error("Không tải được danh sách đội/nhóm", e);
    }
}

function onActivityTypeChange(type: ActivityType) {
    form.value.activityType = type;
    // Clear the sub-fields when changing type
    form.value.parishId = null;
    form.value.majorId = null;
    form.value.teamId = null;
}

async function onDeaneryChange() {
    form.value.parishId = null;
    form.value.teamId = null;
    parishes.value = [];
    teams.value = [];
    if (form.value.deaneryId) {
        await fetchDependentData(form.value.deaneryId);
    }
}

async function handleSubmit() {
    errors.value = {};
    try {
        // Filter out empty plan rows
        const filledRows = planRows.value.filter(
            r => r.startTime || r.content || r.pic || r.materials || r.notes
        );

        const payload: ActivityCreateRequest = {
            ...form.value,
            planRows: filledRows.length > 0 ? filledRows : undefined,
        };

        const res: ApiResponse<any> = await createActivity(payload);
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
