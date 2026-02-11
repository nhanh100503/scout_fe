<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6">
            <h2 class="text-xl font-semibold mb-6 text-emerald-700">Tạo đội/nhóm mới</h2>
            <form class="bg-white rounded-lg shadow p-6 space-y-6" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tên đội/nhóm <span class="text-red-500">*</span></label>
                        <input v-model="form.name" type="text" :class="inputClass(errors.name)" placeholder="Ví dụ: Chi đoàn 1" />
                        <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Châu <span class="text-red-500">*</span></label>
                        <select v-model="deaneryId" :class="inputClass(errors.deaneryId)" @change="onDeaneryChange">
                            <option :value="null" disabled>-- Chọn châu --</option>
                            <option v-for="item in deaneries" :key="item.deaneryId" :value="item.deaneryId">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Đạo (Giáo xứ) <span class="text-red-500">*</span></label>
                        <select v-model="form.parishId" :class="inputClass(errors.parishId)">
                            <option :value="null" disabled>-- Chọn đạo --</option>
                            <option v-for="item in parishes" :key="item.parishId" :value="item.parishId">
                                {{ item.name }}
                            </option>
                        </select>
                        <p v-if="errors.parishId" class="mt-1 text-xs text-red-500">{{ errors.parishId }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Ngành <span class="text-red-500">*</span></label>
                        <select v-model="form.majorId" :class="inputClass(errors.majorId)">
                            <option :value="undefined" disabled>-- Chọn ngành --</option>
                            <option v-for="item in majors" :key="item.majorId" :value="item.majorId">
                                {{ item.name }}
                            </option>
                        </select>
                        <p v-if="errors.majorId" class="mt-1 text-xs text-red-500">{{ errors.majorId }}</p>
                    </div>
                </div>

                <div class="flex justify-end gap-4 pt-4 border-t">
                    <button type="button" @click="$router.push('/teams')" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        Hủy
                    </button>
                    <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 shadow-sm" :disabled="loading">
                        {{ loading ? 'Đang lưu...' : 'Lưu đội/nhóm' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
import { getAllDeanery } from "@/services/deaneryService";
import { getParishesByDeaneryId } from "@/services/parishService";
import { createTeam } from "@/services/teamService";
import { getAllMajor } from "@/services/majorService"; 
import { TeamCreateRequest } from "@/types/team.type";
import { DeaneryDto } from "@/types/deanery.type";
import { ParishDto } from "@/types/parish.type";
import { MajorDto } from "@/types/major.type";

const router = useRouter();
const { showToast } = useToast();
const loading = ref(false);
const errors = ref<any>({});

const deaneryId = ref<number | null>(null);
const deaneries = ref<DeaneryDto[]>([]);
const parishes = ref<ParishDto[]>([]);
const majors = ref<MajorDto[]>([]);

const form = ref<TeamCreateRequest>({
    name: "",
    parishId: 0,
    majorId: undefined
});

onMounted(async () => {
    try {
        const res = await getAllDeanery();
        deaneries.value = res.data;
        
        const resMajors = await getAllMajor();
        majors.value = resMajors.data;
    } catch (e) {
        showToast("Không thể tải dữ liệu", "error");
    }
});

const onDeaneryChange = async () => {
    form.value.parishId = 0;
    parishes.value = [];
    if (deaneryId.value) {
        try {
            const res = await getParishesByDeaneryId(deaneryId.value);
            parishes.value = res.data;
        } catch (e) {
            showToast("Không thể tải danh sách đạo", "error");
        }
    }
};

async function handleSubmit() {
    errors.value = {};
    if (!form.value.name) errors.value.name = "Tên đội/nhóm không được để trống";
    if (!form.value.parishId) errors.value.parishId = "Vui lòng chọn đạo";
    if (!form.value.majorId) errors.value.majorId = "Vui lòng chọn ngành";

    if (Object.keys(errors.value).length > 0) return;

    loading.value = true;
    try {
        const res = await createTeam(form.value);
        if (res.code === 201) {
            showToast(res.message, "success");
            router.push("/teams");
        }
    } catch (error: any) {
        if (error.code === 400 && error.data) {
            errors.value = error.data;
        }
        showToast(error.message || "Tạo thất bại", "error");
    } finally {
        loading.value = false;
    }
}
</script>
