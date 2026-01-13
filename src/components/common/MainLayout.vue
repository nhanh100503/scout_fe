<template>
    <div class="min-h-screen bg-gray-50 text-gray-800 pt-16 pb-16">
        <AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
        <div class="flex">
            <AppSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
            <div class="flex-1 md:ml-64 min-h-[calc(100vh-8rem)] flex flex-col">
                <main class="flex-1 h-full w-full">
                    <div class="h-full w-full bg-white rounded-lg shadow flex flex-col overflow-y-auto">
                        <RouterView />
                    </div>
                </main>
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/common/AppHeader.vue';
import AppSidebar from '@/components/common/AppSidebar.vue';
import AppFooter from '@/components/common/AppFooter.vue';

const isSidebarOpen = ref(false);
</script>
