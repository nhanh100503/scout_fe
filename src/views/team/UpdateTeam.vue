<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6">
            <h2 class="text-xl font-semibold mb-6 text-emerald-700">Cập nhật đội/nhóm</h2>
            
            <template v-if="team">
            <form class="bg-white rounded-lg shadow p-6 space-y-6" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tên đội/nhóm <span class="text-red-500">*</span></label>
                        <input v-model="form.name" type="text" :class="inputClass(errors.name)" />
                        <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
                    </div>

                    <template v-if="hasAnyRole(['ADMIN'])">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Châu <span class="text-red-500">*</span></label>
                            <select v-model="deaneryId" :class="inputClass(errors.deaneryId)" @change="onDeaneryChange">
                                <option :value="null" disabled>-- Chọn châu --</option>
                                <option v-for="item in deaneries" :key="item.deaneryId" :value="item.deaneryId">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Đạo (Giáo xứ) <span class="text-red-500">*</span></label>
                            <select v-model="form.parishId" :class="inputClass(errors.parishId)">
                                <option :value="undefined" disabled>-- Chọn đạo --</option>
                                <option v-for="item in parishes" :key="item.parishId" :value="item.parishId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.parishId" class="mt-1 text-xs text-red-500">{{ errors.parishId }}</p>
                        </div>

                         <div>
                            <label class="block text-sm font-medium text-gray-700">Ngành <span class="text-red-500">*</span></label>
                            <select v-model="form.majorId" :class="inputClass(errors.majorId)">
                                <option :value="undefined" disabled>-- Chọn ngành --</option>
                                <option v-for="item in majors" :key="item.majorId" :value="item.majorId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.majorId" class="mt-1 text-xs text-red-500">{{ errors.majorId }}</p>
                        </div>
                    </template>
                    <div v-else>
                        <div>
                             <label class="block text-sm font-medium text-gray-700">Giáo xứ</label>
                             <div class="mt-2 text-sm text-gray-600 font-medium">{{ team.parish?.name }}</div>
                        </div>
                        <div class="mt-4">
                             <label class="block text-sm font-medium text-gray-700">Ngành</label>
                             <div class="mt-2 text-sm text-gray-600 font-medium">{{ team.major?.name || 'Chưa phân ngành' }}</div>
                        </div>
                        <p class="mt-1 text-xs text-gray-400 italic">(Chỉ quản trị viên mới có thể thay đổi thông tin này)</p>
                    </div>
                </div>

                <div class="flex justify-end gap-4 pt-4 border-t">
                    <button type="button" @click="$router.push('/teams')" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        Quay lại
                    </button>
                    <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 shadow-sm" :disabled="loading">
                        {{ loading ? 'Đang lưu...' : 'Cập nhật' }}
                    </button>
                </div>
            </form>
            
            <!-- (keep team leaders section) -->
             <div v-if="hasAnyRole(['ADMIN', 'DT', 'HT'])" class="mt-6 bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4 text-emerald-700">Quản lý Huynh trưởng</h3>
                <!-- ... content ... -->
                <!-- Current Leaders List -->
                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-2">Danh sách Huynh trưởng hiện tại:</h4>
                    <div v-if="team.teamLeaders && team.teamLeaders.length > 0" class="space-y-2">
                        <div v-for="tl in team.teamLeaders" :key="tl.id"
                            class="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                            <div v-if="tl.leader" class="flex items-center gap-3">
                                <img v-if="tl.leader.avatar" :src="tl.leader.avatar"
                                    class="w-10 h-10 rounded-full object-cover" alt="Avatar" />
                                <div v-else class="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-semibold">
                                    {{ tl.leader.name.charAt(0).toUpperCase() }}
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">{{ tl.leader.name }}</p>
                                    <p class="text-xs text-gray-500">{{ tl.leader.email }}</p>
                                </div>
                            </div>
                            <div v-else class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-semibold">
                                    ?
                                </div>
                                <div>
                                    <p class="font-medium text-red-600">Lỗi: Không tìm thấy thông tin huynh trưởng</p>
                                    <p class="text-xs text-gray-500">Leader ID: {{ tl.leaderId }}</p>
                                </div>
                            </div>
                            <button @click="handleRemoveLeader(tl.leaderId)"
                                class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                                Xóa
                            </button>
                        </div>
                    </div>
                    <p v-else class="text-sm text-gray-500 italic">Chưa có huynh trưởng nào được gán.</p>
                </div>

                <!-- Add New Leader -->
                <div class="border-t pt-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-2">Thêm Huynh trưởng mới:</h4>
                    <div class="flex gap-2">
                        <select v-model="selectedLeaderId" class="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option :value="null" disabled>-- Chọn Huynh trưởng --</option>
                            <option v-for="member in availableLeaders" :key="member.memberId" :value="member.memberId">
                                {{ member.name }} - {{ member.email }}
                            </option>
                        </select>
                        <button @click="handleAssignLeader" :disabled="!selectedLeaderId || assigningLeader"
                            class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ assigningLeader ? 'Đang thêm...' : 'Thêm' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Team Members Section -->
            <div v-if="hasAnyRole(['ADMIN', 'DT', 'HT'])" class="mt-6 bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4 text-emerald-700">Danh sách Đoàn sinh</h3>
                <div v-if="team.members && team.members.length > 0" class="space-y-2">
                    <div v-for="member in team.members" :key="member.memberId"
                        class="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                        <div class="flex items-center gap-3">
                            <img v-if="member.avatar" :src="member.avatar"
                                class="w-10 h-10 rounded-full object-cover" alt="Avatar" />
                            <div v-else class="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold">
                                {{ member.name.charAt(0).toUpperCase() }}
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">{{ member.name }}</p>
                                <p class="text-xs text-gray-500">{{ member.email }}</p>
                            </div>
                        </div>
                        <button @click="handleRemoveMemberFromTeam(member.memberId)"
                            class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                            Xóa khỏi đội
                        </button>
                    </div>
                </div>
                <p v-else class="text-sm text-gray-500 italic">Chưa có đoàn sinh nào trong đội/nhóm này.</p>
            </div>
            </template>

            <div v-else-if="!loading" class="bg-red-50 p-4 rounded text-red-700 border border-red-200">
                Không tìm thấy thông tin đội/nhóm hoặc bạn không có quyền truy cập.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth";
import { inputClass } from "@/utils/inputClass";
import { getTeamById, updateTeam } from "@/services/teamService";
import { assignLeaderToTeam, removeLeaderFromTeam } from "@/services/teamLeaderService";
import { getAllDeanery } from "@/services/deaneryService";
import { getParishesByDeaneryId } from "@/services/parishService";
import { getAllMajor } from "@/services/majorService";
import { getAllLeaders, updateMemberTeam } from "@/services/memberService";
import { TeamUpdateRequest } from "@/types/team.type";
import { DeaneryDto } from "@/types/deanery.type";
import { ParishDto } from "@/types/parish.type";
import { MajorDto } from "@/types/major.type";

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();
const { hasAnyRole } = useAuth();
const teamId = Number(route.params.teamId);

const loading = ref(false);
const errors = ref<any>({});
const team = ref<any>(null);

const deaneryId = ref<number | null>(null);
const deaneries = ref<DeaneryDto[]>([]);
const parishes = ref<ParishDto[]>([]);
const majors = ref<MajorDto[]>([]);

const form = ref<TeamUpdateRequest>({
    name: "",
    parishId: undefined,
    majorId: undefined
});

// Team Leader Management
const selectedLeaderId = ref<number | null>(null);
const assigningLeader = ref(false);
const allMembers = ref<any[]>([]);

const availableLeaders = computed(() => {
    if (!team.value || !allMembers.value) return [];
    const currentLeaderIds = team.value.teamLeaders?.map((tl: any) => tl.leaderId) || [];
    return allMembers.value.filter((m: any) =>
        !currentLeaderIds.includes(m.memberId)
    );
});

onMounted(async () => {
    loading.value = true;
    try {
        const res = await getTeamById(teamId);
        if (res.code === 200) {
            team.value = res.data;
            form.value.name = res.data.name;
            form.value.parishId = res.data.parishId;
            form.value.majorId = res.data.majorId;

            if (hasAnyRole(['ADMIN'])) {
                const resDeaneries = await getAllDeanery();
                deaneries.value = resDeaneries.data;
                
                const resMajors = await getAllMajor();
                majors.value = resMajors.data;
                
                // Set initial deanery and load parishes
                if (res.data.parish?.deaneryId) {
                    deaneryId.value = res.data.parish.deaneryId;
                    const resParishes = await getParishesByDeaneryId(deaneryId.value);
                    parishes.value = resParishes.data;
                }
            }
        }

        // Load all leaders for team leader selection
        if (hasAnyRole(['ADMIN', 'DT', 'HT'])) {
            const resMembers = await getAllLeaders();
            if (resMembers.code === 200) {
                allMembers.value = resMembers.data;
            }
        }
    } catch (e: any) {
        showToast(e.message || "Không thể tải thông tin đội/nhóm", "error");
    } finally {
        loading.value = false;
    }
});

const onDeaneryChange = async () => {
    form.value.parishId = undefined;
    parishes.value = [];
    if (deaneryId.value) {
        try {
            const res = await getParishesByDeaneryId(deaneryId.value);
            parishes.value = res.data;
        } catch (e) {
            showToast("Không thể tải danh sách đạo", "error");
        }
    }
};

async function handleSubmit() {
    errors.value = {};
    if (!form.value.name) errors.value.name = "Tên đội/nhóm không được để trống";

    if (Object.keys(errors.value).length > 0) return;

    loading.value = true;
    try {
        const res = await updateTeam(teamId, form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/teams");
        }
    } catch (error: any) {
        if (error.code === 400 && error.data) {
            errors.value = error.data;
        }
        showToast(error.message || "Cập nhật thất bại", "error");
    } finally {
        loading.value = false;
    }
}

async function handleAssignLeader() {
    if (!selectedLeaderId.value) return;
    assigningLeader.value = true;
    try {
        const res = await assignLeaderToTeam({
            teamId: teamId,
            leaderId: selectedLeaderId.value
        });
        if (res.code === 201 || res.code === 200) {
            // Also update the member's teamId
            await updateMemberTeam(selectedLeaderId.value, teamId);

            showToast("Gán huynh trưởng thành công", "success");
            selectedLeaderId.value = null;
            // Reload team data
            const reloadRes = await getTeamById(teamId);
            if (reloadRes.code === 200) {
                team.value = reloadRes.data;
            }
        }
    } catch (error: any) {
        showToast(error.message || "Gán huynh trưởng thất bại", "error");
    } finally {
        assigningLeader.value = false;
    }
}

async function handleRemoveLeader(leaderId: number) {
    if (!confirm("Bạn có chắc muốn xóa huynh trưởng này khỏi đội/nhóm?")) return;
    try {
        const res = await removeLeaderFromTeam(teamId, leaderId);
        if (res.code === 200) {
            // Also remove the member's teamId (set to null) - OPTIONAL but likely desired
            // If we remove them as leader, we often remove them from the team too
            await updateMemberTeam(leaderId, null);

            showToast("Xóa huynh trưởng thành công", "success");
            // Reload team data
            const reloadRes = await getTeamById(teamId);
            if (reloadRes.code === 200) {
                team.value = reloadRes.data;
            }
        }
    } catch (error: any) {
        showToast(error.message || "Xóa huynh trưởng thất bại", "error");
    }
}

async function handleRemoveMemberFromTeam(memberId: number) {
    if (!confirm("Bạn có chắc muốn xóa đoàn sinh này khỏi đội/nhóm?")) return;
    try {
        // Set the member's teamId to null to remove them from the team
        await updateMemberTeam(memberId, null);
        showToast("Xóa đoàn sinh khỏi đội thành công", "success");

        // Reload team data
        const reloadRes = await getTeamById(teamId);
        if (reloadRes.code === 200) {
            team.value = reloadRes.data;
        }
    } catch (error: any) {
        showToast(error.message || "Xóa đoàn sinh thất bại", "error");
    }
}
</script>
