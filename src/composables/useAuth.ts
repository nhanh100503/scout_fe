// src/composables/useAuth.ts
import { MemberDto } from "@/types/member.type";
import { ref } from "vue";

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
    return { currentMember, setMember, clearMember };
}
