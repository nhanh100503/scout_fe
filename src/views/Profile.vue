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
                        <div class="space-y-1">
                            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Thông tin cá nhân
                            </h3>
                            
                            <div v-for="item in personalInfo" :key="item.label" class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span class="text-lg mt-0.5">{{ item.icon }}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs text-gray-500 mb-0.5">{{ item.label }}</p>
                                    <p class="text-sm font-medium text-gray-800 break-words">{{ item.value || 'Chưa cập nhật' }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Scout Information -->
                        <div class="space-y-1">
                            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Thông tin Hướng đạo
                            </h3>
                            
                            <div v-for="item in scoutInfo" :key="item.label" class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span class="text-lg mt-0.5">{{ item.icon }}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs text-gray-500 mb-0.5">{{ item.label }}</p>
                                    <p class="text-sm font-medium text-gray-800 break-words">{{ item.value || 'Chưa cập nhật' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Majors Section -->
                    <div v-if="currentMember?.majors && currentMember.majors.length > 0" class="mt-6 pt-6 border-t border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Ngành
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
import { ref, computed } from 'vue';
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

// Helper to safely get name from a field that could be string or object
function getName(field: any): string | undefined {
    if (!field) return undefined;
    if (typeof field === 'string') return field;
    return field.name;
}

// Computed info arrays for v-for rendering
const personalInfo = computed(() => {
    const m = currentMember.value;
    if (!m) return [];
    return [
        { label: 'Email', value: m.email, icon: '📧' },
        { label: 'Số điện thoại', value: m.phone, icon: '📱' },
        { label: 'Ngày sinh', value: formatDate(m.birthday), icon: '🎂' },
        { label: 'Giới tính', value: m.gender?.name, icon: '👤' },
        { label: 'CMND/CCCD', value: m.identify, icon: '🪪' },
        { label: 'Nơi sinh', value: m.placeOfBirth, icon: '📍' },
        { label: 'Địa chỉ', value: m.address, icon: '🏠' },
        { label: 'Nghề nghiệp', value: m.career, icon: '💼' },
        { label: 'Tôn giáo', value: m.religion?.name, icon: '📖' },
    ];
});

const scoutInfo = computed(() => {
    const m = currentMember.value;
    if (!m) return [];
    return [
        { label: 'Cấp bậc', value: m.rank?.name, icon: '⭐' },
        { label: 'Chức vụ', value: m.responsibility?.name, icon: '🛡️' },
        { label: 'Nhiệm vụ khác', value: m.otherResponsibility, icon: '📋' },
        { label: 'Năm bắt đầu', value: m.startYear, icon: '📅' },
        { label: 'Năm tuyên hứa', value: m.pledgeYear, icon: '🤝' },
        { label: 'Hạt', value: m.deanery?.name, icon: '🗺️' },
        { label: 'Giáo xứ', value: getName(m.parish), icon: '⛪' },
        { label: 'Liên đoàn', value: getName(m.federation), icon: '👥' },
        { label: 'Đội/Nhóm', value: getName(m.team), icon: '🚩' },
    ];
});

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

    errorMessage.value = '';
    successMessage.value = '';

    const validationError = validateFile(file);
    if (validationError) {
        errorMessage.value = validationError;
        selectedFile.value = null;
        avatarPreview.value = null;
        return;
    }

    selectedFile.value = file;
    
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
            setMember(response.data);
            successMessage.value = 'Cập nhật ảnh đại diện thành công!';
            
            selectedFile.value = null;
            avatarPreview.value = null;
            
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
const formatDate = (dateString?: string | null): string | undefined => {
    if (!dateString) return undefined;
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    } catch {
        return dateString;
    }
};
</script>
