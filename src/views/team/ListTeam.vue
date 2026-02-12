<template>
    <div class="flex flex-col h-screen">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách đội/nhóm
            </h2>
            <router-link v-if="canCreateDeleteTeam" to="/teams/add"
                class="px-3 md:px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm md:text-base">
                + Thêm đội/nhóm
            </router-link>
        </div>
        <div class="px-4 md:px-6 mb-4">
            <input v-model="searchQuery" type="text" placeholder="🔍 Tìm kiếm theo tên đội/nhóm, giáo xứ..."
                class="w-full md:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
        </div>

        <!-- Confirm Delete Modal -->
        <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
            <div class="bg-white rounded-lg shadow-lg p-6 w-120 border border-gray-300">
                <h3 class="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa đội/nhóm này không?</p>
                <div class="flex justify-center gap-6">
                    <button @click="showConfirm = false"
                        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Hủy</button>
                    <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Chắc
                        chắn</button>
                </div>
            </div>
        </div>

        <!-- Member Management Modal -->
        <div v-if="showMemberModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-gray-300">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-emerald-700">Quản lý thành viên - {{ selectedTeam?.name }}</h3>
                    <button @click="closeMemberModal" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div v-if="loadingMembers" class="text-center py-8 text-gray-500">
                    Đang tải danh sách thành viên...
                </div>

                <div v-else>
                    <!-- Current Members -->
                    <div class="mb-6">
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">Thành viên hiện tại ({{ selectedTeam?.members?.length || 0 }})</h4>
                        <div v-if="selectedTeam?.members && selectedTeam.members.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
                            <div v-for="member in selectedTeam.members" :key="member.memberId"
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
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <p v-else class="text-sm text-gray-500 italic">Chưa có thành viên nào.</p>
                    </div>

                    <!-- Add Member to Team -->
                    <div class="border-t pt-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">Thêm thành viên vào đội</h4>
                        <div class="mb-3">
                            <input v-model="memberSearchQuery" type="text"
                                placeholder="🔍 Tìm kiếm thành viên theo tên hoặc email..."
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                        </div>
                        <div class="space-y-2 max-h-60 overflow-y-auto">
                            <div v-for="member in filteredAvailableMembers" :key="member.memberId"
                                class="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100">
                                <div class="flex items-center gap-3">
                                    <img v-if="member.avatar" :src="member.avatar"
                                        class="w-10 h-10 rounded-full object-cover" alt="Avatar" />
                                    <div v-else class="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold">
                                        {{ member.name.charAt(0).toUpperCase() }}
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">{{ member.name }}</p>
                                        <p class="text-xs text-gray-500">{{ member.email }}</p>
                                        <p v-if="member.team" class="text-xs text-amber-600">Đang ở đội: {{ member.team.name }}</p>
                                    </div>
                                </div>
                                <button @click="handleAddMemberToTeam(member.memberId)"
                                    :disabled="addingMember"
                                    class="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50">
                                    {{ member.team ? 'Chuyển đội' : 'Thêm vào' }}
                                </button>
                            </div>
                            <p v-if="filteredAvailableMembers.length === 0" class="text-sm text-gray-500 italic text-center py-4">
                                Không tìm thấy thành viên phù hợp.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex justify-end">
                    <button @click="closeMemberModal"
                        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Đóng</button>
                </div>
            </div>
        </div>

        <div class="flex-1 overflow-auto px-4 md:px-6 pb-6">
            <div class="bg-white rounded-lg shadow">
                <div class="overflow-x-auto">
                    <table class="min-w-full border-collapse">
                        <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr class="border-b border-gray-200">
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700 w-16">
                                    STT
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Tên đội/nhóm
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Giáo xứ
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Số thành viên
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Huynh trưởng
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700 w-48">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(team, index) in filteredTeams" :key="team.teamId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm font-medium">
                                    {{ team.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ team.parish?.name || 'N/A' }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ team._count?.members || 0 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ team.teamLeaders?.length || 0 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <router-link v-if="canUpdateTeam" :to="`/teams/update/${team.teamId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button v-if="canUpdateTeam" @click="openMemberModal(team.teamId)"
                                            class="px-2.5 md:px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs md:text-sm">
                                            Thành viên
                                        </button>
                                        <button v-if="canCreateDeleteTeam" @click="openConfirm(team.teamId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                        <span v-if="!canUpdateTeam && !canCreateDeleteTeam" class="text-gray-400 italic">Chỉ xem</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="filteredTeams.length === 0 && !loading" class="text-center text-gray-500 py-8">
                    {{ searchQuery ? 'Không tìm thấy kết quả phù hợp.' : 'Không tìm thấy đội/nhóm nào.' }}
                </div>
                <div v-if="loading" class="text-center text-emerald-600 py-8">
                    Đang tải dữ liệu...
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth";
import { getAllTeams, deleteTeam, getTeamById } from "@/services/teamService";
import { getAllMembers, updateMemberTeam } from "@/services/memberService";
import type { MemberDto } from "@/types/member.type";

const teams = ref<any[]>([]);
const loading = ref(false);
const showConfirm = ref(false);
const deleteId = ref<number | null>(null);
const searchQuery = ref("");
const { showToast } = useToast();
const { hasAnyRole } = useAuth();

// Member modal state
const showMemberModal = ref(false);
const selectedTeam = ref<any | null>(null);
const loadingMembers = ref(false);
const allMembers = ref<MemberDto[]>([]);
const memberSearchQuery = ref("");
const addingMember = ref(false);

const filteredTeams = computed(() => {
    if (!searchQuery.value.trim()) return teams.value;
    const q = searchQuery.value.toLowerCase().trim();
    return teams.value.filter(t =>
        t.name?.toLowerCase().includes(q) ||
        t.parish?.name?.toLowerCase().includes(q)
    );
});

const filteredAvailableMembers = computed(() => {
    if (!selectedTeam.value) return [];

    // Get current team member IDs
    const currentMemberIds = selectedTeam.value.members?.map((m: any) => m.memberId) || [];

    // Filter out current members and apply search
    let available = allMembers.value.filter(m => !currentMemberIds.includes(m.memberId));

    if (memberSearchQuery.value.trim()) {
        const q = memberSearchQuery.value.toLowerCase().trim();
        available = available.filter(m =>
            m.name?.toLowerCase().includes(q) ||
            m.email?.toLowerCase().includes(q)
        );
    }

    return available;
});

const canCreateDeleteTeam = computed(() => hasAnyRole(['ADMIN', 'DT', 'HT']));
const canUpdateTeam = computed(() => hasAnyRole(['ADMIN', 'DT', 'HT']));

async function fetchTeams() {
    loading.value = true;
    try {
        const res = await getAllTeams();
        if (res.code === 200) {
            teams.value = res.data;
        }
    } catch (error: any) {
        showToast(error.message || "Lỗi tải danh sách đội/nhóm", "error");
    } finally {
        loading.value = false;
    }
}

function openConfirm(teamId: number) {
    deleteId.value = teamId;
    showConfirm.value = true;
}

async function confirmDelete() {
    if (!deleteId.value) return;
    showConfirm.value = false;
    try {
        const res = await deleteTeam(deleteId.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            await fetchTeams();
        }
    } catch (error: any) {
        showToast(error.message || "Xóa thất bại", "error");
    }
}

async function openMemberModal(teamId: number) {
    loadingMembers.value = true;
    showMemberModal.value = true;
    memberSearchQuery.value = "";

    try {
        // Load team details with members
        const teamRes = await getTeamById(teamId);
        if (teamRes.code === 200) {
            selectedTeam.value = teamRes.data;
        }

        // Load all members for adding to team
        const membersRes = await getAllMembers();
        if (membersRes.code === 200) {
            allMembers.value = membersRes.data;
        }
    } catch (error: any) {
        showToast(error.message || "Không thể tải danh sách thành viên", "error");
    } finally {
        loadingMembers.value = false;
    }
}

function closeMemberModal() {
    showMemberModal.value = false;
    selectedTeam.value = null;
    allMembers.value = [];
    memberSearchQuery.value = "";
    fetchTeams(); // Refresh the teams list
}

async function handleRemoveMemberFromTeam(memberId: number) {
    if (!confirm("Bạn có chắc muốn xóa thành viên này khỏi đội/nhóm?")) return;

    try {
        await updateMemberTeam(memberId, null);
        showToast("Xóa thành viên khỏi đội thành công", "success");

        // Reload team data
        if (selectedTeam.value) {
            const reloadRes = await getTeamById(selectedTeam.value.teamId);
            if (reloadRes.code === 200) {
                selectedTeam.value = reloadRes.data;
            }
        }
    } catch (error: any) {
        showToast(error.message || "Xóa thành viên thất bại", "error");
    }
}

async function handleAddMemberToTeam(memberId: number) {
    if (!selectedTeam.value) return;

    addingMember.value = true;
    try {
        await updateMemberTeam(memberId, selectedTeam.value.teamId);
        showToast("Thêm thành viên vào đội thành công", "success");

        // Reload team data
        const reloadRes = await getTeamById(selectedTeam.value.teamId);
        if (reloadRes.code === 200) {
            selectedTeam.value = reloadRes.data;
        }

        // Reload all members to update their team status
        const membersRes = await getAllMembers();
        if (membersRes.code === 200) {
            allMembers.value = membersRes.data;
        }
    } catch (error: any) {
        showToast(error.message || "Thêm thành viên thất bại", "error");
    } finally {
        addingMember.value = false;
    }
}

onMounted(() => {
    fetchTeams();
});
</script>
