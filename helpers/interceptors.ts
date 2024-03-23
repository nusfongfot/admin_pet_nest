import { errorToast } from "@/utils/notification";
import axios from "axios";
import { getCookies } from "cookies-next";

const apiFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

// Before Send Request
apiFetch.interceptors.request.use(
  (request) => {
    const { tokenAdmin } = getCookies("tokenAdmin" as any) || "";
    request.headers["x-access-token"] = tokenAdmin;
    request.headers["x-platform"] = "WEB";
    request.headers["Accept-Language"] = "TH";
    request.headers["Content-Type"] = "application/json";
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
    request.headers["x-access-login-application"] = "WEB";
    request.headers.Authorization = `Bearer ${tokenAdmin}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Before Accept Response
apiFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {    
    return errorToast(error.response.data.message[0], 2000);
  }
);
export default apiFetch;
