<template>
    <div class="flex flex-col h-screen">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách huynh trưởng
            </h2>
            <router-link to="/members/add/ht"
                class="px-3 md:px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm md:text-base">
                + Thêm huynh trưởng
            </router-link>
        </div>
        <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-120 border border-gray-300">
                <h3 class="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa huynh trưởng này không?</p>
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
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    STT
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Họ và tên
                                </th>
                                <th
                                    class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700 hidden sm:table-cell">
                                    Ngày sinh
                                </th>
                                <th
                                    class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700 hidden sm:table-cell">
                                    Tuổi
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Giới tính
                                </th>
                                <th
                                    class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700 hidden lg:table-cell">
                                    Tôn giáo
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Hành động
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Đẳng thứ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(member, index) in members" :key="member.memberId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm break-words">
                                    {{ member.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap hidden sm:table-cell">
                                    {{ formatDate(member.birthday) }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm hidden sm:table-cell">
                                    {{ calculateAge(member.birthday) }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ member.gender?.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">
                                    {{ member.religion.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <button @click="openAssignRank(member.memberId)"
                                            class="px-2.5 md:px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-xs md:text-sm">
                                            Cập nhật đẳng thứ
                                        </button>
                                        <button @click="openRankHistory(member)"
                                            class="px-2.5 md:px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 text-xs md:text-sm">
                                            Lịch sử cập nhật đẳng thứ
                                        </button>
                                        <router-link :to="`/members/detail/ht/${member.memberId}`"
                                            class="px-2.5 md:px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs md:text-sm">
                                            Xem
                                        </router-link>
                                        <router-link :to="`/members/update/ht/${member.memberId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button @click="openConfirm(member.memberId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <button @click="openAssignRank(member.memberId)"
                                            class="px-2.5 md:px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-xs md:text-sm">
                                            Cập nhật
                                        </button>
                                        <button @click="openRankHistory(member)"
                                            class="px-2.5 md:px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 text-xs md:text-sm">
                                            Lịch sử
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="members.length === 0" class="text-center text-gray-500 py-4">
                    Chưa có huynh trưởng nào.
                </div>
            </div>
        </div>
        <AssignRankModal :show="showAssignRank" :member-id="selectedMemberId" :is-leader="true"
            @close="showAssignRank = false" @success="fetchMembers" />
        <RankHistoryModal :show="showRankHistory" :member-id="selectedMemberId" :member-name="selectedMemberName"
            @close="showRankHistory = false" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { MemberDto } from "@/types/member.type";
import { deleteMemberById, getAllMemberRoleHT } from "@/services/memberService";
import { formatDate } from "@/utils/dateFormat";
import { useToast } from "@/composables/useToast";
import AssignRankModal from "@/components/member/AssignRankModal.vue";
import RankHistoryModal from "@/components/member/RankHistoryModal.vue";

const members = ref<MemberDto[]>([]);
const showConfirm = ref(false);
const showAssignRank = ref(false);
const showRankHistory = ref(false);
const selectedMemberId = ref<number>(0);
const selectedMemberName = ref<string>("");
const deleteId = ref<number | null>(null);
const { toast, showToast } = useToast();

async function fetchMembers() {
    try {
        const res = await getAllMemberRoleHT();
        if (res.code === 200) {
            members.value = res.data;
        } else {
            toast.value = { message: res.message, type: "error" };
        }
    } catch (error: any) {
        toast.value = { message: error.message, type: "error" };
    }
}

function calculateAge(birthday: string): number {
    if (!birthday) return 0;
    const birthYear = new Date(birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

function openConfirm(memberId: number) {
    deleteId.value = memberId;
    showConfirm.value = true;
}

async function confirmDelete() {
    if (!deleteId.value) return;
    showConfirm.value = false;
    try {
        const res = await deleteMemberById(deleteId.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            members.value = members.value.filter(m => m.memberId !== deleteId.value);
        }
        setTimeout(() => (toast.value = null), 3000);
    } catch (error: any) {
        showToast(error.message, "error");
    }
}

function openAssignRank(memberId: number) {
    selectedMemberId.value = memberId;
    showAssignRank.value = true;
}

function openRankHistory(member: MemberDto) {
    selectedMemberId.value = member.memberId;
    selectedMemberName.value = member.name;
    showRankHistory.value = true;
}

onMounted(() => {
    fetchMembers();
});
</script>
