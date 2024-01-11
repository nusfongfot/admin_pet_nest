import apiFetch from "@/helpers/interceptors";

export const uploadImages = async (body: object) => {
  const link = "/upload/multiple";
  const { data } = await apiFetch.post(link, body);
  return data;
};
