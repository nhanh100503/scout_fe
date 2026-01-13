<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Tạo người dùng mới</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Họ và tên <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.name" type="text" :class="inputClass(errors.name)" />
                            <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">{{ errors.name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Giới tính <span
                                    class="text-red-500">*</span></label>
                            <select v-model="form.genderId" :class="inputClass(errors.genderId)">
                                <option value="" disabled>-- Chọn giới tính --</option>
                                <option v-for="item in genders" :key="item.genderId" :value="item.genderId">{{ item.name
                                }}</option>
                            </select>
                            <p v-if="errors.genderId" class="mt-1 text-xs text-red-500 break-words">{{ errors.genderId
                            }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.email" type="text" :class="inputClass(errors.email)" />
                            <p v-if="errors.email" class="mt-1 text-xs text-red-500 break-words">{{ errors.email }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Mật khẩu <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.password" type="text" :class="inputClass(errors.password)" />
                            <p v-if="errors.password" class="mt-1 text-xs text-red-500 break-words">{{ errors.password
                            }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Số điện thoại <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.phone" type="text" :class="inputClass(errors.phone)" />
                            <p v-if="errors.phone" class="mt-1 text-xs text-red-500 break-words">{{ errors.phone }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Địa chỉ <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.address" type="text" :class="inputClass(errors.address)" />
                            <p v-if="errors.address" class="mt-1 text-xs text-red-500 break-words">{{ errors.address }}
                            </p>
                        </div>
                    </div>
                    <button type="submit"
                        class="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                        Lưu người dùng
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GenderDto } from "@/types/gender.type";
import { getAllGenders } from "@/services/genderService";
import { ApiResponse } from "@/types/api.type";
import router from "@/routers";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import { UserCreateRequest, ValidationErrorUser } from "@/types/user.type";
import { createUser } from "@/services/userService";

const form = ref<UserCreateRequest>({
    name: "",
    genderId: null,
    address: "",
    phone: "",
    email: "",
    password: ""
});

const genders = ref<GenderDto[]>([]);
const errors = ref<ValidationErrorUser>({});
const { showToast } = useToast();

onMounted(async () => {
    try {
        const resGender = await getAllGenders();
        genders.value = resGender.data;
    } catch (error) {
        showToast(error);
    }
});

async function handleSubmit() {
    try {
        const res = await createUser(form.value);
        if (res.code === 201) {
            showToast(res.message, "success");
            console.log("User created:", res.data);
            router.push("/users");
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
