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

                <!-- Team & Note Info -->
                <div v-if="activity.team || activity.note" class="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-100">
                    <div class="flex flex-wrap gap-6 text-sm text-gray-700">
                        <div v-if="activity.team" class="flex items-center gap-2">
                            <span class="font-medium text-gray-500">Đội/Nhóm:</span>
                            <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-medium">{{ activity.team.name }}</span>
                        </div>
                        <div v-if="activity.note" class="flex items-center gap-2">
                            <span class="font-medium text-gray-500">Ghi chú:</span>
                            <span>{{ activity.note }}</span>
                        </div>
                    </div>
                </div>

                <!-- Plan Rows Section -->
                <div v-if="activity.planRows && activity.planRows.length > 0" class="px-6 md:px-8 py-6 bg-white border-t border-gray-100">
                    <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                        📋 Kế hoạch sinh hoạt
                    </h3>
                    <div class="overflow-x-auto rounded-lg border border-gray-200">
                        <table class="min-w-full border-collapse">
                            <thead class="bg-emerald-50">
                                <tr>
                                    <th class="px-3 py-2 text-left text-xs font-semibold text-emerald-800 w-12">STT</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold text-emerald-800 w-28">Thời gian</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold text-emerald-800">Nội dung</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold text-emerald-800 w-32">Phụ trách</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold text-emerald-800 w-32">Vật dụng</th>
                                    <th class="px-3 py-2 text-left text-xs font-semibold text-emerald-800 w-32">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in activity.planRows" :key="row.rowId" class="border-t border-gray-200 hover:bg-gray-50">
                                    <td class="px-3 py-2 text-sm text-center text-gray-500">{{ index + 1 }}</td>
                                    <td class="px-3 py-2 text-sm">{{ row.startTime || '—' }}</td>
                                    <td class="px-3 py-2 text-sm">{{ row.content || '—' }}</td>
                                    <td class="px-3 py-2 text-sm">{{ row.pic || '—' }}</td>
                                    <td class="px-3 py-2 text-sm">{{ row.materials || '—' }}</td>
                                    <td class="px-3 py-2 text-sm">{{ row.notes || '—' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Activity Logs (Journal) Section -->
                <div class="px-6 md:px-8 py-6 bg-white border-t border-gray-100">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Nhật ký hoạt động
                        </h3>
                        <button v-if="canModifyActivity" @click="openLogForm" class="px-3 py-1.5 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Viết nhật ký
                        </button>
                    </div>

                    <!-- Log Form Modal/Inline -->
                    <div v-if="showLogForm" class="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner">
                        <h4 class="font-semibold text-gray-700 mb-3">{{ isEditingLog ? 'Chỉnh sửa nhật ký' : 'Nhật ký mới' }}</h4>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề (Tùy chọn)</label>
                                <input v-model="logForm.title" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" placeholder="Tiêu đề nhật ký...">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                                <div class="bg-white">
                                    <QuillEditor theme="snow" v-model:content="logForm.content" contentType="html" :toolbar="quillOptions.modules.toolbar" placeholder="Nội dung..." />
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh đính kèm</label>
                                <input type="file" ref="logImageInput" multiple accept="image/*" @change="handleLogImageUpload" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"/>
                                
                                <!-- Existing Images (Edit Mode) -->
                                <div v-if="logForm.existingImages.length > 0" class="mt-2 flex flex-wrap gap-2">
                                    <div v-for="img in logForm.existingImages" :key="img.imageId" class="relative w-20 h-20 group">
                                        <img :src="img.imageUrl" class="w-full h-full object-cover rounded-md border border-gray-200">
                                        <button @click="removeExistingImage(img.imageId)" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <!-- New Images Preview -->
                                <div v-if="logImagesPreview.length > 0" class="mt-2 flex flex-wrap gap-2">
                                    <div v-for="(preview, idx) in logImagesPreview" :key="idx" class="relative w-20 h-20 group">
                                        <img :src="preview" class="w-full h-full object-cover rounded-md border border-gray-200">
                                        <button @click="removePreviewImage(idx)" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end gap-2 pt-2">
                                <button @click="cancelLogForm" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Hủy</button>
                                <button @click="submitLogForm" :disabled="isSubmitting" class="px-4 py-2 bg-emerald-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50">
                                    {{ isSubmitting ? 'Đang lưu...' : 'Lưu nhật ký' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Logs List -->
                    <div class="space-y-8">
                        <div v-if="activityLogs.length === 0" class="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p class="text-gray-500">Chưa có nhật ký nào.</p>
                        </div>
                        
                        <article v-for="log in activityLogs" :key="log.logId" class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <!-- Log Header -->
                            <div class="p-4 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <span class="text-emerald-700 font-bold text-xs">{{ log.author?.name?.charAt(0).toUpperCase() || '?' }}</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">{{ log.author?.name }}</p>
                                        <p class="text-xs text-gray-500">{{ formatDate(log.createdAt) }}</p>
                                    </div>
                                </div>
                                <div v-if="canModifyActivity" class="flex gap-2">
                                    <button @click="editLog(log)" class="text-gray-400 hover:text-blue-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button @click="removeLog(log.logId)" class="text-gray-400 hover:text-red-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Log Content -->
                            <div class="p-6">
                                <h4 v-if="log.title" class="text-xl font-bold text-gray-900 mb-3">{{ log.title }}</h4>
                                <div class="prose prose-sm max-w-none text-gray-700 mb-4" v-html="log.content"></div>
                                
                                <!-- Images Grid -->
                                <div v-if="log.images && log.images.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                                    <div v-for="img in log.images" :key="img.imageId" class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                                        <img :src="img.imageUrl" class="object-cover w-full h-full hover:scale-105 transition-transform duration-300">
                                    </div>
                                </div>
                            </div>
                        </article>
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
import { createActivityLog, getActivityLogsByActivity, updateActivityLog, deleteActivityLog, deleteActivityImage } from "@/services/activityLogService";
import { createComment, deleteComment } from "@/services/commentService";
import { formatDate } from "@/utils/dateFormat";
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const { showToast } = useToast();
const { canModifyActivity, canAccessAttendance, currentMember } = useAuth();
const route = useRoute();

const activity = ref<ActivityDto | null>(null);
const activityLogs = ref<any[]>([]); // Should be ActivityLogDto[]
const comments = ref<CommentDto[]>([]);
const newComment = ref("");
const replyContent = ref("");
const replyingTo = ref<number | null>(null);
const isSubmitting = ref(false);
const activityId = Number(route.params.activityId);

// Activity Log State
const showLogForm = ref(false);
const isEditingLog = ref(false);
const currentLogId = ref<number | null>(null);
const logForm = ref({
    title: "",
    content: "",
    images: [] as File[],
    existingImages: [] as any[]
});
const logImagesPreview = ref<string[]>([]);
const quillOptions = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            // remove 'image' so uploads are handled by the file input below
            ['link'],
            ['clean']
        ]
    },
    placeholder: 'Viết nội dung nhật ký...',
    theme: 'snow'
};

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



/**
 * Activity Log Methods
 */
const loadActivityLogs = async () => {
    try {
        const res = await getActivityLogsByActivity(activityId);
        if (res.code === 200) {
            activityLogs.value = res.data;
        }
    } catch (error) {
        console.error("Failed to load logs", error);
    }
};

const openLogForm = () => {
    showLogForm.value = true;
    isEditingLog.value = false;
    currentLogId.value = null;
    logForm.value = { title: "", content: "", images: [], existingImages: [] };
    logImagesPreview.value = [];
};

const editLog = (log: any) => {
    showLogForm.value = true;
    isEditingLog.value = true;
    currentLogId.value = log.logId;
    logForm.value = {
        title: log.title || "",
        content: log.content,
        images: [],
        existingImages: log.images || []
    };
    logImagesPreview.value = [];
};

const cancelLogForm = () => {
    showLogForm.value = false;
    logForm.value = { title: "", content: "", images: [], existingImages: [] };
    logImagesPreview.value = [];
};

const handleLogImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        const files = Array.from(input.files);
        logForm.value.images = [...logForm.value.images, ...files];
        
        // Create previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    logImagesPreview.value.push(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        });
    }
};

const removePreviewImage = (index: number) => {
    logForm.value.images.splice(index, 1);
    logImagesPreview.value.splice(index, 1);
};

const removeExistingImage = async (imageId: number) => {
    if(!confirm("Xóa ảnh này?")) return;
    try {
        await deleteActivityImage(imageId);
        logForm.value.existingImages = logForm.value.existingImages.filter(img => img.imageId !== imageId);
        console.log("Removed existing image:", logForm.value.existingImages);
        // Also refresh logs in background
        await loadActivityLogs();
        showToast("Đã xóa ảnh", "success");
    } catch (error: any) {
        showToast("Lỗi xóa ảnh", "error");
    }
};

const submitLogForm = async () => {
    if (!logForm.value.content) {
        showToast("Vui lòng nhập nội dung", "warning");
        return;
    }

    const formData = new FormData();

    // Only send activityId when creating new log, not when updating
    if (!isEditingLog.value) {
        formData.append("activityId", activityId.toString());
    }

    formData.append("title", logForm.value.title);
    formData.append("content", logForm.value.content);
    
    logForm.value.images.forEach(file => {
        formData.append("images", file);
    });

    isSubmitting.value = true;
    try {
        let res;
        if (isEditingLog.value && currentLogId.value) {
            res = await updateActivityLog(currentLogId.value, formData);
        } else {
            res = await createActivityLog(formData);
        }

        if (res.code === 200 || res.code === 201) {
            showToast(isEditingLog.value ? "Đã cập nhật nhật ký" : "Đã thêm nhật ký", "success");
            cancelLogForm();
            await loadActivityLogs();
        }
    } catch (error: any) {
        showToast(error.message || "Lỗi lưu nhật ký", "error");
    } finally {
        isSubmitting.value = false;
    }
};

const removeLog = async (logId: number) => {
    if(!confirm("Bạn chắc chắn muốn xóa nhật ký này?")) return;
    try {
        await deleteActivityLog(logId);
        showToast("Đã xóa nhật ký", "success");
        await loadActivityLogs();
    } catch (error: any) {
        showToast("Lỗi xóa nhật ký", "error");
    }
};

onMounted(async () => {
    await loadActivity();
    await loadActivityLogs();
});
</script>
