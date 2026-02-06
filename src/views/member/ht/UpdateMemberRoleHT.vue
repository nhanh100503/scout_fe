<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Cập nhật huynh trưởng</h2>
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
                            <label class="block text-sm font-medium text-gray-700">Đoàn <span class="text-red-500">*
                                </span></label>
                            <input v-model="form.team" type="text" :class="inputClass(errors.team)" />
                            <p v-if="errors.team" class="mt-1 text-xs text-red-500 break-words">
                                {{ errors.team }}
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
                                <option value="">-- Chọn giới tính --</option>
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
                                <option value="">-- Chọn tôn giáo --</option>
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
                                <option value="">-- Chọn ngành hiện tại --</option>
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
                                <option value="">-- Chọn trách vụ --</option>
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
                        Cập nhật huynh trưởng
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMemberById, updateMemberRoleHT } from "@/services/memberService";
import { getAllDeanery } from "@/services/deaneryService";
import { getAllReligion } from "@/services/religionService";
import { getAllMajor } from "@/services/majorService";
import { getAllResponsibilitiesHTByMajorId } from "@/services/responsibilityService";
import { getAllGenders } from "@/services/genderService";
import type { MemberDto, MemberRoleHTUpdateRequest, ValidationErrorMember } from "@/types/member.type";
import { DeaneryDto } from "@/types/deanery.type";
import { ParishDto } from "@/types/parish.type";
import { FederationDto } from "@/types/federation.type";
import { getParishesByDeaneryId } from "@/services/parishService";
import { getFederationsByParishId } from "@/services/federationService";
import { ReligionDto } from "@/types/religion.type";
import { MajorDto } from "@/types/major.type";
import { ResponsibilityDto } from "@/types/responsibility.type";
import { GenderDto } from "@/types/gender.type";
import { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { inputClass } from "@/utils/inputClass";

const errors = ref<ValidationErrorMember>({});
const route = useRoute();
const router = useRouter();
const memberId = Number(route.params.memberId);
const { toast, showToast } = useToast();

const deaneries = ref<DeaneryDto[]>([]);
const parishes = ref<ParishDto[]>([]);
const federations = ref<FederationDto[]>([]);
const religions = ref<ReligionDto[]>([]);
const majors = ref<MajorDto[]>([]);
const responsibilities = ref<ResponsibilityDto[]>([]);
const genders = ref<GenderDto[]>([]);
const selectedPastMajors = ref<number[]>([]);
const currentMajorId = ref<number | "">("");

const form = ref<MemberRoleHTUpdateRequest>({
    name: "",
    birthday: "",
    startYear: "",
    pledgeYear: "",
    parishId: null,
    federationId: null,
    team: "",
    deaneryId: null,
    genderId: null,
    roleId: 2, // Mặc định là Huynh Trưởng
    religionId: null,
    responsibilityId: null,
    majors: [],
    identify: "",
    phone: "",
    email: "",
    address: "",
    career: "",
    placeOfBirth: "",
    otherResponsibility: ""
});

onMounted(async () => {
    try {
        // Tải tất cả danh mục cùng lúc
        const [resDea, resRel, resMaj, resGen] = await Promise.all([
            getAllDeanery(),
            getAllReligion(),
            getAllMajor(),
            getAllGenders()
        ]);

        deaneries.value = resDea.data;
        religions.value = resRel.data;
        majors.value = resMaj.data;
        genders.value = resGen.data;

        // Tải thông tin chi tiết Huynh trưởng
        const resMember = await getMemberById(memberId);
        if (resMember.code === 200) {
            const m: MemberDto = resMember.data;
            
            // Format ngày sinh cho input type="date"
            let formattedBirthday = "";
            if (m.birthday) {
                formattedBirthday = m.birthday.split('T')[0];
            }

            form.value = {
                ...form.value,
                name: m.name,
                identify: m.identify || "",
                email: m.email || "",
                phone: m.phone || "",
                career: m.career || "",
                address: m.address || "",
                placeOfBirth: m.placeOfBirth || "",
                otherResponsibility: m.otherResponsibility || "",
                birthday: formattedBirthday,
                startYear: m.startYear,
                pledgeYear: m.pledgeYear,
                parishId: m.parishId || null,
                federationId: m.federationId || null,
                team: m.team,
                deaneryId: m.deaneryId || null,
                genderId: m.gender?.genderId || null,
                religionId: m.religion?.religionId || null,
                responsibilityId: m.responsibility?.responsibilityId || null,
                roleId: m.roles?.[0]?.roleId || 2,
                majors: m.majors || []
            };

            // Load parishes and federations if deaneryId and parishId exist
            if (m.deaneryId) {
                const resParishes = await getParishesByDeaneryId(m.deaneryId);
                parishes.value = resParishes.data;
            }
            if (m.parishId) {
                const resFederations = await getFederationsByParishId(m.parishId);
                federations.value = resFederations.data;
            }

            // Cập nhật trạng thái hiển thị trên Form
            selectedPastMajors.value = m.majors?.map(x => x.majorId) || [];
            const current = m.majors?.find(x => x.now);
            currentMajorId.value = current ? current.majorId : "";
        }
    } catch (err: any) {
        showToast(err.message || "Không thể tải dữ liệu", "error");
    }
});

// Watch danh sách ngành đã qua
watch(selectedPastMajors, (newVal) => {
    const currentId = Number(currentMajorId.value);
    
    // Cập nhật mảng majors trong form, giữ lại 'name' từ danh sách gốc
    form.value.majors = newVal.map(id => {
        const master = majors.value.find(m => m.majorId === id);
        return {
            majorId: id,
            name: master ? master.name : "",
            now: id === currentId
        };
    });

    // Nếu ngành đang sinh hoạt bị bỏ tích khỏi danh sách ngành đã qua -> Reset ngành hiện tại
    if (currentId && !newVal.includes(currentId)) {
        currentMajorId.value = "";
    }
});

// Watch ngành đang sinh hoạt hiện tại
watch(currentMajorId, async (newMajorId) => {
    const majorIdNum = Number(newMajorId);

    // Cập nhật thuộc tính 'now'
    form.value.majors.forEach(m => {
        m.now = (m.majorId === majorIdNum);
    });

    if (newMajorId) {
        // Tự động tích checkbox nếu chọn làm ngành hiện tại
        if (!selectedPastMajors.value.includes(majorIdNum)) {
            selectedPastMajors.value.push(majorIdNum);
        }

        try {
            // Lấy danh sách trách vụ dành riêng cho Huynh trưởng theo ngành
            const res = await getAllResponsibilitiesHTByMajorId(majorIdNum);
            responsibilities.value = res.data;
            
            // Nếu trách vụ cũ không thuộc ngành mới -> Reset trách vụ
            const exists = responsibilities.value.some(r => r.responsibilityId === form.value.responsibilityId);
            if (!exists) {
                form.value.responsibilityId = null;
            }
        } catch {
            responsibilities.value = [];
            form.value.responsibilityId = null;
        }
    } else {
        responsibilities.value = [];
        form.value.responsibilityId = null;
    }
});

const onDeaneryChange = async () => {
    form.value.parishId = null;
    form.value.federationId = null;
    parishes.value = [];
    federations.value = [];
    
    if (form.value.deaneryId) {
        try {
            const res = await getParishesByDeaneryId(form.value.deaneryId);
            parishes.value = res.data;
        } catch (error) {
            showToast(error);
        }
    }
};

const onParishChange = async () => {
    form.value.federationId = null;
    federations.value = [];
    
    if (form.value.parishId) {
        try {
            const res = await getFederationsByParishId(form.value.parishId);
            federations.value = res.data;
        } catch (error) {
            showToast(error);
        }
    }
};

async function handleSubmit() {
    errors.value = {};
    const birthdayYear = form.value.birthday ? new Date(form.value.birthday).getFullYear() : null;

    // Validate năm sinh hoạt
    if (form.value.startYear && birthdayYear) {
        if (Number(form.value.startYear) < birthdayYear) {
            errors.value.startYear = "Năm bắt đầu không được nhỏ hơn năm sinh";
            return;
        }
    }

    if (form.value.pledgeYear && birthdayYear) {
        if (Number(form.value.pledgeYear) < birthdayYear) {
            errors.value.pledgeYear = "Năm tuyên hứa không được nhỏ hơn năm sinh";
            return;
        }
    }

    try {
        // Chuẩn hóa dữ liệu majors đảm bảo có đủ name trước khi gửi đi
        const payload = {
            ...form.value,
            majors: form.value.majors.map(m => ({
                majorId: m.majorId,
                name: m.name,
                now: m.now
            }))
        };

        const res = await updateMemberRoleHT(memberId, payload);
        if (res.code === 200) {
            showToast(res.message, "success");
            router.push("/members/ht");
        }
    } catch (error: any) {
        if (error.code === 400 && error.data) {
            errors.value = error.data as ValidationErrorMember;
        }
        showToast(error.message || "Cập nhật thất bại", "error");
    }
}
</script>
