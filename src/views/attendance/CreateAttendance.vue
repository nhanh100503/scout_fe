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
                <div class="overflow-x-auto bg-white rounded-lg shadow">
                    <table class="min-w-full border-collapse">
                        <thead class="bg-gray-100">
                            <tr class="border-b border-gray-200">
                                <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">STT</th>
                                <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Tên thành viên</th>
                                <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Ngày sinh</th>
                                <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Vai trò</th>
                                <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Tham gia</th>
                                <th class="px-3 py-2 text-left text-sm font-medium text-gray-700">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(member, index) in members" :key="member.memberId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 py-2 text-sm">{{ index + 1 }}</td>
                                <td class="px-3 py-2 text-sm">{{ member.name }}</td>
                                <td class="px-3 py-2 text-sm">{{ formatDate(member.birthday) }}</td>
                                <td class="px-3 py-2 text-sm">{{ member.role.name }}</td>
                                <td class="px-3 py-2 text-sm">
                                    <input type="checkbox" v-model="attendanceForm[index].present" />
                                </td>
                                <td class="px-3 py-2 text-sm">
                                    <input type="text" v-model="attendanceForm[index].note"
                                        class="w-full border rounded px-2 py-1 text-sm" placeholder="Ghi chú..." />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex justify-end gap-3 mt-6">
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import type { ApiResponse } from "@/types/api.type";
import type { ActivityDto } from "@/types/activity.type";
import type { MemberDto } from "@/types/member.type";
import { getActivityById } from "@/services/activityService";
import { getAllMembersByDeaneryId } from "@/services/memberService";
import { createAttendance } from "@/services/attendanceService";
import type { AttendanceCreateRequest, AttendanceDto, MemberAttendanceRequest } from "@/types/attendance.type";
import { formatDate } from "@/utils/dateFormat";

const { showToast } = useToast();
const route = useRoute();
const router = useRouter();

const activity = ref<ActivityDto | null>(null);
const members = ref<MemberDto[]>([]);
const attendanceForm = ref<MemberAttendanceRequest[]>([]);

const activityId = Number(route.params.activityId);

import { getAttendanceByActivity } from "@/services/attendanceService";

onMounted(async () => {
    try {
        const resAct: ApiResponse<ActivityDto> = await getActivityById(activityId);
        console.log("Activity Response:", resAct);
        if (resAct.code === 200 && resAct.data) {
            activity.value = resAct.data;
            const deaneryId = resAct.data.deanery.deaneryId || resAct.data.createdBy?.deanery?.deaneryId;

            if (deaneryId) {
                const resMem: ApiResponse<MemberDto[]> = await getAllMembersByDeaneryId(deaneryId);
                console.log("Members Response:", resMem);
                if (resMem.code === 200) {
                    members.value = resMem.data; 
                    attendanceForm.value = members.value.map(m => ({
                        memberId: m.memberId,
                        present: false,
                        note: ""
                    }));
                    const resAtt: ApiResponse<AttendanceDto[]> = await getAttendanceByActivity(activityId);
                    if (resAtt.code === 200 && resAtt.data) {
                        resAtt.data.forEach(att => {
                            const idx = attendanceForm.value.findIndex(f => f.memberId === att.member.memberId);
                            if (idx !== -1) {
                                attendanceForm.value[idx].present = att.present;
                                attendanceForm.value[idx].note = att.note || "";
                            }
                        });
                    }
                }
            } else {
                console.warn("Không tìm thấy deaneryId trong dữ liệu hoạt động");
            }
        }
    } catch (error: any) {
        console.error("Lỗi khi load dữ liệu:", error);
        showToast(error.message, "error");
    }
});


async function handleSubmit() {
    try {
        const payload: AttendanceCreateRequest = {
            activityId,
            members: attendanceForm.value
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
