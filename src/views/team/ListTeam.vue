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
                            <tr v-for="(team, index) in teams" :key="team.teamId"
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
                <div v-if="teams.length === 0 && !loading" class="text-center text-gray-500 py-8">
                    Không tìm thấy đội/nhóm nào.
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
import { TeamDto } from "@/types/team.type";
import { getAllTeams, deleteTeam } from "@/services/teamService";

const teams = ref<any[]>([]);
const loading = ref(false);
const showConfirm = ref(false);
const deleteId = ref<number | null>(null);
const { showToast } = useToast();
const { hasAnyRole } = useAuth();

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

onMounted(() => {
    fetchTeams();
});
</script>
