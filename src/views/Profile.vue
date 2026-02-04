<template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 px-4">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Hồ Sơ Cá Nhân</h1>
                <p class="text-gray-600">Quản lý thông tin và ảnh đại diện của bạn</p>
            </div>

            <!-- Main Card -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <!-- Cover Background -->
                <div class="h-32 bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600"></div>

                <!-- Avatar Section -->
                <div class="relative px-6 pb-6">
                    <div class="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
                        <div class="flex flex-col md:flex-row md:items-end gap-4">
                            <!-- Avatar with Upload -->
                            <div class="relative group">
                                <div class="relative">
                                    <img 
                                        :src="avatarPreview || currentMember?.avatar || defaultAvatar" 
                                        alt="avatar"
                                        class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                                    />
                                    <!-- Upload Overlay -->
                                    <label 
                                        for="avatar-upload"
                                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <div class="text-center text-white">
                                            <svg class="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span class="text-xs font-medium">Đổi ảnh</span>
                                        </div>
                                    </label>
                                    <input 
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                        class="hidden"
                                        @change="handleFileSelect"
                                        :disabled="isUploading"
                                    />
                                    <!-- Loading Spinner -->
                                    <div 
                                        v-if="isUploading"
                                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
                                    >
                                        <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <!-- Upload Button (Mobile) -->
                                <button
                                    v-if="selectedFile && !isUploading"
                                    @click="handleUpload"
                                    class="mt-2 w-full md:hidden px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                >
                                    Tải lên
                                </button>
                            </div>

                            <!-- User Info -->
                            <div class="mb-4 md:mb-0">
                                <h2 class="text-2xl font-bold text-gray-800">{{ currentMember?.name }}</h2>
                                <div v-if="currentMember?.roles && currentMember.roles.length > 0" class="flex flex-wrap gap-2 mt-2">
                                    <span 
                                        v-for="role in currentMember.roles" 
                                        :key="role.roleId"
                                        class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
                                    >
                                        {{ role.description }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-500 mt-2">ID: {{ currentMember?.memberId }}</p>
                            </div>
                        </div>

                        <!-- Upload Button (Desktop) -->
                        <button
                            v-if="selectedFile && !isUploading"
                            @click="handleUpload"
                            class="hidden md:block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                            <span class="flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Tải lên ảnh
                            </span>
                        </button>
                    </div>

                    <!-- Error Message -->
                    <div 
                        v-if="errorMessage"
                        class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                    >
                        <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                        <div>
                            <p class="text-red-800 font-medium">Lỗi</p>
                            <p class="text-red-600 text-sm">{{ errorMessage }}</p>
                        </div>
                    </div>

                    <!-- Success Message -->
                    <div 
                        v-if="successMessage"
                        class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3"
                    >
                        <svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <div>
                            <p class="text-emerald-800 font-medium">Thành công</p>
                            <p class="text-emerald-600 text-sm">{{ successMessage }}</p>
                        </div>
                    </div>

                    <!-- Info Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Personal Information -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Thông tin cá nhân
                            </h3>
                            
                            <InfoItem label="Email" :value="currentMember?.email" icon="mail" />
                            <InfoItem label="Số điện thoại" :value="currentMember?.phone" icon="phone" />
                            <InfoItem label="Ngày sinh" :value="formatDate(currentMember?.birthday)" icon="calendar" />
                            <InfoItem label="Giới tính" :value="currentMember?.gender?.name" icon="user" />
                            <InfoItem label="CMND/CCCD" :value="currentMember?.identify" icon="card" />
                            <InfoItem label="Nơi sinh" :value="currentMember?.placeOfBirth" icon="location" />
                            <InfoItem label="Địa chỉ" :value="currentMember?.address" icon="home" />
                            <InfoItem label="Nghề nghiệp" :value="currentMember?.career" icon="briefcase" />
                        </div>

                        <!-- Scout Information -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Thông tin Huynh trưởng
                            </h3>
                            
                            <InfoItem label="Cấp bậc" :value="currentMember?.rank?.name" icon="star" />
                            <InfoItem label="Tôn giáo" :value="currentMember?.religion?.name" icon="book" />
                            <InfoItem label="Chức vụ" :value="currentMember?.responsibility?.name" icon="shield" />
                            <InfoItem label="Nhiệm vụ khác" :value="currentMember?.otherResponsibility" icon="clipboard" />
                            <InfoItem label="Năm bắt đầu" :value="currentMember?.startYear" icon="calendar" />
                            <InfoItem label="Năm tuyên hứa" :value="currentMember?.pledgeYear" icon="calendar" />
                            <InfoItem label="Giáo xứ" :value="currentMember?.parish" icon="church" />
                            <InfoItem label="Liên đoàn" :value="currentMember?.federation" icon="users" />
                            <InfoItem label="Đội" :value="currentMember?.team" icon="flag" />
                            <InfoItem label="Hạt" :value="currentMember?.deanery?.name" icon="map" />
                        </div>
                    </div>

                    <!-- Majors Section -->
                    <div v-if="currentMember?.majors && currentMember.majors.length > 0" class="mt-6 pt-6 border-t border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Ngành học
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <span 
                                v-for="major in currentMember.majors" 
                                :key="major.majorId"
                                class="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                            >
                                {{ major.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { uploadAvatar } from '@/services/memberService';
import defaultAvatarImg from '@/assets/avatar.png';

const { currentMember, setMember } = useAuth();

// Avatar upload states
const selectedFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(null);
const isUploading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const defaultAvatar = defaultAvatarImg;


// File validation
const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
        return 'Chỉ chấp nhận file ảnh định dạng: JPG, JPEG, PNG, GIF, WEBP';
    }

    if (file.size > maxSize) {
        return 'Kích thước file không được vượt quá 5MB';
    }

    return null;
};

// Handle file selection
const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    // Clear previous messages
    errorMessage.value = '';
    successMessage.value = '';

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
        errorMessage.value = validationError;
        selectedFile.value = null;
        avatarPreview.value = null;
        return;
    }

    // Set selected file and preview
    selectedFile.value = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
};

// Handle upload
const handleUpload = async () => {
    if (!selectedFile.value || !currentMember.value) return;

    isUploading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const response = await uploadAvatar(currentMember.value.memberId, selectedFile.value);
        
        if (response.code === 200 && response.data) {
            // Update current member with new avatar
            setMember(response.data);
            successMessage.value = 'Cập nhật ảnh đại diện thành công!';
            
            // Clear selection
            selectedFile.value = null;
            avatarPreview.value = null;
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                successMessage.value = '';
            }, 3000);
        } else {
            errorMessage.value = response.message || 'Có lỗi xảy ra khi tải ảnh lên';
        }
    } catch (error: any) {
        console.error('Upload error:', error);
        errorMessage.value = error.response?.data?.message || 'Không thể tải ảnh lên. Vui lòng thử lại.';
    } finally {
        isUploading.value = false;
    }
};

// Format date
const formatDate = (dateString?: string | null): string => {
    if (!dateString) return 'Chưa cập nhật';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    } catch {
        return dateString;
    }
};
</script>

<script lang="ts">
import { defineComponent } from 'vue';

// InfoItem Component
const InfoItem = defineComponent({
    name: 'InfoItem',
    props: {
        label: { type: String, required: true },
        value: { type: String, default: null },
        icon: { type: String, default: 'info' }
    },
    template: `
        <div class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="mt-0.5">
                <svg v-if="icon === 'mail'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="icon === 'phone'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <svg v-else-if="icon === 'calendar'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="icon === 'user'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <svg v-else-if="icon === 'card'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <svg v-else-if="icon === 'location'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else-if="icon === 'home'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <svg v-else-if="icon === 'briefcase'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="icon === 'star'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <svg v-else-if="icon === 'book'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <svg v-else-if="icon === 'shield'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <svg v-else-if="icon === 'clipboard'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <svg v-else-if="icon === 'church'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <svg v-else-if="icon === 'users'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <svg v-else-if="icon === 'flag'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <svg v-else-if="icon === 'map'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-500 mb-0.5">{{ label }}</p>
                <p class="text-sm font-medium text-gray-800 break-words">{{ value || 'Chưa cập nhật' }}</p>
            </div>
        </div>
    `
});

export default {
    components: {
        InfoItem
    }
};
</script>
