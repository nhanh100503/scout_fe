<template>
    <!-- Mobile Overlay -->
    <div v-if="isOpen" class="fixed inset-0 bg-black/30 z-40 md:hidden" @click="$emit('close')"></div>

    <!-- Sidebar Container -->
    <aside 
        class="fixed inset-y-0 left-0 bg-white border-r border-gray-200 shadow-sm z-50 transition-all duration-300 ease-in-out flex flex-col"
        :class="[
            isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
            isCollapsed ? 'w-64 md:w-20' : 'w-64'
        ]"
    >
        <!-- Header -->
        <div class="h-16 flex items-center justify-between border-b border-gray-200/70 shrink-0"
             :class="isCollapsed ? 'px-0 justify-center' : 'px-4'">
            
            <div class="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                <div class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow shrink-0 transition-transform duration-300">
                    <span class="font-bold">HA</span>
                </div>
                <span 
                    class="font-semibold text-emerald-700 transition-opacity duration-300"
                    :class="isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'"
                >
                    Quản lý
                </span>
            </div>

            <!-- Mobile Close Button -->
            <button
                v-if="!isCollapsed"
                class="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-600 hover:bg-gray-100"
                @click="$emit('close')" aria-label="Đóng sidebar"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto overflow-x-hidden py-3 px-3 custom-scrollbar" @click="handleNavClick">
            <ul class="space-y-1">
                <li v-for="link in navigationLinks" :key="link.to">
                    <RouterLink 
                        v-if="!link.roles || hasAnyRole(link.roles)"
                        :to="link.to"
                        class="flex items-center rounded-md transition-colors duration-200 group relative"
                        :class="[
                            $route.path === link.to 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700',
                            isCollapsed ? 'justify-center py-3 px-0' : 'justify-start gap-3 px-3 py-2'
                        ]"
                        :title="isCollapsed ? link.label : ''"
                    >
                        <component :is="link.icon" class="w-5 h-5 shrink-0" />
                        
                        <span 
                            class="text-sm font-medium whitespace-nowrap transition-all duration-300 origin-left"
                            :class="isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'"
                        >
                            {{ link.label }}
                        </span>

                        <!-- Tooltip for collapsed mode -->
                        <div v-if="isCollapsed" class="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                            {{ link.label }}
                        </div>
                    </RouterLink>
                </li>
            </ul>

            <!-- Statistics Section -->
            <div v-if="hasAnyRole(['ADMIN', 'USER', 'HT', 'DT'])" class="mt-6 pt-4 border-t border-gray-100">
                <h4 
                    class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 transition-opacity duration-300 whitespace-nowrap"
                    :class="isCollapsed ? 'opacity-0 hidden' : 'opacity-100'"
                >
                    Thống kê
                </h4>
                
                <div class="space-y-2">
                    <RouterLink to="/statistics/ds"
                        class="flex items-center rounded-md bg-emerald-50 transition-colors duration-200 group relative"
                        :class="isCollapsed ? 'justify-center py-3' : 'justify-between px-3 py-2'"
                        :title="isCollapsed ? 'Thống kê Đoàn sinh' : ''"
                    >
                        <!-- Icon for Stats DS (Added for collapsed mode) -->
                        <svg class="w-5 h-5 text-emerald-700 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                         <span 
                            class="text-sm text-emerald-700 font-medium whitespace-nowrap transition-all duration-300"
                            :class="isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto ml-3'"
                        >
                            Đoàn sinh
                        </span>
                    </RouterLink>

                    <RouterLink to="/statistics/ht"
                        class="flex items-center rounded-md bg-emerald-50 transition-colors duration-200 group relative"
                        :class="isCollapsed ? 'justify-center py-3' : 'justify-between px-3 py-2'"
                        :title="isCollapsed ? 'Thống kê Huynh trưởng' : ''"
                    >
                        <!-- Icon for Stats HT (Added for collapsed mode) -->
                        <svg class="w-5 h-5 text-emerald-700 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span 
                            class="text-sm text-emerald-700 font-medium whitespace-nowrap transition-all duration-300"
                            :class="isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto ml-3'"
                        >
                            Huynh trưởng
                        </span>
                    </RouterLink>
                </div>
            </div>
        </nav>
        
        <!-- Toggle Hint -->
         <div class="p-4 border-t border-gray-200/70 hidden md:flex justify-center">
             <button 
                @click="toggleSidebar"
                class="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
                title="Nhấn phím '.' để thu gọn/mở rộng"
             >
                 <span v-if="!isCollapsed">Thu gọn (.)</span>
                 <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                 </svg>
             </button>
         </div>
    </aside>
</template>

<script setup lang="ts">
import { h } from "vue";
import { useAuth } from "@/composables/useAuth";

const { currentMember } = useAuth();
defineProps<{
    isOpen: boolean;
    isCollapsed: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'toggle-collapse'): void;
}>();

const toggleSidebar = () => {
    emit('toggle-collapse');
};

const hasAnyRole = (requiredRoles: string[]): boolean => {
    const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
    return userRoles.some(role => requiredRoles.includes(role));
};

function handleNavClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('a')) {
        emit('close');
    }
}

// Icon Components (using h() render function since they are simple SVGs)
const IconDashboard = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 3h7v7H3V3zm11 0h7v4h-7V3zM3 14h4v7H3v-7zm8 0h10v7H11v-7z' })]);
const IconUsers = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z' })]);
const IconMembersDS = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m14-10a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm6 10v-2a4 4 0 0 0-3-3' })]);
const IconMembersHT = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z' })]);
const IconMembersDT = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })]);
const IconMajors = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 6v12m8-6H4' })]);
const IconDeaneries = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.894L9 1m6 0l5.447 2.724A2 2 0 0121 5.618v9.764a2 2 0 01-1.553 1.894L15 20m0-19v19' })]);
const IconParishes = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })]);
const IconFederations = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' })]);
const IconTeams = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })]);
const IconReligions = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 2v20m-6-6h12' })]);
const IconRanks = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 17l-4 2 1-4-3-3 4-.5L12 7l2 4.5 4 .5-3 3 1 4z' })]);
const IconResponsibilities = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12h6m-6 4h6M5 6h14M5 10h14M5 14h14M5 18h14' })]);
const IconActivities = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })]);

// Define navigation items for cleaner template
const navigationLinks = [
    { to: '/', label: 'Bảng điều khiển', icon: IconDashboard },
    { to: '/users', label: 'Quản lý người dùng', roles: ['ADMIN'], icon: IconUsers },
    { to: '/members/ds', label: 'Quản lý đoàn sinh', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconMembersDS },
    { to: '/members/ht', label: 'Quản lý huynh trưởng', roles: ['ADMIN', 'USER', 'DT'], icon: IconMembersHT },
    { to: '/members/dt', label: 'Quản lý đạo trưởng', roles: ['ADMIN', 'USER'], icon: IconMembersDT },
    { to: '/majors', label: 'Quản lý ngành', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconMajors },
    { to: '/deaneries', label: 'Quản lý châu', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconDeaneries },
    { to: '/parishes', label: 'Quản lý đạo', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconParishes },
    { to: '/federations', label: 'Quản lý liên đoàn', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconFederations },
    { to: '/teams', label: 'Quản lý đội/nhóm', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconTeams },
    { to: '/religions', label: 'Quản lý tôn giáo', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconReligions },
    { to: '/ranks', label: 'Quản lý đẳng thứ', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconRanks },
    { to: '/responsibilities', label: 'Quản lý trách vụ', roles: ['ADMIN', 'USER', 'HT', 'DT'], icon: IconResponsibilities },
    { to: '/activities', label: 'Quản lý sinh hoạt', roles: ['ADMIN', 'USER', 'HT'], icon: IconActivities },
];
</script>

<style scoped>
/* Custom scrollbar for sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
</style>
