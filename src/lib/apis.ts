export const apis = {
  photoApi: 'https://api.slingacademy.com/v1/sample-data/photos',
  jsonApi: 'https://jsonplaceholder.typicode.com/posts'
} as const;

export const authApi = {
  sendOtpLogin: '/auth/send-mobile-otp',
  verifyOtpLogin: '/auth/verify-mobile-otp',
  login: '/auth/login',
  loginWithOtp: '/auth/send-otp-via-mobile',
  loginVerifyOtp: '/auth/verify-otp-and-login',
  register: '/auth/register',
  sendOtpViaEmail: '/auth/send-otp',
  verifyOtp: '/auth/verify-otp',
  resetPassword: '/auth/reset-password',
  getUser: '/user/get-user',
  updateProfileImg: '/user/upload-image-url',
  updateProfile: '/user/update-profile',
  changePassword: '/user/change-password',
  adminChangePassword: '/change-pass/change-password'
} as const;

export const gymApi = {
  // ════════════════════════════║  API OF USERS MASTER ║═════════════════════════════════
  // createUser: '/user/create-user',
  createUser: '/user/create-user-with-image',
  getAllUser: '/user/get-all-user',
  getAllUserMasterList: '/user/get-all-user-mater-list',
  getAllUserByUlb: '/user/get-all-user-by-ulb',
  updateUser: '/user/update-profile',
  deleteUser: '/user/delete-user',
  getUserById: '/user/edit',
  updateUserStatus: '/user/update-user-status',

  sendOtp: '/otp/send-otp',
  verifyEmailOtp: '/otp/verify-otp',

  createOwner: '/guest-member/create-owner',
  getAllOwners: '/member/get-owners',
  getOwner: '/member/get-owner-by-id',
  updateOwner: '/member/update-owner',
  updateOwnerStatus: '/member/update-owner-status',
 


  createMember: '/member/create-member',
  getMember: '/member/get-member',
  updateMember: '/member/update-member',
  getAllMembers: '/member/get-members',
  deleteMember: '/member/update-member-status',
  getDemoMember: '/member/get-all-demo-list',

  // plan master
  getAllActivePlan: '/masters/get-all-active-plans',

  // get all active month
  getAllActiveMonths: '/masters/get-all-active-months',

  // planMapping
  getPlanMappingById: '/plans/get-plan-mapping-by-id',
  getAllPlanMapping: '/plans/get-all-active-plan-mapping',

  // subscription
  createSubscription: '/subscription/create-new-subscription',
  getDueSubscription: '/subscription/get-due-subscription',
  updateSubscription: '/subscription/update-subscription',
  subDeleteById: '/subscription/delete-subscription',
  getAllExpSubscription: '/subscription/get-all-expired-subscriptions',
  getReceiptById: '/subscription/get-receipt',
  getAllReceipt: '/subscription/get-all-receipts',
  updateExpInSubscription: '/subscription/update-exp-in-status',

  // report
  getExpSubBeforeSevenDat: '/report/get-expired-subs-before-seven-day',
  getCount: '/report/get-count-report',
  getPlanExpReport: '/report/get-plan-expiry-report',
  getSubExpReport: '/report/get-subscription-expired-report',
  amountList: '/report/amount-list',
  expSubscriptionList: '/report/get-expired-subs',
  collectionReport: '/report/collection-report',
  getMonthPlanWise: '/report/month-wise-plan-wise-report',
  getAllExpiredSubscription: '/report/get-all-expired-subs-list',

  // masters
  createMonth: '/masters/create-month',
  getAllMonths: '/masters/get-all-months',
  getMonthById: '/masters/get-month',
  updateMonthById: '/masters/update-month',
  updateMonthStatusById: '/masters/update-month-status',
  deleteMonthById: '/masters/delete-month',
  activeMonth: '/masters/get-all-active-months',

  //   // plan

  createPlan: '/masters/create-plan',
  getAllPlans: '/masters/get-all-plans',
  getPlanById: '/masters/get-plan',
  updatePlanById: '/masters/update-plan',
  updatePlanStatusById: '/masters/update-plan-status',
  deletePlanById: '/masters/delete-plan',
  activePlan: '/masters/get-all-active-plans',

  createMappingPlan: '/plans/create-plans',
  getAllMappingPlans: '/plans/get-all-plans',
  updatePlanMappingById: '/plans/update-plan',
  updatePlanMappingStatusById: '/plans/update-plan-status',
  deletePlanMappingById: '/plans/delete-plan',
  activePlanMapping: '/plans/get-all-active-plans',
  getPlanMappingByMonthAndPlanId: '/plans/get-plan-mapping-by-id',
  getAllActivePlanMapping: '/plans/get-all-active-plan-mapping',
  planMappingById: '/plans/get-plan',

  // guest
  paymentReceiptGuest: '/guest/get-receipt',
  getMemberByIdGuest: '/guest/get-member'
} as const;
