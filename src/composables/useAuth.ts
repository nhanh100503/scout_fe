// src/composables/useAuth.ts
import { MemberDto } from "@/types/member.type";
import { ref, computed } from "vue";

const currentMember = ref<MemberDto | null>(null);

export function useAuth() {
    function setMember(user: MemberDto) {
        console.log('useAuth.setMember called with:', user);
        console.log('Setting roles:', user.roles);
        currentMember.value = user;
        console.log('currentMember.value after set:', currentMember.value);
    }

    function clearMember() {
        currentMember.value = null;
    }

    /**
     * Check if user can modify activities (create, update, delete)
     * DS users have read-only access
     * Note: Members always have at least 2 roles (USER + DS/HT/DT/ADMIN)
     */
    const canModifyActivity = computed(() => {
        const userRoles = currentMember.value?.roles?.map(r => r.name) || [];

        // No roles = no permission
        if (userRoles.length === 0) {
            return false;
        }

        // If user has DS role, they cannot modify activities
        if (userRoles.includes('DS')) {
            return false;
        }

        // All other roles (ADMIN, HT, DT) can modify
        return true;
    });

    /**
     * Check if user has any of the specified roles
     * @param requiredRoles - Array of role names to check
     */
    function hasAnyRole(requiredRoles: string[]): boolean {
        const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
        return userRoles.some(role => requiredRoles.includes(role));
    }

    /**
     * Check if user has DS role (for UI messaging)
     */
    const isDSOnly = computed(() => {
        const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
        return userRoles.includes('DS');
    });

    return {
        currentMember,
        setMember,
        clearMember,
        canModifyActivity,
        hasAnyRole,
        isDSOnly
    };
}
