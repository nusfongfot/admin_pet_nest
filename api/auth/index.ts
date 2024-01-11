import apiFetch from "@/helpers/interceptors";

export const login = async (body: object) => {
  const link = "/admin/auth/login";
  const { data } = await apiFetch.post(link, body);
  return data;
};
