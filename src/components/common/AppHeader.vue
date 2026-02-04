<template>
    <header class="fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-200/70 shadow-sm h-16">
        <div class="h-full flex items-center justify-between px-4 md:px-6">
            <div class="flex items-center gap-3">
                <button
                    class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:bg-gray-100"
                    aria-label="Mở sidebar" @click="$emit('toggle-sidebar')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <a href="#" class="flex items-center gap-2">
                    <div
                        class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow">
                        <span class="font-bold">FM</span>
                    </div>
                    <span class="text-lg font-semibold text-emerald-700">Frontend Management</span>
                </a>
            </div>
            <div class="hidden md:flex md:flex-1 md:mx-6">
                <div class="relative w-full max-w-lg">
                    <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                        </svg>
                    </span>
                    <input type="text" placeholder="Tìm kiếm..."
                        class="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
            </div>
            <div class="flex items-center gap-2 relative">
                <button
                    class="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:bg-gray-100"
                    aria-label="Thông báo">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V4a2 2 0 1 0-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <div class="flex items-center gap-3 pl-2 border-l border-gray-200 cursor-pointer"
                    @click="toggleDropdown">
                    <img 
                        :src="avatarUrl" 
                        alt="avatar" 
                        class="w-9 h-9 rounded-full border border-gray-200 object-cover" 
                    />
                    <div class="hidden sm:block">
                        <div class="text-sm font-medium">{{ currentMember?.name }}</div>
                        <div class="text-xs text-gray-500">{{ rolesDisplay }}</div>
                    </div>
                </div>
                <div v-if="isDropdownOpen"
                    class="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul class="py-2 text-sm text-gray-700">
                        <li>
                            <router-link to="/profile"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Hồ sơ
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/settings"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4
                   4-1.79 4-4-1.79-4-4-4zm0-6v2m0 16v2m8-10h2M2 12H0m17.657-7.657l1.414 1.414M4.929 19.071l-1.414-1.414m0-12.728l1.414 1.414M19.071 19.071l-1.414-1.414" />
                                </svg>
                                Cài đặt
                            </router-link>
                        </li>
                        <li>
                            <router-link 
                                to="/reset-password"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            >
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 7a3 3 0 00-6 0v3H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2V7z" />
                                </svg>
                                Đổi mật khẩu
                            </router-link>
                        </li>
                        <li>
                            <button @click="handleLogout"
                                class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors">
                                <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8V7a2 2 0 114 0v1" />
                                </svg>
                                <span>Thoát</span>
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import defaultAvatarImg from "@/assets/avatar.png";

defineEmits<{ (e: 'toggle-sidebar'): void }>();

const { currentMember, clearMember } = useAuth();
const router = useRouter();
const isDropdownOpen = ref(false);

const avatarUrl = computed(() => currentMember.value?.avatar || defaultAvatarImg);

const rolesDisplay = computed(() => {
    if (!currentMember.value?.roles || currentMember.value.roles.length === 0) {
        return 'Chưa có vai trò';
    }
    return currentMember.value.roles.map(role => role.description).join(', ');
});

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
}

function handleLogout() {
    clearMember();
    localStorage.removeItem("accessToken");
    router.push("/login");
}

function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest("header")) {
        isDropdownOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>
