import apiFetch from "@/helpers/interceptors";

export const getCategory = async () => {
  const link = "/category/all";
  const { data } = await apiFetch.get(link);
  return data;
};
