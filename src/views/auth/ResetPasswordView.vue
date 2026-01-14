<template>
    <div class="fixed inset-0 bg-emerald-100 bg-opacity-70 flex items-center justify-center">
        <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
            <div class="hidden md:flex w-1/2 items-center justify-center bg-emerald-50">
                <img src="@/assets/avatar.png" alt="Reset Password Banner"
                    class="w-32 h-32 object-cover rounded-full shadow-md border-4 border-white" />
            </div>

            <div class="flex w-full md:w-1/2 items-center justify-center p-8">
                <div class="w-full max-w-md">
                    <h2 class="text-2xl font-bold text-center text-emerald-700 mb-6">
                        Đặt lại mật khẩu
                    </h2>
                    
                    <p v-if="!token" class="text-sm text-red-500 mb-4 bg-red-50 p-2 rounded border border-red-200">
                        Phiên làm việc hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.
                    </p>

                    <form @submit.prevent="handleSubmit" class="space-y-4">
                        <div>
                            <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                            <div class="relative">
                                <input id="currentPassword" :type="showCurrent ? 'text' : 'password'" v-model="formData.currentPassword"
                                    placeholder="Nhập mật khẩu hiện tại..." :class="inputClass(errors.currentPassword)" />
                                <button type="button" @click="showCurrent = !showCurrent"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-emerald-600">
                                    <svg v-if="showCurrent" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.152-2.004.437-2.925m2.12-3.12A9.953 9.953 0 0112 3c5.523 0 10 4.477 10 10 0 1.02-.152 2.004-.437 2.925m-2.12 3.12L4.457 4.457" /></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </button>
                            </div>
                            <p v-if="errors.currentPassword" class="mt-1 text-xs text-red-500">{{ errors.currentPassword }}</p>
                        </div>

                        <div>
                            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                            <div class="relative">
                                <input id="newPassword" :type="showNew ? 'text' : 'password'" v-model="formData.password"
                                    placeholder="Nhập mật khẩu mới..." :class="inputClass(errors.password)" />
                                <button type="button" @click="showNew = !showNew"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-emerald-600">
                                    <svg v-if="showNew" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.152-2.004.437-2.925m2.12-3.12A9.953 9.953 0 0112 3c5.523 0 10 4.477 10 10 0 1.02-.152 2.004-.437 2.925m-2.12 3.12L4.457 4.457" /></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </button>
                            </div>
                            <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
                        </div>

                        <div>
                            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu mới</label>
                            <div class="relative">
                                <input id="confirmPassword" :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword"
                                    placeholder="Nhập lại mật khẩu mới..." :class="inputClass(errors.confirmPassword)" />
                                <button type="button" @click="showConfirm = !showConfirm"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-emerald-600">
                                    <svg v-if="showConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.152-2.004.437-2.925m2.12-3.12A9.953 9.953 0 0112 3c5.523 0 10 4.477 10 10 0 1.02-.152 2.004-.437 2.925m-2.12 3.12L4.457 4.457" /></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </button>
                            </div>
                            <p v-if="errors.confirmPassword" class="mt-1 text-xs text-red-500">{{ errors.confirmPassword }}</p>
                        </div>

                        <button type="submit" 
                            :disabled="isSubmitting || !token" 
                            :class="['w-full py-2.5 px-4 rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2', 
                                    isSubmitting || !token ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200']">
                            <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Đang xử lý...
                            </span>
                            <span v-else>Lưu thay đổi</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { inputClass } from "@/utils/inputClass";
import { useToast } from "@/composables/useToast";
import { resetPassword } from "@/services/authService";
import { ApiResponse } from "@/types/api.type";
import { getLS, removeLS } from "@/tools/localStorage.tool";
import type { ResetPasswordRequest, ValidationResetPasswordErrors } from "@/types/auth.type";

const router = useRouter();
const { showToast } = useToast();

// Khởi tạo errors với kiểu dữ liệu tùy chỉnh mở rộng để chứa confirmPassword
const errors = ref<ValidationResetPasswordErrors & { confirmPassword?: string }>({});

const formData = reactive<ResetPasswordRequest>({
    currentPassword: "",
    password: "", 
});

const confirmPassword = ref("");

const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const token = getLS("accessToken");
const isSubmitting = ref(false);

function validate() {
    errors.value = {};
    
    // Validate Mật khẩu hiện tại
    if (!formData.currentPassword) {
        errors.value.currentPassword = "Mật khẩu hiện tại không được để trống";
    }

    // Validate Mật khẩu mới
    if (!formData.password) {
        errors.value.password = "Mật khẩu mới không được để trống";
    } else if (formData.password.length < 8) {
        errors.value.password = "Mật khẩu mới phải có ít nhất 8 ký tự";
    }

    // Validate Nhập lại mật khẩu
    if (!confirmPassword.value) {
        errors.value.confirmPassword = "Vui lòng nhập lại mật khẩu mới";
    } else if (confirmPassword.value !== formData.password) {
        errors.value.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
    if (!validate()) return;
    
    if (!token) {
        showToast("Token không hợp lệ hoặc đã hết hạn.", "error");
        return;
    }

    isSubmitting.value = true;
    try {
        const res = await resetPassword(formData, token);
        
        if (res.code === 200) {
            removeLS("accessToken");
            showToast(res.message || "Đổi mật khẩu thành công", "success");
            router.push({ name: 'login' });
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            // Ép kiểu dữ liệu lỗi từ Backend trả về
            errors.value = apiRes.data as ValidationResetPasswordErrors;
        }
        showToast(apiRes.message || "Đổi mật khẩu thất bại", "error");
    } finally {
        isSubmitting.value = false;
    }
}
</script>