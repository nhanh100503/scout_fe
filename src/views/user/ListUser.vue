<template>
    <div class="flex flex-col h-screen">
        <div class="flex items-center justify-between px-4 md:px-6 pt-6 mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-emerald-700">
                Danh sách người dùng
            </h2>
            <router-link to="/users/add"
                class="px-3 md:px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm md:text-base">
                + Thêm người dùng
            </router-link>
        </div>
        <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-120 border border-gray-300">
                <h3 class="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                <p class="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa người dùng này không?</p>
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
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Giới tính
                                </th>
                                <th
                                    class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700 hidden lg:table-cell">
                                    Email
                                </th>
                                <th
                                    class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700 hidden lg:table-cell">
                                    Số điện thoại
                                </th>
                                <th class="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-700">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.memberId"
                                class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm break-words">
                                    {{ user.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    {{ user.gender?.name }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">
                                    {{ user.email }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">
                                    {{ user.phone }}
                                </td>
                                <td class="px-3 md:px-4 py-2 text-xs md:text-sm">
                                    <div class="flex flex-wrap gap-2">
                                        <router-link :to="`/users/detail/${user.memberId}`"
                                            class="px-2.5 md:px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-xs md:text-sm">
                                            Xem
                                        </router-link>
                                        <router-link :to="`/users/update/${user.memberId}`"
                                            class="px-2.5 md:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm">
                                            Sửa
                                        </router-link>
                                        <button @click="openConfirm(user.memberId)"
                                            class="px-2.5 md:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="users.length === 0" class="text-center text-gray-500 py-4">
                    Chưa có người dùng nào.
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "@/composables/useToast";
import { UserDto } from "@/types/user.type";
import { deleteUser, getAllUser } from "@/services/userService";
import { parseJwt } from "@/utils/jwt.util";
import { getLS } from "@/tools/localStorage.tool";

const users = ref<UserDto[]>([]);
const showConfirm = ref(false);
const deleteId = ref<number | null>(null);
const { toast, showToast } = useToast();

async function fetchUsers() {
    try {
        const res = await getAllUser();
        if (res.code === 200) {
            users.value = res.data;
            console.log(users.value);
        } else {
            toast.value = { message: res.message, type: "error" };
        }
    } catch (error: any) {
        console.error("Fetch users error:", error);
        
        // Debug JWT on error
        const token = getLS("accessToken");
        let debugInfo = "";
        if (token) {
            const payload = parseJwt(token);
            console.log("JWT Payload:", payload);
            const roles = payload.roles || payload.role || payload.authorities || "No roles found";
            debugInfo = ` | Token Roles: ${JSON.stringify(roles)}`;
        }

        toast.value = { 
            message: `${error.message || 'Lỗi tải danh sách'}${error.code === 403 ? '. Kiểm tra quyền truy cập (Backend Denied).' + debugInfo : ''}`, 
            type: "error" 
        };
    }
}

function openConfirm(memberId: number) {
    deleteId.value = memberId;
    showConfirm.value = true;
}

async function confirmDelete() {
    if (!deleteId.value) return;
    showConfirm.value = false;
    try {
        const res = await deleteUser(deleteId.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            await fetchUsers();
        }
        setTimeout(() => (toast.value = null), 3000);
    } catch (error: any) {
        showToast(error.message, "error");
    }
}

onMounted(() => {
    fetchUsers();
});
</script>

