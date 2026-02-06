<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Thông tin người dùng</h2>
            <div v-if="user" class="space-y-4 flex-1 flex flex-col">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input type="text" :value="user.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Giới tính</label>
                            <input type="text" :value="user.gender?.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input :value="user.email" type="text" readonly
                            class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input :value="user.phone" type="text" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input :value="user.address" type="text" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Vai trò</label>
                        <div class="mt-1 flex flex-wrap gap-2">
                            <span v-for="role in user.roles" :key="role.roleId"
                                class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                                {{ role.name }}
                            </span>
                            <span v-if="!user.roles || user.roles.length === 0"
                                class="text-gray-500 italic">Chưa có vai trò</span>
                        </div>
                    </div>

                    <router-link :to="`/users/update/${user.memberId}`"
                        class="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 inline-block">
                        Cập nhật người dùng
                    </router-link>
                </div>
            </div>
            <div v-else class="text-center text-gray-500">Đang tải thông tin...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getUserById } from "@/services/userService";
import { UserDto } from "@/types/user.type";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const memberId = Number(route.params.memberId);

const user = ref<UserDto | null>(null);
const toast = ref<{ type: string; message: string } | null>(null);

onMounted(async () => {
    try {
        const resUser = await getUserById(memberId);
        if (resUser.code === 200) {
            user.value = resUser.data;
            console.log(`User data:`, user.value);
        }
    } catch (err: any) {
        toast.value = { type: "error", message: err.message };
    }
});

</script>
