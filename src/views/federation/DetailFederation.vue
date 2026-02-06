<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Chi tiết liên đoàn</h2>
            <div v-if="federation" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Châu
                    </label>
                    <input type="text" :value="federation.parish?.deanery?.name" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Đạo
                    </label>
                    <input type="text" :value="federation.parish?.name" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Tên liên đoàn
                    </label>
                    <input type="text" :value="federation.name" readonly
                        class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                </div>
                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/federations" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <router-link :to="`/federations/update/${federation.federationId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Sửa liên đoàn
                    </router-link>
                </div>
            </div>
            <div v-else class="text-red-500">Không tìm thấy liên đoàn</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { FederationDto } from "@/types/federation.type";
import { getFederationById } from "@/services/federationService";

const errors = ref<any>({});
const { showToast } = useToast();
const route = useRoute();
const federation = ref<FederationDto | null>(null);
const federationId = Number(route.params.federationId);

onMounted(async () => {
    try {
        const res: ApiResponse<FederationDto> = await getFederationById(federationId);
        if (res.code === 200) {
            federation.value = res.data;
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data;
        }
        showToast(apiRes.message, "error");
    }
});
</script>
