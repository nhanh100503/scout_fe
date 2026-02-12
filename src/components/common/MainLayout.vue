<template>
    <div class="min-h-screen bg-gray-50 text-gray-800 pt-16 pb-16">
        <AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
        <div class="flex">
            <AppSidebar 
                :is-open="isSidebarOpen" 
                :is-collapsed="isSidebarCollapsed"
                @close="isSidebarOpen = false" 
                @toggle-collapse="isSidebarCollapsed = !isSidebarCollapsed"
            />
            
            <!-- Main Content Area with adaptive margin -->
            <div 
                class="flex-1 min-h-[calc(100vh-8rem)] flex flex-col transition-[margin] duration-300 ease-in-out"
                :class="isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'"
            >
                <main class="flex-1 h-full w-full p-4">
                    <div class="h-full w-full bg-white rounded-lg shadow flex flex-col overflow-y-auto">
                        <RouterView />
                    </div>
                </main>
            </div>
        </div>
        <AppFooter 
            :is-collapsed="isSidebarCollapsed"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AppHeader from '@/components/common/AppHeader.vue';
import AppSidebar from '@/components/common/AppSidebar.vue';
import AppFooter from '@/components/common/AppFooter.vue';

const isSidebarOpen = ref(false); // Mobile toggle
const isSidebarCollapsed = ref(false); // Desktop collapse

// Keyboard listener for '.' key
const handleKeydown = (e: KeyboardEvent) => {
    // Only toggle if not typing in an input/textarea
    const target = e.target as HTMLElement;
    if (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) return;

    if (e.key === '.') {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>
