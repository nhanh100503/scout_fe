<template>
    <div class="fixed inset-0 bg-emerald-100 bg-opacity-70 flex items-center justify-center">
        <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
            <div class="hidden md:flex w-1/2 items-center justify-center">
                <img src="@/assets/avatar.png" alt="Reset Password Banner"
                    class="w-32 h-32 object-cover rounded-full shadow-md" />
            </div>
            <div class="flex w-full md:w-1/2 items-center justify-center p-8">
                <div class="w-full max-w-md">
                    <h2 class="text-2xl font-bold text-center text-emerald-700 mb-6">
                        Đặt lại mật khẩu
                    </h2>
                    <p v-if="!token" class="text-sm text-red-500 mb-2">Token xác thực không được cung cấp. Vui lòng kiểm tra liên kết email.</p>
                    <form @submit.prevent="handleSubmit" class="space-y-4">
                        <div>
                            <label for="currentPassword" class="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                            <div class="relative">
                                <input id="currentPassword" :type="showCurrent ? 'text' : 'password'" v-model="currentPassword"
                                    placeholder="Nhập mật khẩu hiện tại..." :class="inputClass(errors.currentPassword)" />
                                <button type="button" @click="toggleCurrent"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-emerald-600 focus:outline-none">
                                    <svg v-if="showCurrent" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 
             0-1.02.152-2.004.437-2.925m2.12-3.12A9.953 9.953 0 0112 3c5.523 
             0 10 4.477 10 10 0 1.02-.152 2.004-.437 2.925m-2.12 3.12L4.457 
             4.457" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
             8.268 2.943 9.542 7-1.274 4.057-5.065 
             7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.currentPassword" class="mt-1 text-xs text-red-500 break-words">{{ errors.currentPassword }}</p>
                        </div>

                        <div>
                            <label for="newPassword" class="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                            <div class="relative">
                                <input id="newPassword" :type="showNew ? 'text' : 'password'" v-model="newPassword"
                                    placeholder="Nhập mật khẩu mới..." :class="inputClass(errors.newPassword)" />
                                <button type="button" @click="toggleNew"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-emerald-600 focus:outline-none">
                                    <svg v-if="showNew" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 
             0-1.02.152-2.004.437-2.925m2.12-3.12A9.953 9.953 0 0112 3c5.523 
             0 10 4.477 10 10 0 1.02-.152 2.004-.437 2.925m-2.12 3.12L4.457 
             4.457" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
             8.268 2.943 9.542 7-1.274 4.057-5.065 
             7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.newPassword" class="mt-1 text-xs text-red-500 break-words">{{ errors.newPassword }}</p>
                        </div>

                        <div>
                            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Nhập lại mật khẩu mới</label>
                            <div class="relative">
                                <input id="confirmPassword" :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword"
                                    placeholder="Nhập lại mật khẩu mới..." :class="inputClass(errors.confirmPassword)" />
                                <button type="button" @click="toggleConfirm"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-emerald-600 focus:outline-none">
                                    <svg v-if="showConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 
             0-1.02.152-2.004.437-2.925m2.12-3.12A9.953 9.953 0 0112 3c5.523 
             0 10 4.477 10 10 0 1.02-.152 2.004-.437 2.925m-2.12 3.12L4.457 
             4.457" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
             8.268 2.943 9.542 7-1.274 4.057-5.065 
             7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.confirmPassword" class="mt-1 text-xs text-red-500 break-words">{{ errors.confirmPassword }}</p>
                        </div>

                        <button type="submit" :disabled="isSubmitting || !token" :class="['w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500', isSubmitting || !token ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700']">
                            <span v-if="isSubmitting">Đang xử lý...</span>
                            <span v-else>Lưu thay đổi</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { inputClass } from "@/utils/inputClass";
import { useToast } from "@/composables/useToast";
import { resetPassword } from "@/services/authService";
import { ApiResponse } from "@/types/api.type";
import { getLS, removeLS } from "@/tools/localStorage.tool";

const router = useRouter();

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const errors = ref<Record<string, string>>({});
const { showToast } = useToast();

const token = getLS("accessToken");
const isSubmitting = ref(false);

function toggleCurrent() {
    showCurrent.value = !showCurrent.value;
}

function toggleNew() {
    showNew.value = !showNew.value;
}

function toggleConfirm() {
    showConfirm.value = !showConfirm.value;
}

function validate() {
    errors.value = {};
    if (!currentPassword.value) {
        errors.value.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }
    if (!newPassword.value) {
        errors.value.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (newPassword.value.length < 6) {
        errors.value.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }
    if (!confirmPassword.value) {
        errors.value.confirmPassword = "Vui lòng nhập lại mật khẩu mới";
    } else if (confirmPassword.value !== newPassword.value) {
        errors.value.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
    if (!validate()) return;
    if (!token) {
        showToast("Token xác thực không tồn tại.", "error");
        return;
    }

    isSubmitting.value = true;
    try {
        const payload = { currentPassword: currentPassword.value, password: newPassword.value };
        const res = await resetPassword(payload, token);
        if (res.code === 200) {
            removeLS("accessToken");
            showToast(res.message || "Đổi mật khẩu thành công", "success");
            router.push({ name: 'login' });
            return;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as Record<string, string>;
        }
        showToast(apiRes.message || "Đổi mật khẩu thất bại", "error");
    } finally {
        isSubmitting.value = false;
    }
}
</script>
