<template>
    <div class="flex flex-col h-full overflow-y-auto">
        <div class="max-w-4xl mx-auto w-full p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-4 text-emerald-700">Thông tin đoàn sinh</h2>
            <div v-if="toast !== null" class="fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white"
                :class="toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'">
                {{ toast.message }}
            </div>

            <div v-if="member" class="space-y-4 flex-1 flex flex-col">
                <div class="flex-1 overflow-y-auto space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Châu</label>
                            <input type="text" :value="member.deanery?.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Đạo</label>
                            <input type="text" :value="member.parish?.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Liên đoàn</label>
                            <input type="text" :value="member.federation?.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Đoàn</label>
                            <input type="text" :value="member.team" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input type="text" :value="member.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Giới tính</label>
                            <input type="text" :value="member.gender?.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input type="text" :value="formatDate(member.birthday)" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tôn giáo</label>
                        <input type="text" :value="member.religion?.name" readonly
                            class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Năm bắt đầu sinh hoạt</label>
                            <input type="text" :value="member.startYear" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Năm tuyên hứa</label>
                            <input type="text" :value="member.pledgeYear" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Đã từng là đoàn sinh các ngành *</label>
                        <div class="flex flex-wrap gap-4 mt-2">
                            <label v-for="item in member.majors" :key="item.majorId">
                                <input disabled type="checkbox" :value="item.majorId" />
                                {{ item.name }}
                            </label>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Ngành đang sinh hoạt</label>
                        <input type="text" :value="member.majors.find(m => m.now)?.name" readonly
                            class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Trách vụ</label>
                            <input type="text" :value="member.responsibility?.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Đẳng thứ</label>
                            <input type="text" :value="member.rank?.name" readonly
                                class="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100" />
                        </div>
                    </div>
                </div>
                <div class="pt-4">
                    <router-link :to="`/members/update/ds/${member.memberId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                        Cập nhật đoàn sinh
                    </router-link>
                </div>
            </div>
            <div v-else class="text-center text-gray-500">Đang tải thông tin...</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMemberById } from "@/services/memberService";
import type { MemberDto } from "@/types/member.type";
import { formatDate } from "@/utils/dateFormat";

const route = useRoute();
const memberId = Number(route.params.memberId);

const member = ref<MemberDto | null>(null);
const toast = ref<{ type: string; message: string } | null>(null);

onMounted(async () => {
    try {
        const resMember = await getMemberById(memberId);
        if (resMember.code === 200) {
            member.value = resMember.data;
        } 
    } catch (err: any) {
        toast.value = { type: "error", message: err.message };
    }
});

</script>
