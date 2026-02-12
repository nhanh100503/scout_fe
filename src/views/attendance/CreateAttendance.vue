<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Điểm danh sinh hoạt</h2>
            <div v-if="activity" class="bg-white rounded-lg shadow p-4 mb-6">
                <div class="grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-6 text-sm">
                    <div class="flex items-center">
                        <span class="font-medium text-gray-600 w-24">Ngày:</span>
                        <span>{{ formatDate(activity.date) }} lúc {{ activity.time }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="font-medium text-gray-600 w-24">Nội dung:</span>
                        <span>{{ activity.description }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="font-medium text-gray-600 w-24">Ghi chú:</span>
                        <span>{{ activity.note || "Không có" }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="font-medium text-gray-600 w-24">Châu:</span>
                        <span>{{ activity.deanery.name || "Không có" }}</span>
                    </div>
                </div>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Team-grouped attendance -->
                <div v-for="teamGroup in teamGroups" :key="teamGroup.teamId" class="mb-6">
                    <div class="bg-emerald-50 px-4 py-2 rounded-t-lg border border-emerald-200">
                        <h3 class="text-sm font-semibold text-emerald-800">
                            🏷️ {{ teamGroup.teamName }}
                            <span v-if="teamGroup.parishName" class="text-xs text-emerald-600 ml-2">({{ teamGroup.parishName }})</span>
                            <span class="text-xs text-gray-500 ml-2">— {{ teamGroup.members.length }} thành viên</span>
                        </h3>
                    </div>
                    <div class="overflow-x-auto bg-white rounded-b-lg shadow border border-t-0 border-gray-200">
                        <table class="min-w-full border-collapse">
                            <thead class="bg-gray-100">
                                <tr class="border-b border-gray-200">
                                    <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">STT</th>
                                    <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Tên thành viên</th>
                                    <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Ngày sinh</th>
                                    <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Tham gia</th>
                                    <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, index) in teamGroup.members" :key="member.memberId"
                                    class="border-t border-gray-200 hover:bg-gray-50">
                                    <td class="px-3 py-2 text-sm">{{ index + 1 }}</td>
                                    <td class="px-3 py-2 text-sm">{{ member.name }}</td>
                                    <td class="px-3 py-2 text-sm">{{ formatDate(member.birthday) }}</td>
                                    <td class="px-3 py-2 text-sm">
                                        <input type="checkbox" v-model="attendanceMap[member.memberId].present" />
                                    </td>
                                    <td class="px-3 py-2 text-sm">
                                        <input type="text" v-model="attendanceMap[member.memberId].note"
                                            class="w-full border rounded px-2 py-1 text-sm" placeholder="Ghi chú..." />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="teamGroups.length === 0 && !loading" class="text-center text-gray-500 py-8">
                    Không tìm thấy đội/nhóm nào để điểm danh.
                </div>

                <div v-if="teamGroups.length > 0" class="flex justify-end gap-3 mt-6">
                    <router-link to="/activities" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <button type="submit"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Lưu điểm danh
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth";
import type { ApiResponse } from "@/types/api.type";
import type { ActivityDto } from "@/types/activity.type";
import { getActivityById } from "@/services/activityService";
import { createAttendance, getAttendanceByActivity, getMembersForMyTeamAttendance, getAllTeamsForActivity } from "@/services/attendanceService";
import type { AttendanceCreateRequest, AttendanceDto, MemberAttendanceRequest } from "@/types/attendance.type";
import { formatDate } from "@/utils/dateFormat";

const { showToast } = useToast();
const { hasAnyRole } = useAuth();
const route = useRoute();
const router = useRouter();

const activity = ref<ActivityDto | null>(null);
const loading = ref(false);
const activityId = Number(route.params.activityId);

interface TeamGroup {
    teamId: number;
    teamName: string;
    parishName?: string;
    members: any[];
}

const teamGroups = ref<TeamGroup[]>([]);
const attendanceMap = reactive<Record<number, MemberAttendanceRequest>>({});

onMounted(async () => {
    loading.value = true;
    try {
        // 1. Load activity info
        const resAct: ApiResponse<ActivityDto> = await getActivityById(activityId);
        if (resAct.code === 200 && resAct.data) {
            activity.value = resAct.data;
        }

        // 2. Load members grouped by team based on role
        let groups: TeamGroup[] = [];
        if (hasAnyRole(['ADMIN'])) {
            // Admin sees all teams
            const resTeams = await getAllTeamsForActivity(activityId);
            if (resTeams.code === 200) {
                groups = resTeams.data;
            }
        } else {
            // HT/DT only sees their own teams
            const resTeams = await getMembersForMyTeamAttendance(activityId);
            if (resTeams.code === 200) {
                groups = resTeams.data;
            }
        }

        teamGroups.value = groups;

        // 3. Build attendance map for all members
        groups.forEach(group => {
            group.members.forEach(m => {
                attendanceMap[m.memberId] = {
                    memberId: m.memberId,
                    present: false,
                    note: ""
                };
            });
        });

        // 4. Load existing attendance and merge
        const resAtt: ApiResponse<AttendanceDto[]> = await getAttendanceByActivity(activityId);
        if (resAtt.code === 200 && resAtt.data) {
            resAtt.data.forEach(att => {
                if (attendanceMap[att.member.memberId]) {
                    attendanceMap[att.member.memberId].present = att.present;
                    attendanceMap[att.member.memberId].note = att.note || "";
                }
            });
        }
    } catch (error: any) {
        console.error("Lỗi khi load dữ liệu:", error);
        showToast(error.message || "Không thể tải dữ liệu điểm danh", "error");
    } finally {
        loading.value = false;
    }
});

async function handleSubmit() {
    try {
        const members: MemberAttendanceRequest[] = Object.values(attendanceMap);
        const payload: AttendanceCreateRequest = {
            activityId,
            members
        };
        const res = await createAttendance(payload);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/activities");
        }
    } catch (error: any) {
        showToast(error.message, "error");
    }
}
</script>
