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
    CREATE_CATEGORY: "/create-category",
    GET_ALL_CATEGORY: "/get-all-category",
    GET_CATEGORY_BY_ID: "/get-category-by-id/",
    UPDATE_CATEGORY_BY_ID: "/update-category-by-id/",
    DELETE_CATEGORY_BY_ID: "/delete-category-by-id/",
}

export const ADMIN_API = {
    USERS: "admin/users",
    PETS: "admin/pets",
    CREATE_ADMIN: "admin/create-admin",
}