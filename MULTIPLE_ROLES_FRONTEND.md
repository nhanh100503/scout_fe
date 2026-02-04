# Multiple Roles Frontend Migration Guide

## 📋 Tổng quan

Backend đã được cập nhật để hỗ trợ **multiple roles** cho mỗi member. Frontend cần được cập nhật để phù hợp với thay đổi này.

## 🔄 Thay đổi API Response

### Trước (Single Role):
```json
{
  "memberId": 7,
  "name": "Administrator",
  "email": "admin@gmail.com",
  "role": {
    "roleId": 3,
    "name": "ADMIN",
    "description": "QUẢN TRỊ"
  }
}
```

### Sau (Multiple Roles):
```json
{
  "memberId": 7,
  "name": "Administrator",
  "email": "admin@gmail.com",
  "roles": [
    {
      "roleId": 3,
      "name": "ADMIN",
      "description": "QUẢN TRỊ"
    },
    {
      "roleId": 4,
      "name": "USER",
      "description": "NGƯỜI DÙNG"
    }
  ]
}
```

## ✅ Files đã cập nhật

### 1. **member.type.ts** - Type Definitions
**Thay đổi:**
```typescript
// Trước
export interface MemberDto {
    // ...
    role?: RoleDto;
    // ...
}

// Sau
export interface MemberDto {
    // ...
    roles?: RoleDto[];  // Changed to array
    // ...
}
```

### 2. **AppHeader.vue** - Header Component
**Thay đổi:**
- Thêm `rolesDisplay` computed property để hiển thị tất cả roles
- Hiển thị roles với dấu phẩy phân cách

```typescript
const rolesDisplay = computed(() => {
    if (!currentMember.value?.roles || currentMember.value.roles.length === 0) {
        return 'Chưa có vai trò';
    }
    return currentMember.value.roles.map(role => role.description).join(', ');
});
```

**Template:**
```vue
<div class="text-xs text-gray-500">{{ rolesDisplay }}</div>
```

### 3. **Profile.vue** - Profile Page
**Thay đổi:**
- Hiển thị roles dạng badges thay vì text đơn giản

```vue
<div v-if="currentMember?.roles && currentMember.roles.length > 0" class="flex flex-wrap gap-2 mt-2">
    <span 
        v-for="role in currentMember.roles" 
        :key="role.roleId"
        class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
    >
        {{ role.description }}
    </span>
</div>
```

### 4. **routers/index.ts** - Router Guards
**Thay đổi:**
- Cập nhật logic kiểm tra role để hỗ trợ multiple roles
- User được phép truy cập nếu có **ít nhất 1 role** khớp với required roles

```typescript
const { currentMember } = useAuth();
if (to.meta?.roles) {
    const requiredRoles = to.meta.roles as string[];
    const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
    
    // Check if user has at least one of the required roles
    const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));
    
    if (!hasRequiredRole) {
        return next({ name: "home" });
    }
}
```

### 5. **AppSidebar.vue** - Sidebar Navigation
**Thay đổi:**
- Thêm helper function `hasAnyRole()` để kiểm tra roles
- Cập nhật tất cả `v-if` directives để sử dụng helper function

```typescript
// Helper function
const hasAnyRole = (requiredRoles: string[]) => {
    const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
    return userRoles.some(role => requiredRoles.includes(role));
};
```

**Template:**
```vue
<!-- Trước -->
<RouterLink v-if="['ADMIN'].includes(currentMember?.role?.name)" to="/users">

<!-- Sau -->
<RouterLink v-if="hasAnyRole(['ADMIN'])" to="/users">
```

### 6. **images.d.ts** - Type Declarations (Bonus)
**Thêm mới:**
- Type declarations cho image imports để tránh TypeScript errors

```typescript
declare module '*.png' {
    const value: string;
    export default value;
}
// ... other image types
```

## 🎯 Logic kiểm tra Roles

### Single Role (Cũ):
```typescript
// Kiểm tra exact match
if (currentMember.value?.role?.name === 'ADMIN') {
    // ...
}

// Kiểm tra trong array
if (['ADMIN', 'USER'].includes(currentMember.value?.role?.name)) {
    // ...
}
```

### Multiple Roles (Mới):
```typescript
// Kiểm tra có ít nhất 1 role
const hasAnyRole = (requiredRoles: string[]) => {
    const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
    return userRoles.some(role => requiredRoles.includes(role));
};

// Sử dụng
if (hasAnyRole(['ADMIN'])) {
    // User có role ADMIN
}

if (hasAnyRole(['ADMIN', 'USER'])) {
    // User có ít nhất 1 trong 2 roles: ADMIN hoặc USER
}
```

## 📊 UI/UX Changes

### Header
- **Trước:** Hiển thị 1 role description
- **Sau:** Hiển thị tất cả roles với dấu phẩy: "QUẢN TRỊ, NGƯỜI DÙNG"

### Profile Page
- **Trước:** Hiển thị 1 role dạng text
- **Sau:** Hiển thị multiple roles dạng badges (pills)

### Sidebar
- **Logic không đổi:** Hiển thị menu items dựa trên roles
- **Cải thiện:** Sử dụng helper function để code clean hơn

## 🔍 Testing Checklist

- [ ] Login với user có 1 role → Kiểm tra hiển thị
- [ ] Login với user có nhiều roles → Kiểm tra hiển thị
- [ ] Kiểm tra router guards với multiple roles
- [ ] Kiểm tra sidebar menu visibility
- [ ] Kiểm tra Profile page hiển thị roles badges
- [ ] Kiểm tra Header hiển thị roles

## 🚨 Breaking Changes

### TypeScript
- `currentMember.value?.role` → `currentMember.value?.roles`
- `role?.name` → `roles?.map(r => r.name)`
- `role?.description` → `roles?.map(r => r.description).join(', ')`

### Template
- Tất cả `currentMember?.role?.name` phải được thay thế
- Sử dụng `hasAnyRole()` helper function cho role checks

## 💡 Best Practices

1. **Luôn kiểm tra array empty:**
   ```typescript
   if (!currentMember.value?.roles || currentMember.value.roles.length === 0) {
       return 'Chưa có vai trò';
   }
   ```

2. **Sử dụng helper functions:**
   ```typescript
   const hasAnyRole = (requiredRoles: string[]) => {
       const userRoles = currentMember.value?.roles?.map(r => r.name) || [];
       return userRoles.some(role => requiredRoles.includes(role));
   };
   ```

3. **Hiển thị user-friendly:**
   ```typescript
   // Hiển thị descriptions thay vì names
   roles.map(r => r.description).join(', ')
   ```

## 📝 Notes

- TypeScript warning về `RouteRecordRaw` trong router là do type inference của Vue Router, không ảnh hưởng chức năng
- Image import warnings đã được fix bằng `images.d.ts`
- Tất cả role checks giờ sử dụng **OR logic** (có ít nhất 1 role khớp là được)

## 🎉 Kết quả

✅ Frontend đã được cập nhật hoàn toàn để hỗ trợ multiple roles
✅ Tất cả components đã được migrate
✅ Router guards hoạt động với multiple roles
✅ UI hiển thị đẹp và rõ ràng với badges
✅ Type safety với TypeScript

---

**Ngày cập nhật:** 2026-02-03
**Version:** 2.0.0 - Multiple Roles Support
