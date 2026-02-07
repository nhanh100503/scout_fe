<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/30 z-40 md:hidden" @click="$emit('close')"></div>

    <aside class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm z-50 transition-transform duration-200 ease-out
           -translate-x-full md:translate-x-0" :class="{ 'translate-x-0': isOpen }">
        <div class="h-16 px-4 flex items-center justify-between border-b border-gray-200/70">
            <div class="flex items-center gap-2">
                <div
                    class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow">
                    <span class="font-bold">HA</span>
                </div>
                <span class="font-semibold text-emerald-700">Quản lý</span>
            </div>
            <button
                class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:bg-gray-100"
                @click="$emit('close')" aria-label="Đóng sidebar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav class="px-3 py-3" @click="handleNavClick">
            <ul class="space-y-1">
                <li>
                    <RouterLink to="/"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3h7v7H3V3zm11 0h7v4h-7V3zM3 14h4v7H3v-7zm8 0h10v7H11v-7z" />
                        </svg>
                        <span class="text-sm font-medium">Bảng điều khiển</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/users"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/users' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý người dùng</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN', 'USER'])" to="/members/ds"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/members/ds' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m14-10a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm6 10v-2a4 4 0 0 0-3-3" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý đoàn sinh</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN', 'USER'])" to="/members/ht"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/members/ht' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý huynh trưởng</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN', 'USER'])" to="/members/dt"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/members/dt' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý đạo trưởng</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/majors"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/majors' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m8-6H4" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý ngành</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/deaneries"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/deaneries' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.894L9 1m6 0l5.447 2.724A2 2 0 0121 5.618v9.764a2 2 0 01-1.553 1.894L15 20m0-19v19" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý châu</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/parishes"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/parishes' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý đạo</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/federations"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/federations' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý liên đoàn</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/religions"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/religions' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20m-6-6h12" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý tôn giáo</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/ranks"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/ranks' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 17l-4 2 1-4-3-3 4-.5L12 7l2 4.5 4 .5-3 3 1 4z" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý đẳng thứ</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN'])" to="/responsibilities"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/responsibilities' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12h6m-6 4h6M5 6h14M5 10h14M5 14h14M5 18h14" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý trách vụ</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink v-if="hasAnyRole(['ADMIN', 'USER', 'HT'])" to="/activities"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        :class="{ 'bg-emerald-100 text-emerald-700': $route.path === '/activities' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="text-sm font-medium">Quản lý sinh hoạt</span>
                    </RouterLink>
                </li>

            </ul>
            <div v-if="hasAnyRole(['ADMIN', 'USER', 'HT'])" class="mt-6">
                <h4 class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Thống kê</h4>
                <div class="mt-3 space-y-2 px-3">
                    <RouterLink to="/statistics/ds"
                        class="flex items-center justify-between rounded-md bg-emerald-50 p-3">
                        <span class="text-sm text-emerald-700 font-medium">Đoàn sinh</span>
                    </RouterLink>
                    <RouterLink to="/statistics/ht"
                        class="flex items-center justify-between rounded-md bg-emerald-50 p-3">
                        <span class="text-sm text-emerald-700 font-medium">Huynh trưởng</span>
                    </RouterLink>
                </div>
            </div>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuth } from "@/composables/useAuth";
const { currentMember } = useAuth();

// Định nghĩa Props và Emits
defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

// Helper function to check if user has any of the required roles
const hasAnyRole = (requiredRoles: string[]): boolean => {
    const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
    const result = userRoles.some(role => requiredRoles.includes(role));
    console.log('hasAnyRole check:', { 
        currentMember: currentMember.value?.name,
        userRoles, 
        requiredRoles, 
        result 
    });
    return result;
};

/**
 * Xử lý khi click vào thanh điều hướng
 * Sử dụng Event Delegation để tránh gắn quá nhiều @click vào từng RouterLink
 */
function handleNavClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Nếu click vào thẻ <a> hoặc bất kỳ phần tử con nào bên trong RouterLink
    if (target.closest('a')) {
        emit('close');
    }
}
</script>

<style scoped>
aside {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
