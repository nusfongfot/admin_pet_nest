import apiFetch from "@/helpers/interceptors";

export const getCategory = async () => {
  const link = "/category/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const createCategory = async (body: object) => {
  const link = "/category/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};
