<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-2xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Cập nhật tôn giáo</h2>

            <form v-if="religion" class="" @submit.prevent="handleSubmit">
                <label class="block text-sm font-medium text-gray-700">
                    Tên tôn giáo <span class="text-red-500">*</span>
                </label>
                <input v-model="form.name" type="text" :class="inputClass(errors.name)"
                    placeholder="Nhập tên tôn giáo" />
                <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                    {{ errors.name }}
                </p>

                <div class="flex justify-end gap-3 mt-6">
                    <router-link to="/religions" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                        Quay lại
                    </router-link>
                    <button type="submit"
                        class="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                        Cập nhật tôn giáo
                    </button>
                </div>
            </form>

            <div v-else class="text-red-500">Không tìm thấy tôn giáo</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import { ReligionDto, ReligionUpdateRequest, ValidationErrorReligion } from "@/types/religion.type";
import { getReligionById, updateReligion } from "@/services/religionService";

const errors = ref<ValidationErrorReligion>({});
const { showToast } = useToast();
const route = useRoute();
const router = useRouter();

const religion = ref<ReligionDto | null>(null);
const form = ref<ReligionUpdateRequest>({ name: "" });

const religionId = Number(route.params.religionId);

onMounted(async () => {
    try {
        const res: ApiResponse<ReligionDto> = await getReligionById(religionId);
        if (res.code === 200) {
            religion.value = res.data;
            form.value.name = res.data.name
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorReligion;
        }
        showToast(apiRes.message, "error");
    }
});

async function handleSubmit() {
    errors.value = {};
    try {
        const res = await updateReligion(religionId, form.value);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/religions");
        }
    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorReligion;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
