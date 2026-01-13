import { createRouter, createWebHistory } from 'vue-router'
import { ROUTER_PATHS } from '@/constants/router.constant'
import Home from '@/views/Home.vue'
import CreateMemberRoleDS from '@/views/member/ds/CreateMemberRoleDS.vue'
import CreateMemberRoleHT from '@/views/member/ht/CreateMemberRoleHT.vue'
import DetailMemberRoleDS from '@/views/member/ds/DetailMemberRoleDS.vue'
import DetailMemberRoleHT from '@/views/member/ht/DetailMemberRoleHT.vue'
import ListMemberRoleDS from '@/views/member/ds/ListMemberRoleDS.vue'
import ListMemberRoleHT from '@/views/member/ht/ListMemberRoleHT.vue'
import UpdateMemberRoleDS from '@/views/member/ds/UpdateMemberRoleDS.vue'
import UpdateMemberRoleHT from '@/views/member/ht/UpdateMemberRoleHT.vue'
import StatisticDS from '@/views/statistic/StatisticDS.vue'
import StatisticHT from '@/views/statistic/StatisticHT.vue'
import LoginView from '@/views/auth/LoginView.vue'
import MainLayout from '@/components/common/MainLayout.vue'
import { getLS } from '@/tools/localStorage.tool'
import ListMajor from '@/views/major/ListMajor.vue'
import ListDeanery from '@/views/deanery/ListDeanery.vue'
import ListReligion from '@/views/religion/ListReligion.vue'
import ListRank from '@/views/rank/ListRank.vue'
import ListResponsibility from '@/views/responsibility/ListResponsibility.vue'
import CreateMajor from '@/views/major/CreateMajor.vue'
import DetailMajor from '@/views/major/DetailMajor.vue'
import UpdateMajor from '@/views/major/UpdateMajor.vue'
import CreateDeanery from '@/views/deanery/CreateDeanery.vue'
import DetailDeanery from '@/views/deanery/DetailDeanery.vue'
import UpdateDeanery from '@/views/deanery/UpdateDeanery.vue'
import CreateReligion from '@/views/religion/CreateReligion.vue'
import UpdateReligion from '@/views/religion/UpdateReligion.vue'
import DetailReligion from '@/views/religion/DetailReligion.vue'
import CreateRank from '@/views/rank/CreateRank.vue'
import DetailRank from '@/views/rank/DetailRank.vue'
import UpdateRank from '@/views/rank/UpdateRank.vue'
import ListActivity from '@/views/activity/ListActivity.vue'
import CreateActivity from '@/views/activity/CreateActivity.vue'
import DetailActivity from '@/views/activity/DetailActivity.vue'
import UpdateActivity from '@/views/activity/UpdateActivity.vue'
import CreateAttendance from '@/views/attendance/CreateAttendance.vue'
import ListUser from '@/views/user/ListUser.vue'
import CreateUser from '@/views/user/CreateUser.vue'
import DetailUser from '@/views/user/DetailUser.vue'
import UpdateUser from '@/views/user/UpdateUser.vue'

const routes = [
    {
        path: ROUTER_PATHS.LOGIN,
        name: 'login',
        component: LoginView,
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: ROUTER_PATHS.HOME, name: 'home', component: Home },

            { path: ROUTER_PATHS.MEMBERS_DS, name: 'membersRoleDS', component: ListMemberRoleDS },
            { path: ROUTER_PATHS.ADD_MEMBER_DS, name: 'addMemberDS', component: CreateMemberRoleDS },
            { path: ROUTER_PATHS.DETAIL_MEMBER_DS, name: 'detailMemberDS', component: DetailMemberRoleDS },
            { path: ROUTER_PATHS.UPDATE_MEMBER_DS, name: 'updateMemberDS', component: UpdateMemberRoleDS },

            { path: ROUTER_PATHS.MEMBERS_HT, name: 'membersRoleHT', component: ListMemberRoleHT },
            { path: ROUTER_PATHS.ADD_MEMBER_HT, name: 'addMemberHT', component: CreateMemberRoleHT },
            { path: ROUTER_PATHS.DETAIL_MEMBER_HT, name: 'detailMemberHT', component: DetailMemberRoleHT },
            { path: ROUTER_PATHS.UPDATE_MEMBER_HT, name: 'updateMemberHT', component: UpdateMemberRoleHT },

            { path: ROUTER_PATHS.STATISTICS_DS, name: 'statictisMemberDS', component: StatisticDS },
            { path: ROUTER_PATHS.STATISTICS_HT, name: 'statictisMemberHT', component: StatisticHT },

            { path: ROUTER_PATHS.LIST_MAJOR, name: 'listMajor', component: ListMajor },
            { path: ROUTER_PATHS.ADD_MAJOR, name: 'addMajor', component: CreateMajor },
            { path: ROUTER_PATHS.DETAIL_MAJOR, name: 'detailMajor', component: DetailMajor },
            { path: ROUTER_PATHS.UPDATE_MAJOR, name: 'updateMajor', component: UpdateMajor },

            { path: ROUTER_PATHS.LIST_DEANERY, name: 'listDeanery', component: ListDeanery },
            { path: ROUTER_PATHS.ADD_DEANERY, name: 'addDeanery', component: CreateDeanery },
            { path: ROUTER_PATHS.DETAIL_DEANERY, name: 'detailDeanery', component: DetailDeanery },
            { path: ROUTER_PATHS.UPDATE_DEANERY, name: 'updateDeanery', component: UpdateDeanery },

            { path: ROUTER_PATHS.LIST_RELIGION, name: 'listReligion', component: ListReligion },
            { path: ROUTER_PATHS.ADD_RELIGION, name: 'createReligion', component: CreateReligion },
            { path: ROUTER_PATHS.DETAIL_RELIGION, name: 'detailReligion', component: DetailReligion },
            { path: ROUTER_PATHS.UPDATE_RELIGION, name: 'updateReligion', component: UpdateReligion },

            { path: ROUTER_PATHS.LIST_RANK, name: 'listRank', component: ListRank },
            { path: ROUTER_PATHS.ADD_RANK, name: 'createRank', component: CreateRank },
            { path: ROUTER_PATHS.DETAIL_RANK, name: 'detailRank', component: DetailRank },
            { path: ROUTER_PATHS.UPDATE_RANK, name: 'updateRank', component: UpdateRank },

            { path: ROUTER_PATHS.LIST_ACTIVITY, name: 'listActivity', component: ListActivity },
            { path: ROUTER_PATHS.ADD_ACTIVITY, name: 'addActivity', component: CreateActivity },
            { path: ROUTER_PATHS.DETAIL_ACTIVITY, name: 'detailActivity', component: DetailActivity },
            { path: ROUTER_PATHS.UPDATE_ACTIVITY, name: 'updateActivity', component: UpdateActivity },

            { path: ROUTER_PATHS.LIST_USER, name: 'listUser', component: ListUser },
            { path: ROUTER_PATHS.ADD_USER, name: 'addUser', component: CreateUser },
            { path: ROUTER_PATHS.DETAIL_USER, name: 'detailUser', component: DetailUser },
            { path: ROUTER_PATHS.UPDATE_USER, name: 'updateUser', component: UpdateUser },

            { path: ROUTER_PATHS.ADD_ATTENDANCE, name: 'addAttendance', component: CreateAttendance },

            { path: ROUTER_PATHS.LIST_RESPONSIBILITY, name: 'ListResponsibility', component: ListResponsibility },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

import { useAuth } from "@/composables/useAuth";

router.beforeEach((to, from, next) => {
    const token = getLS("accessToken");
    if (!token && to.name !== "login") {
        return next({ name: "login" });
    }
    const { currentMember } = useAuth();
    if (to.meta?.roles) {
        const requiredRoles = to.meta.roles as string[];
        const userRole = currentMember.value?.role?.name;
        if (!requiredRoles.includes(userRole || "")) {
            return next({ name: "home" });
        }
    }

    next();
});

export default router
