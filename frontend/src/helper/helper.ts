export const DOMAIN = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:4000/api/'
  : 'http://localhost:5000/api/';

export const API = {
    LOGIN: "auth/login",
    SIGNUP: "auth/signup",
    PROFILE: "auth/profile",
    USER: "auth/users/",
    CHANGE_PASSWORD: "auth/change-password",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
    GET_ALL_PET: "pets",
    UPLOAD_IMAGE: "upload",
    CHAT: "chat/",
    CHAT_CONVO: "chat/conversations",
    STORE_DETAILS: "pets/store/",
    PAYMENT_CREATE_ORDER: "payment/create-order",
    PAYMENT_VERIFY: "payment/verify",
    GET_ALL_CATEGORY: "category/all",
    GET_CATEGORY_BY_ID: "category",
    GET_ALL_PRODUCT: "product/all",
    GET_PRODUCT_BY_ID: "product",
    GET_ALL_CUSTOMER: "user/all",
    GET_CUSTOMER_BY_ID: "user",
    UPDATE_CUSTOMER_BY_ID: "user/update",
    GET_ALL_ORDER: "order/all",
}

export const ADMIN_API = {
    USERS: "admin/users",
    PETS: "admin/pets",
    CREATE_ADMIN: "admin/create-admin",
}