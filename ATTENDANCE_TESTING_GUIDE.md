# Testing Guide for Attendance Feature Fix

## Pre-requisites

1. Backend server running on configured port
2. Frontend development server running
3. Valid user account with authentication
4. At least one activity created in a specific deanery
5. Multiple members in that deanery with different roles

## Test Scenarios

### Test 1: Verify TypeScript Compilation
**Objective:** Ensure no TypeScript errors after the fix

**Steps:**
1. Navigate to `scout_fe` directory
2. Run: `npm run build` or check IDE TypeScript errors
3. Verify no errors related to `member.role`

**Expected Result:** ✅ Clean build with no TypeScript errors

---

### Test 2: Display Members with Roles
**Objective:** Verify members display correctly with multiple roles

**Steps:**
1. Login to the application
2. Navigate to Activities page
3. Select an activity from a specific deanery
4. Click "Điểm danh" (Mark Attendance) button
5. Observe the member table

**Expected Results:**
- ✅ All members from the activity's deanery are displayed
- ✅ "Vai trò" (Role) column shows:
  - For members with single role: "HT" or "DS"
  - For members with multiple roles: "HT, DS" (comma-separated)
  - For members with no roles: "N/A"
- ✅ No JavaScript console errors
- ✅ No "undefined" or "[object Object]" in the role column

---

### Test 3: Authentication on Member Routes
**Objective:** Verify authentication is required for member endpoints

**Steps:**
1. Open browser developer tools → Network tab
2. Navigate to attendance marking page
3. Observe the API call to `/api/v1/members/deanery/{deaneryId}`
4. Check request headers for Authorization token

**Expected Results:**
- ✅ Request includes `Authorization: Bearer {token}` header
- ✅ Request returns 200 OK (with valid token)
- ✅ Request returns 401 Unauthorized (without token)

---

### Test 4: Get Members by Deanery
**Objective:** Verify only members from the same deanery are fetched

**Setup:**
- Create Activity A in Deanery 1
- Create Activity B in Deanery 2
- Add members to both deaneries

**Steps:**
1. Mark attendance for Activity A
2. Note the members displayed
3. Mark attendance for Activity B
4. Compare the member lists

**Expected Results:**
- ✅ Activity A shows only members from Deanery 1
- ✅ Activity B shows only members from Deanery 2
- ✅ ADMIN users are excluded from both lists
- ✅ No duplicate members

---

### Test 5: Create/Update Attendance
**Objective:** Verify attendance can be marked and saved

**Steps:**
1. Navigate to attendance marking for an activity
2. Check some members as present
3. Add notes to some members
4. Click "Lưu điểm danh" (Save Attendance)
5. Navigate back to the same activity
6. Verify the saved data

**Expected Results:**
- ✅ Success message displayed after saving
- ✅ Redirected to activities page
- ✅ When reopening, checkboxes are pre-filled with saved data
- ✅ Notes are preserved
- ✅ Database has correct attendance records

---

### Test 6: Update Existing Attendance
**Objective:** Verify attendance can be updated (delete old, create new)

**Steps:**
1. Mark attendance for an activity (some members present)
2. Save the attendance
3. Reopen the same activity's attendance
4. Change some checkboxes (present → absent, absent → present)
5. Modify notes
6. Save again
7. Reopen to verify

**Expected Results:**
- ✅ Old attendance records are replaced (not duplicated)
- ✅ New changes are correctly saved
- ✅ No orphaned records in database
- ✅ Transaction ensures data consistency

---

## API Testing (Optional)

### Test with Postman/cURL

#### 1. Get Members by Deanery
```bash
curl -X GET http://localhost:3000/api/v1/members/deanery/1 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Expected Response:**
```json
{
  "code": 200,
  "message": "Members retrieved successfully",
  "data": [
    {
      "memberId": 1,
      "name": "Nguyễn Văn A",
      "email": "member1@example.com",
      "birthday": "2000-01-01",
      "roles": [
        {
          "roleId": 2,
          "name": "HT"
        },
        {
          "roleId": 3,
          "name": "DS"
        }
      ],
      "deanery": {
        "deaneryId": 1,
        "name": "Châu An-rê"
      }
      // ... other fields
    }
    // ... more members
  ]
}
```

---

## Database Verification

### Check Member Roles
```sql
SELECT 
    m.member_id,
    m.name,
    r.name as role_name
FROM member m
JOIN member_role mr ON m.member_id = mr.member_id
JOIN role r ON mr.role_id = r.role_id
WHERE m.deanery_id = 1
AND m.delete_flag = false
ORDER BY m.name;
```

**Expected:** All members with their roles (can be multiple per member)

### Check Attendance Records
```sql
SELECT 
    a.attendance_id,
    m.name as member_name,
    act.description as activity,
    a.present,
    a.note
FROM attendance a
JOIN member m ON a.member_id = m.member_id
JOIN activity act ON a.activity_id = act.activity_id
WHERE act.activity_id = 1
ORDER BY m.name;
```

**Expected:** One record per member for the activity

---

## Common Issues & Solutions

### Issue 1: "role is undefined"
**Cause:** Old code still using `member.role` instead of `member.roles`
**Solution:** Verify line 44 in CreateAttendance.vue uses `member.roles?.map(r => r.name).join(", ")`

### Issue 2: 401 Unauthorized
**Cause:** Missing or expired authentication token
**Solution:** 
- Check if user is logged in
- Verify token is stored in localStorage/cookies
- Check token expiration

### Issue 3: Empty member list
**Cause:** No members in the activity's deanery
**Solution:**
- Verify activity has valid deaneryId
- Add members to that deanery
- Check members are not soft-deleted (delete_flag = false)

### Issue 4: Duplicate attendance records
**Cause:** Transaction not working properly
**Solution:**
- Check database supports transactions (PostgreSQL does)
- Verify Prisma transaction syntax in attendance.service.js
- Check for any errors in console

---

## Performance Checklist

- [ ] Page loads within 2 seconds
- [ ] Member list displays within 1 second after page load
- [ ] No N+1 query issues (check database logs)
- [ ] Proper use of includes in Prisma queries
- [ ] API response size is reasonable (<1MB for typical deanery)

---

## Security Checklist

- [x] All member routes require authentication
- [x] Authorization header checked on every request
- [x] No sensitive data exposed in frontend
- [x] SQL injection prevented (using Prisma)
- [x] XSS prevented (Vue auto-escapes)
- [x] CSRF tokens if needed (depends on setup)

---

## Sign-off

- [ ] All tests passed
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Ready for production

**Tested by:** _______________  
**Date:** _______________  
**Signature:** _______________
