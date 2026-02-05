<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Cập nhật người dùng</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Họ và tên <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.name" type="text" :class="inputClass(errors.name)" />
                            <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.name }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Giới tính <span
                                    class="text-red-500">*
                                </span></label>
                            <select v-model="form.genderId" :class="inputClass(errors.genderId)">
                                <option value="">-- Chọn giới tính --</option>
                                <option v-for="item in genders" :key="item.genderId" :value="item.genderId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.genderId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.genderId }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Số điện thoại <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.phone" type="text" :class="inputClass(errors.phone)" />
                            <p v-if="errors.phone" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.phone }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Địa chỉ <span class="text-red-500">*
                                </span></label>
                            <input v-model="form.address" type="text" :class="inputClass(errors.address)" />
                            <p v-if="errors.address" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.address }}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Vai trò <span
                                class="text-red-500">*
                            </span></label>
                        <select v-model="form.roles" multiple :class="inputClass(errors.roles)"
                            class="mt-1 w-full border rounded-md px-3 py-2">
                            <option v-for="role in roles" :key="role.roleId" :value="role.roleId">
                                {{ role.name }}
                            </option>
                        </select>
                        <p class="mt-1 text-xs text-gray-500">Giữ Ctrl (hoặc Cmd) để chọn nhiều vai trò</p>
                        <p v-if="errors.roles" class="mt-1 text-xs text-red-500 break-words">
                            {{ errors.roles }}
                        </p>
                    </div>

                    <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                        Cập nhật người dùng
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAllGenders } from "@/services/genderService";
import { getAllRoles } from "@/services/roleService";
import { GenderDto } from "@/types/gender.type";
import { RoleDto } from "@/types/role.type";
import type { UserDto } from "@/types/user.type";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import { UserUpdateRequest, ValidationErrorUser } from "@/types/user.type";
import { getUserById, updateUser } from "@/services/userService";
import { ApiResponse } from "@/types/api.type";

const errors = ref<ValidationErrorUser>({});
const route = useRoute();
const router = useRouter();
const memberId = Number(route.params.memberId);
const { toast, showToast } = useToast();
const genders = ref<GenderDto[]>([]);
const roles = ref<RoleDto[]>([]);

const form = ref<UserUpdateRequest>({
    name: "",
    genderId: null,
    phone: "",
    address: "",
    roles: []
});

onMounted(async () => {
    try {
        const resMember = await getUserById(memberId);
        if (resMember.code === 200) {
            const m: UserDto = resMember.data;
            form.value = {
                ...form.value,
                name: m.name,
                phone: m.phone,
                address: m.address,
                genderId: m.gender?.genderId || 0,
                roles: m.roles ? m.roles.map(r => r.roleId) : [],
            };
        }
        genders.value = (await getAllGenders()).data;
        roles.value = (await getAllRoles()).data;
        console.log(`roles`, roles.value);
    } catch (err: any) {
    showToast(err.message, "error");
}
});

async function handleSubmit() {
    try {
        const res = await updateUser(memberId, form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/users")
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorUser;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
