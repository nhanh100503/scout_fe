<template>
  <div v-if="toast" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded shadow-lg text-white"
    :class="toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'">
    {{ toast.message }}
  </div>
  <ForbiddenPopup />
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { getCurrentMember } from "@/services/authService";
import { getLS, removeLS } from "./tools/localStorage.tool";
import ForbiddenPopup from "@/components/ForbiddenPopup.vue";
import { useToast } from "@/composables/useToast";
import router from "./routers";

const { setMember } = useAuth();
const { toast, showToast } = useToast();

onMounted(async () => {
  const token = getLS("accessToken");
  if (token) {
    try {
      const userRes = await getCurrentMember();
      console.log("Current Member Response:", userRes);
      if (userRes.data) {
        console.log("Setting member with roles:", userRes.data.roles);
        setMember(userRes.data);
      }
    } catch (e) {
      removeLS("accessToken");
      showToast("Phiên đăng nhập đã hết hạn", "error");
      router.push("/login");
    }
  }
});
</script>
