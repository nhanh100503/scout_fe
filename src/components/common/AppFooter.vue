<template>
    <footer 
        class="fixed bottom-0 right-0 left-0 h-16 bg-white border-t border-gray-200 z-40 transition-[left] duration-300 ease-in-out"
        :class="isCollapsed ? 'md:left-20' : 'md:left-64'"
    >
        <div class="h-full px-4 md:px-6 flex items-center justify-between">
            <p class="text-sm text-gray-600">
                © {{ new Date().getFullYear() }} HA - Bản quyền
            </p>
            <div class="flex items-center gap-3">
                <a href="" class="text-sm text-emerald-700 hover:underline">Điều khoản</a>
                <a href="" class="text-sm text-emerald-700 hover:underline">Bảo mật</a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
defineProps<{
    isCollapsed?: boolean
}>();
</script>