<template>
    <div class="fixed inset-0 bg-emerald-100 bg-opacity-70 flex items-center justify-center">
        <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
            <div class="hidden md:flex w-1/2 items-center justify-center">
                <img src="@/assets/avatar.png" alt="Login Banner"
                    class="w-32 h-32 object-cover rounded-full shadow-md" />
            </div>
            <div class="flex w-full md:w-1/2 items-center justify-center p-8">
                <div class="w-full max-w-md">
                    <h2 class="text-2xl font-bold text-center text-emerald-700 mb-6">
                        Đăng nhập hệ thống
                    </h2>
                    <form @submit.prevent="handleLogin" class="space-y-4">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input id="email" type="text" v-model="email" placeholder="Nhập email..."
                                :class="inputClass(errors.email)" />
                            <p v-if="errors.email" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.email }}
                            </p>
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <div class="relative">
                                <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
                                    placeholder="Nhập mật khẩu..." :class="inputClass(errors.password)" />
                                <button type="button" @click="togglePassword"
                                    class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-emerald-600 focus:outline-none">
                                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 
             0-1.02.152-2.004.437-2.925m2.12-3.12A9.953 9.953 0 0112 3c5.523 
             0 10 4.477 10 10 0 1.02-.152 2.004-.437 2.925m-2.12 3.12L4.457 
             4.457" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
             8.268 2.943 9.542 7-1.274 4.057-5.065 
             7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.password" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.password }}
                            </p>
                        </div>
                        <button type="submit"
                            class="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useToast } from "@/composables/useToast";
import { getCurrentMember, login } from "@/services/authService";
import { setLS } from "@/tools/localStorage.tool";
import { ApiResponse } from "@/types/api.type";
import { AuthLoginRequest, ValidationLoginErrors } from "@/types/auth.type";
import { inputClass } from "@/utils/inputClass";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { setMember } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const accessToken = ref<string | null>(null);
const errors = ref<ValidationLoginErrors>({});
const { toast, showToast } = useToast();

function togglePassword() {
    showPassword.value = !showPassword.value;
}

async function handleLogin() {
    errors.value = {};
    try {
        const payload: AuthLoginRequest = { email: email.value, password: password.value };
        const res = await login(payload);
        if (res.code === 200) {
            accessToken.value = res.data.accessToken;
            setLS("accessToken", accessToken.value);
            const userRes = await getCurrentMember();
            setMember(userRes.data);
            showToast(res.message, "success");
            router.push("/");
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationLoginErrors;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
