<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Tạo huynh trưởng mới</h2>
            <form class="space-y-4 flex-1 flex flex-col" @submit.prevent="handleSubmit">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Châu <span class="text-red-500">*
                                </span></label>
                            <select v-model="form.deaneryId" :class="inputClass(errors.deaneryId)" @change="onDeaneryChange">
                                <option :value="null" disabled>-- Chọn châu --</option>
                                <option v-for="item in deaneries" :key="item.deaneryId" :value="item.deaneryId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.deaneryId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.deaneryId }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Đạo <span class="text-red-500">*
                                </span></label>
                            <select v-model="form.parishId" :class="inputClass(errors.parishId)" @change="onParishChange">
                                <option :value="null" disabled>-- Chọn đạo --</option>
                                <option v-for="item in parishes" :key="item.parishId" :value="item.parishId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.parishId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.parishId }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Liên đoàn <span
                                    class="text-red-500">*
                                </span></label>
                            <select v-model="form.federationId" :class="inputClass(errors.federationId)">
                                <option :value="null" disabled>-- Chọn liên đoàn --</option>
                                <option v-for="item in federations" :key="item.federationId" :value="item.federationId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.federationId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.federationId }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Đội/Nhóm <span class="text-red-500">*
                                </span></label>
                            <select v-model="form.teamId" :class="inputClass(errors.teamId)">
                                <option :value="0">-- Chọn đội/nhóm --</option>
                                <option v-for="t in teams" :key="t.teamId" :value="t.teamId">
                                    {{ t.name }}
                                </option>
                            </select>
                            <p v-if="errors.teamId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.teamId }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Họ và tên <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.name" type="text" :class="inputClass(errors.name)" />
                            <p v-if="errors.name" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.name }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Giới tính <span
                                    class="text-red-500">*
                                </span></label>
                            <select v-model="form.genderId" :class="inputClass(errors.genderId)">
                                <option value="" disabled>-- Chọn giới tính --</option>
                                <option v-for="item in genders" :key="item.genderId" :value="item.genderId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.genderId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.genderId }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Ngày sinh <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.birthday" type="date" :class="inputClass(errors.birthday)" />
                            <p v-if="errors.birthday" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.birthday }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Nơi sinh <span class="text-red-500">*
                                </span></label>
                            <input v-model="form.placeOfBirth" type="text" :class="inputClass(errors.placeOfBirth)" />
                            <p v-if="errors.placeOfBirth" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.placeOfBirth }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Căn cước công dân <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.identify" type="text" :class="inputClass(errors.identify)" />
                            <p v-if="errors.identify" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.identify }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*
                                </span></label>
                            <input v-model="form.email" type="text" :class="inputClass(errors.email)" />
                            <p v-if="errors.email" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.email }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Số điện thoại <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.phone" type="text" :class="inputClass(errors.phone)" />
                            <p v-if="errors.phone" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.phone }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Địa chỉ <span class="text-red-500">*
                                </span></label>
                            <input v-model="form.address" type="text" :class="inputClass(errors.address)" />
                            <p v-if="errors.address" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.address }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Chuyên môn <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.career" type="text" :class="inputClass(errors.career)" />
                            <p v-if="errors.career" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.career }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Tôn giáo <span class="text-red-500">*
                                </span></label>
                            <select v-model="form.religionId" :class="inputClass(errors.religionId)">
                                <option value="" disabled>-- Chọn tôn giáo --</option>
                                <option v-for="item in religions" :key="item.religionId" :value="item.religionId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.religionId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.religionId }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Năm bắt đầu sinh hoạt <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.startYear" type="text" :class="inputClass(errors.startYear)" />
                            <p v-if="errors.startYear" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.startYear }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Năm tuyên hứa <span
                                    class="text-red-500">*
                                </span></label>
                            <input v-model="form.pledgeYear" type="text" :class="inputClass(errors.pledgeYear)" />
                            <p v-if="errors.pledgeYear" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.pledgeYear }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Đã từng là đoàn sinh các ngành
                                <span class="text-red-500">*
                                </span></label>
                            <div class="flex flex-wrap gap-4 mt-2">
                                <label v-for="item in majors" :key="item.majorId">
                                    <input type="checkbox" :value="item.majorId" v-model="selectedPastMajors" />
                                    {{ item.name }}
                                </label>
                                <p v-if="errors.majors" class="mt-1 text-xs text-red-500 break-words">
                                    {{ errors.majors }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Ngành đang sinh hoạt <span
                                    class="text-red-500">*
                                </span></label>
                            <select v-model="currentMajorId"
                                class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2">
                                <option value="" disabled>-- Chọn ngành hiện tại --</option>
                                <option v-for="item in majors" :key="item.majorId" :value="item.majorId">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Trách vụ (Chọn ngành đang sinh hoạt
                                trước)</label>
                            <select v-model="form.responsibilityId" :class="inputClass(errors.responsibilityId)">
                                <option value="" disabled>-- Chọn trách vụ --</option>
                                <option v-for="item in responsibilities" :key="item.responsibilityId"
                                    :value="item.responsibilityId">
                                    {{ item.name }}
                                </option>
                            </select>
                            <p v-if="errors.responsibilityId" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.responsibilityId }}
                            </p>
                        </div>
                        <div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Trách vụ khác</label>
                                <input v-model="form.otherResponsibility" type="text"
                                    :class="inputClass(errors.otherResponsibility)" />
                                <p v-if="errors.otherResponsibility" class="mt-1 text-xs text-red-500 break-words">
                                    {{ errors.otherResponsibility }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-4">
                    <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                        Lưu huynh trưởng
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ReligionDto } from "@/types/religion.type";
import { getAllDeanery } from "@/services/deaneryService";
import { getAllReligion } from "@/services/religionService";
import { MajorDto } from "@/types/major.type";
import { getAllMajor } from "@/services/majorService";
import { ResponsibilityDto } from "@/types/responsibility.type";
import { watch } from "vue";
import { getAllResponsibilitiesHTByMajorId } from "@/services/responsibilityService";
import { GenderDto } from "@/types/gender.type";
import { getAllGenders } from "@/services/genderService";
import { MemberRoleHTCreateRequest, ValidationErrorMember } from "@/types/member.type";
import { createMemberRoleHT } from "@/services/memberService";
import { DeaneryDto } from "@/types/deanery.type";
import { ParishDto } from "@/types/parish.type";
import { FederationDto } from "@/types/federation.type";
import { TeamDto } from "@/types/team.type";
import { getParishesByDeaneryId } from "@/services/parishService";
import { getFederationsByParishId } from "@/services/federationService";
import { getTeamsByDeaneryIdAndMajorId, getTeamsByParishIdAndMajorId } from "@/services/teamService";
import { ApiResponse } from "@/types/api.type";
import router from "@/routers";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";
const form = ref<MemberRoleHTCreateRequest>({
    name: "",
    birthday: "",
    startYear: "",
    pledgeYear: "",
    parishId: null,
    federationId: null,
    teamId: 0,
    deaneryId: null,
    genderId: null,
    roleId: 2,
    religionId: null,
    responsibilityId: null,
    majors: [],
    address: "",
    career: "",
    identify: "",
    phone: "",
    email: "",
    placeOfBirth: "",
    otherResponsibility: ""
});

const deaneries = ref<DeaneryDto[]>([]);
const parishes = ref<ParishDto[]>([]);
const federations = ref<FederationDto[]>([]);
const teams = ref<TeamDto[]>([]);
const religions = ref<ReligionDto[]>([]);
const majors = ref<MajorDto[]>([]);
const responsibilities = ref<ResponsibilityDto[]>([]);
const genders = ref<GenderDto[]>([])
const errors = ref<ValidationErrorMember>({});
const { toast, showToast } = useToast();

onMounted(async () => {
    try {
        const resDeaneries = await getAllDeanery();
        deaneries.value = resDeaneries.data;

        const resReligions = await getAllReligion();
        religions.value = resReligions.data;

        const resMajor = await getAllMajor();
        majors.value = resMajor.data;

        const resGender = await getAllGenders();
        genders.value = resGender.data;
    } catch (error) {
        showToast(error);
    }
});

const selectedPastMajors = ref<number[]>([]);
const currentMajorId = ref<number | "">("");

watch(selectedPastMajors, (newVal) => {
    const current = form.value.majors.find(m => m.now);
    form.value.majors = current ? [current] : [];
    newVal.forEach(id => {
        if (current && current.majorId === id) return;
        const major = majors.value.find(m => m.majorId === id);
        form.value.majors.push({
            majorId: id,
            name: major ? major.name : "",
            now: false
        });
    });
});

watch(currentMajorId, async (newMajorId) => {
    form.value.majors = form.value.majors.filter(m => !m.now);
    if (newMajorId) {
        const major = majors.value.find(m => m.majorId === newMajorId);
        const existing = form.value.majors.find(m => m.majorId === Number(newMajorId));
        if (existing) {
            existing.now = true;
        } else {
            form.value.majors.push({
                majorId: Number(newMajorId),
                name: major ? major.name : "",
                now: true
            });
        }

        try {
            const res = await getAllResponsibilitiesHTByMajorId(Number(newMajorId));
            responsibilities.value = res.data;
        } catch (error) {
            responsibilities.value = [];
        }

        // Fetch teams if deanery is selected
        if (form.value.deaneryId) {
             try {
                const res = await getTeamsByDeaneryIdAndMajorId(form.value.deaneryId, Number(newMajorId));
                teams.value = res.data;
            } catch (error) {
                teams.value = [];
            }
        }

    } else {
        responsibilities.value = [];
        teams.value = []; // Clear teams if no major
        form.value.responsibilityId = null;
        form.value.teamId = 0;
    }
});

const onDeaneryChange = async () => {
    form.value.parishId = null;
    form.value.federationId = null;
    form.value.teamId = 0;
    parishes.value = [];
    federations.value = [];
    teams.value = [];

    if (form.value.deaneryId) {
        try {
            const parishRes = await getParishesByDeaneryId(form.value.deaneryId);
            parishes.value = parishRes.data;

            // If major is already selected, re-fetch teams
            if (currentMajorId.value) {
                 const teamRes = await getTeamsByDeaneryIdAndMajorId(form.value.deaneryId, Number(currentMajorId.value));
                 teams.value = teamRes.data;
            }
        } catch (error) {
            showToast(error);
        }
    }
};

const onParishChange = async () => {
    form.value.federationId = null;
    federations.value = [];
    teams.value = [];
    form.value.teamId = 0;

    if (form.value.parishId) {
        try {
            const res = await getFederationsByParishId(form.value.parishId);
            federations.value = res.data;

            if (currentMajorId.value) {
                const teamRes = await getTeamsByParishIdAndMajorId(form.value.parishId, Number(currentMajorId.value));
                teams.value = teamRes.data;
            }
        } catch (error) {
            showToast(error);
        }
    } else if (form.value.deaneryId && currentMajorId.value) {
         try {
             const teamRes = await getTeamsByDeaneryIdAndMajorId(form.value.deaneryId, Number(currentMajorId.value));
             teams.value = teamRes.data;
         } catch (error) {
             teams.value = [];
         }
    }
};

async function handleSubmit() {
    console.log(form.value);
    const birthdayYear = form.value.birthday ? new Date(form.value.birthday).getFullYear() : null;

    if (form.value.startYear) {
        if (!/^\d{4}$/.test(String(form.value.startYear))) {
            errors.value.startYear = "Năm bắt đầu phải gồm 4 chữ số";
            return;
        }
        if (birthdayYear && Number(form.value.startYear) < birthdayYear) {
            errors.value.startYear = "Năm bắt đầu không được nhỏ hơn năm sinh";
            return;
        }
    }

    if (form.value.pledgeYear) {
        if (!/^\d{4}$/.test(String(form.value.pledgeYear))) {
            errors.value.pledgeYear = "Năm tuyên hứa phải gồm 4 chữ số";
            return;
        }
        if (birthdayYear && Number(form.value.pledgeYear) < birthdayYear) {
            errors.value.pledgeYear = "Năm tuyên hứa không được nhỏ hơn năm sinh";
            return;
        }
    }

    try {
        const res = await createMemberRoleHT(form.value);
        if (res.code === 201) {
            showToast(res.message, "success");
            router.push("/members/ht")
        }

    } catch (error: any) {
        const apiRes: ApiResponse<any> = error;
        if (apiRes.code === 400 && apiRes.data) {
            errors.value = apiRes.data as ValidationErrorMember;
        }
        showToast(apiRes.message, "error");
    }
}
</script>
