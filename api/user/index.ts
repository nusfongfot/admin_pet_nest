import apiFetch from "@/helpers/interceptors";

export const getAllUsers = async () => {
  const link = `/users/all`;
  const { data } = await apiFetch.get(link);
  return data;
};
