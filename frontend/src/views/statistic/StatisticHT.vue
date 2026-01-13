<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-white">
        <header class="px-6 pt-6 mb-6">
            <h2 class="text-2xl md:text-3xl font-extrabold text-emerald-700 flex items-center gap-2">
                Thống kê huynh trưởng
            </h2>
            <p class="text-gray-500 mt-1">Tổng quan số lượng theo vai trò, tôn giáo và trách vụ</p>
            <div class="flex justify-center items-center">
                <label for="deanery" class="text-base font-semibold text-gray-700 mr-3">Chọn châu:</label>
                <select id="deanery" v-model="selectedDeanery" @change="fetchAllStats"
                    class="w-64 border border-gray-300 rounded-md px-3 py-2 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option v-for="d in deaneries" :key="d.deaneryId" :value="d.deaneryId">
                        {{ d.name }}
                    </option>
                </select>
            </div>
        </header>

        <main class="flex-1 px-4 pb-6 flex flex-col gap-6">
            <section class="flex-[1]">
                <h3 class="text-lg font-semibold text-emerald-600 mb-4">Thống kê số lượng nam nữ</h3>
                <div class="flex flex-col gap-4">
                    <div v-for="stat in (stats.length ? stats : [{ roleName: 'Huynh trưởng', total: 0, maleCount: 0, femaleCount: 0 }])"
                        :key="stat.roleName" class="bg-white rounded-xl shadow p-4 border border-gray-200">
                        <p class="text-gray-700 mb-2 text-center">
                            Tổng số: <span class="font-bold text-emerald-700">{{ stat.total || 0 }}</span>
                        </p>
                        <div class="grid grid-cols-2 gap-4 mb-2 text-sm border-t border-b border-gray-200 py-2">
                            <div class="text-center">
                                <p class="font-semibold text-blue-600">Số lượng nam</p>
                                <p class="font-bold">{{ stat.maleCount || 0 }}</p>
                            </div>
                            <div class="text-center">
                                <p class="font-semibold text-pink-600">Số lượng nữ</p>
                                <p class="font-bold">{{ stat.femaleCount || 0 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h3 class="text-lg font-semibold text-emerald-600 mb-4">Thống kê số lượng theo tôn giáo</h3>
                <div class="bg-white rounded-xl shadow p-4 border border-gray-100 overflow-x-auto">
                    <table class="w-full min-w-[400px] border-collapse text-xs md:text-sm">
                        <thead>
                            <tr class="bg-emerald-100 text-emerald-700">
                                <th class="px-3 py-2 text-left font-semibold">STT</th>
                                <th class="px-3 py-2 text-left font-semibold">Tôn giáo</th>
                                <th class="px-3 py-2 text-center font-semibold">Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(religion, index) in religionStats" :key="religion.religionName"
                                class="hover:bg-emerald-50 transition-colors">
                                <td class="px-3 py-2 border-t border-emerald-200">{{ index + 1 }}</td>
                                <td class="px-3 py-2 border-t border-emerald-200">{{ religion.religionName }}</td>
                                <td
                                    class="px-3 py-2 border-t text-center font-bold text-emerald-700 border-emerald-200">
                                    {{ religion.total }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section>
                <h3 class="text-lg font-semibold text-emerald-600 mb-4">
                    Thống kê số lượng nam nữ theo trách vụ trong từng ngành
                </h3>
                <div v-for="major in groupedResponsibilities" :key="major.majorId"
                    class="bg-white rounded-xl shadow p-4 border border-gray-200 mb-6">
                    <h4 class="text-md font-bold text-emerald-700 mb-2 text-center border-b border-emerald-200 pb-2">
                        {{ major.majorName }}
                    </h4>
                    <p class="text-gray-700 mb-2 text-center">
                        Tổng số:
                        <span class="font-bold text-emerald-700">
                            {{major.responsibilities.reduce((sum, r) => sum + r.maleCount + r.femaleCount, 0)}}
                        </span>
                    </p>
                    <div class="grid grid-cols-2 gap-4 mb-4 text-sm border-t border-b border-gray-200 py-2">
                        <div class="text-center">
                            <p class="font-semibold text-blue-600">Số lượng nam</p>
                            <p class="font-bold">{{major.responsibilities.reduce((sum, r) => sum + r.maleCount, 0)}}
                            </p>
                        </div>
                        <div class="text-center">
                            <p class="font-semibold text-pink-600">Số lượng nữ</p>
                            <p class="font-bold">{{major.responsibilities.reduce((sum, r) => sum + r.femaleCount, 0)}}
                            </p>
                        </div>
                    </div>
                    <table class="w-full border-collapse text-xs md:text-sm border border-gray-200">
                        <thead>
                            <tr class="bg-emerald-100 text-emerald-700 border-b border-gray-300">
                                <th v-for="resp in major.responsibilities" :key="resp.responsibilityId"
                                    class="px-3 py-2 text-center font-semibold border-r border-gray-200 last:border-r-0">
                                    {{ resp.responsibilityName }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-t border-gray-200">
                                <td v-for="resp in major.responsibilities" :key="resp.responsibilityId"
                                    class="px-3 py-2 text-center font-bold border-r border-gray-200 last:border-r-0">
                                    {{ resp.maleCount + resp.femaleCount }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
</template>


<script setup lang="ts">
import { getRoleHTStats, getReligionStatsRoleHT, getResponsibilityMajorStatsHT } from "@/services/statisticService";
import { RoleStatisticsDto, ReligionStatisticsDto, ResponsibilityStatisticsDto } from "@/types/statistic.type";
import { ref, onMounted, nextTick } from "vue";
import { getAllDeanery } from "@/services/deaneryService";
import { DeaneryDto } from "@/types/deanery.type";

const stats = ref<RoleStatisticsDto[]>([]);
const religionStats = ref<ReligionStatisticsDto[]>([]);
const responsibilities = ref<ResponsibilityStatisticsDto[]>([]);
const groupedResponsibilities = ref<{ majorId: number; majorName: string; responsibilities: ResponsibilityStatisticsDto[] }[]>([]);

const deaneries = ref<DeaneryDto[]>([]);
const selectedDeanery = ref<number | null>(null);

async function fetchDeaneries() {
    const res = await getAllDeanery();
    if (res.code === 200) {
        deaneries.value = res.data;
        if (deaneries.value.length > 0) {
            selectedDeanery.value = deaneries.value[0].deaneryId;
            await fetchAllStats();
        }
    }
}

async function fetchAllStats() {
    if (!selectedDeanery.value) return;
    await fetchStats(selectedDeanery.value);
    await fetchReligionStats(selectedDeanery.value);
    await fetchResponsibilities(selectedDeanery.value);
}

async function fetchStats(deaneryId: number) {
    const res = await getRoleHTStats(deaneryId);
    if (res.code === 200) {
        stats.value = res.data;
        await nextTick();
    }
}

async function fetchReligionStats(deaneryId: number) {
    const res = await getReligionStatsRoleHT(deaneryId);
    if (res.code === 200) {
        religionStats.value = res.data;
    }
}

async function fetchResponsibilities(deaneryId: number) {
    const res = await getResponsibilityMajorStatsHT(deaneryId);
    if (res.code === 200) {
        responsibilities.value = res.data;
        const grouped = responsibilities.value.reduce((acc, curr) => {
            let group = acc.find(g => g.majorId === curr.majorId);
            if (!group) {
                group = { majorId: curr.majorId, majorName: curr.majorName, responsibilities: [] };
                acc.push(group);
            }
            group.responsibilities.push(curr);
            return acc;
        }, [] as { majorId: number; majorName: string; responsibilities: ResponsibilityStatisticsDto[] }[]);
        groupedResponsibilities.value = grouped;
    }
}

onMounted(() => {
    fetchDeaneries();
});
</script>