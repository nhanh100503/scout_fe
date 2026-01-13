// src/composables/useAuth.ts
import { MemberDto } from "@/types/member.type";
import { ref } from "vue";

const currentMember = ref<MemberDto | null>(null);

export function useAuth() {
    function setMember(user: MemberDto) {
        currentMember.value = user;
    }
    function clearMember() {
        currentMember.value = null;
    }
    return { currentMember, setMember, clearMember };
}
