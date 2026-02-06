<template>
    <div class="flex flex-col h-full overflow-y-auto bg-gray-50">
        <div class="max-w-4xl mx-auto w-full p-4 md:p-8 flex-1">
            <!-- Journal/Newspaper Style View -->
            <div v-if="activity" class="bg-white shadow-lg rounded-lg overflow-hidden">
                <!-- Header Section -->
                <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 md:px-8 py-6 md:py-8">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <h1 class="text-2xl md:text-4xl font-bold mb-2 leading-tight">
                                {{ activity.description }}
                            </h1>
                            <div class="flex flex-wrap items-center gap-4 text-emerald-100 text-sm">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{{ formatDate(activity.date) }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{{ activity.time }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{{ activity.deanery?.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 text-emerald-50">
                        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                            {{ activity.createdBy?.name?.charAt(0).toUpperCase() || '?' }}
                        </div>
                        <div>
                            <p class="font-medium">{{ activity.createdBy?.name }}</p>
                            <p class="text-xs text-emerald-100">Huynh Trưởng</p>
                        </div>
                    </div>
                </div>

                <!-- Journal Content -->
                <div class="px-6 md:px-8 py-6 md:py-8">
                    <!-- Main Content -->
                    <div class="prose prose-lg max-w-none mb-8">
                        <p class="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                            {{ activity.note || 'Chưa có nội dung chi tiết.' }}
                        </p>
                    </div>

                    <!-- Image Gallery Placeholder (Future Enhancement) -->
                    <div class="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p class="text-gray-500 text-sm">Khu vực ảnh (Sắp ra mắt)</p>
                    </div>

                    <!-- Attendance Stats (if available and user can see) -->
                    <div v-if="canAccessAttendance && activity.attendances && activity.attendances.length > 0" class="mb-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <h3 class="text-lg font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Thống kê tham dự
                        </h3>
                        <p class="text-emerald-700">
                            <span class="font-bold text-2xl">{{ activity.attendances.filter(a => a.present).length }}</span>
                            <span class="text-sm">/ {{ activity.attendances.length }} thành viên đã tham dự</span>
                        </p>
                    </div>
                </div>

                <!-- Comment Section -->
                <div class="border-t border-gray-200 px-6 md:px-8 py-6 md:py-8 bg-gray-50">
                    <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Chia sẻ cảm nhận
                        <span class="text-sm text-gray-500 font-normal">({{ comments.length }})</span>
                    </h3>

                    <!-- Comment Form -->
                    <div class="mb-6">
                        <div class="bg-white rounded-lg border border-gray-300 shadow-sm p-4">
                            <textarea
                                v-model="newComment"
                                placeholder="Chia sẻ cảm nhận của bạn về buổi sinh hoạt này..."
                                class="w-full border-0 focus:ring-0 resize-none text-gray-700"
                                rows="3"
                                @keydown.ctrl.enter="submitComment"
                            ></textarea>
                            <div class="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                                <span class="text-xs text-gray-400">Nhấn Ctrl+Enter để gửi</span>
                                <button
                                    @click="submitComment"
                                    :disabled="!newComment.trim() || isSubmitting"
                                    class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                                >
                                    {{ isSubmitting ? 'Đang gửi...' : 'Gửi bình luận' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Comments List -->
                    <div class="space-y-4">
                        <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                        </div>

                        <!-- Top-level Comments -->
                        <div v-for="comment in comments" :key="comment.commentId" class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                            <div class="flex items-start gap-3">
                                <!-- Avatar -->
                                <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                    <img v-if="comment.member.avatar" :src="comment.member.avatar" :alt="comment.member.name" class="w-full h-full rounded-full object-cover" />
                                    <span v-else class="text-emerald-700 font-semibold">{{ comment.member.name.charAt(0).toUpperCase() }}</span>
                                </div>

                                <!-- Comment Content -->
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 mb-1">
                                        <h4 class="font-semibold text-gray-800">{{ comment.member.name }}</h4>
                                        <span class="text-xs text-gray-400">{{ formatCommentDate(comment.createdAt) }}</span>
                                    </div>
                                    <p class="text-gray-700 whitespace-pre-wrap break-words">{{ comment.content }}</p>

                                    <!-- Comment Actions -->
                                    <div class="mt-2 flex gap-3">
                                        <button @click="startReply(comment.commentId)" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                            </svg>
                                            Trả lời
                                        </button>
                                        <button v-if="currentMember && comment.member.memberId === currentMember.memberId"
                                                @click="deleteCommentHandler(comment.commentId)"
                                                class="text-xs text-red-600 hover:text-red-700 font-medium">
                                            Xóa
                                        </button>
                                    </div>

                                    <!-- Reply Form -->
                                    <div v-if="replyingTo === comment.commentId" class="mt-3 pl-2 border-l-2 border-emerald-200">
                                        <div class="bg-gray-50 rounded-lg border border-gray-200 p-3">
                                            <textarea
                                                v-model="replyContent"
                                                placeholder="Viết phản hồi..."
                                                class="w-full border-0 bg-transparent focus:ring-0 resize-none text-sm text-gray-700"
                                                rows="2"
                                                @keydown.ctrl.enter="submitReply(comment.commentId)"
                                            ></textarea>
                                            <div class="flex justify-end gap-2 mt-2">
                                                <button @click="cancelReply" class="px-3 py-1 text-xs text-gray-600 hover:text-gray-800">
                                                    Hủy
                                                </button>
                                                <button
                                                    @click="submitReply(comment.commentId)"
                                                    :disabled="!replyContent.trim() || isSubmitting"
                                                    class="px-3 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                >
                                                    {{ isSubmitting ? 'Đang gửi...' : 'Gửi' }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Nested Replies -->
                                    <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 space-y-3 pl-4 border-l-2 border-gray-200">
                                        <div v-for="reply in comment.replies" :key="reply.commentId" class="flex items-start gap-2">
                                            <!-- Reply Avatar (smaller) -->
                                            <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                <img v-if="reply.member.avatar" :src="reply.member.avatar" :alt="reply.member.name" class="w-full h-full rounded-full object-cover" />
                                                <span v-else class="text-emerald-700 font-semibold text-xs">{{ reply.member.name.charAt(0).toUpperCase() }}</span>
                                            </div>

                                            <!-- Reply Content -->
                                            <div class="flex-1 min-w-0">
                                                <div class="flex items-center gap-2 mb-1">
                                                    <h5 class="font-semibold text-sm text-gray-800">{{ reply.member.name }}</h5>
                                                    <span class="text-xs text-gray-400">{{ formatCommentDate(reply.createdAt) }}</span>
                                                </div>
                                                <p class="text-sm text-gray-700 whitespace-pre-wrap break-words">{{ reply.content }}</p>

                                                <!-- Reply Actions -->
                                                <div v-if="currentMember && reply.member.memberId === currentMember.memberId" class="mt-1">
                                                    <button @click="deleteCommentHandler(reply.commentId)" class="text-xs text-red-600 hover:text-red-700 font-medium">
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="px-6 md:px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
                    <router-link to="/activities" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm font-medium transition-colors">
                        ← Quay lại danh sách
                    </router-link>
                    <router-link v-if="canModifyActivity" :to="`/activities/update/${activity.activityId}`"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium transition-colors">
                        Sửa sinh hoạt →
                    </router-link>
                </div>
            </div>

            <div v-else class="bg-white shadow-lg rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-red-500 text-lg font-medium">Không tìm thấy sinh hoạt</p>
                <router-link to="/activities" class="inline-block mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                    Quay lại danh sách
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { ApiResponse } from "@/types/api.type";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth";
import type { ActivityDto } from "@/types/activity.type";
import type { CommentDto } from "@/types/comment.type";
import { getActivityById } from "@/services/activityService";
import { createComment, deleteComment } from "@/services/commentService";
import { formatDate } from "@/utils/dateFormat";

const { showToast } = useToast();
const { canModifyActivity, canAccessAttendance, currentMember } = useAuth();
const route = useRoute();

const activity = ref<ActivityDto | null>(null);
const comments = ref<CommentDto[]>([]);
const newComment = ref("");
const replyContent = ref("");
const replyingTo = ref<number | null>(null);
const isSubmitting = ref(false);
const activityId = Number(route.params.activityId);

/**
 * Format comment date to relative time or absolute date
 */
const formatCommentDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Submit a new comment
 */
const submitComment = async () => {
    if (!newComment.value.trim() || isSubmitting.value) return;

    isSubmitting.value = true;
    try {
        const res = await createComment({
            activityId: activityId,
            content: newComment.value.trim()
        });

        if (res.code === 200 || res.code === 201) {
            showToast("Bình luận đã được gửi", "success");
            newComment.value = "";
            // Refresh comments
            await loadActivity();
        }
    } catch (error: any) {
        showToast(error.message || "Không thể gửi bình luận", "error");
    } finally {
        isSubmitting.value = false;
    }
};

/**
 * Start replying to a comment
 */
const startReply = (commentId: number) => {
    replyingTo.value = commentId;
    replyContent.value = "";
};

/**
 * Cancel reply
 */
const cancelReply = () => {
    replyingTo.value = null;
    replyContent.value = "";
};

/**
 * Submit a reply to a comment
 */
const submitReply = async (parentCommentId: number) => {
    if (!replyContent.value.trim() || isSubmitting.value) return;

    isSubmitting.value = true;
    try {
        const res = await createComment({
            activityId: activityId,
            content: replyContent.value.trim(),
            parentCommentId: parentCommentId
        });

        if (res.code === 200 || res.code === 201) {
            showToast("Phản hồi đã được gửi", "success");
            replyContent.value = "";
            replyingTo.value = null;
            // Refresh comments
            await loadActivity();
        }
    } catch (error: any) {
        showToast(error.message || "Không thể gửi phản hồi", "error");
    } finally {
        isSubmitting.value = false;
    }
};

/**
 * Delete a comment
 */
const deleteCommentHandler = async (commentId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;

    try {
        const res = await deleteComment(commentId);
        if (res.code === 200) {
            showToast("Bình luận đã được xóa", "success");
            // Refresh comments
            await loadActivity();
        }
    } catch (error: any) {
        showToast(error.message || "Không thể xóa bình luận", "error");
    }
};

/**
 * Load activity with comments
 */
const loadActivity = async () => {
    try {
        const res: ApiResponse<ActivityDto> = await getActivityById(activityId);
        if (res.code === 200) {
            activity.value = res.data;
            comments.value = res.data.comments || [];
        }
    } catch (error: any) {
        showToast(error.message || "Không thể tải thông tin sinh hoạt", "error");
    }
};

onMounted(async () => {
    await loadActivity();
});
</script>
