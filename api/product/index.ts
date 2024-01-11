import apiFetch from "@/helpers/interceptors";

export const createProduct = async (body: object) => {
  const link = "/product/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const editProduct = async (body: object, id: string) => {
  const link = `/product/edit/${id}`;
  const { data } = await apiFetch.put(link, body);
  return data;
};

export const deleteProduct = async (id: string) => {
  const link = `/product/delete/${id}`;
  const { data } = await apiFetch.delete(link);
  return data;
};

export const getAllProduct = async () => {
  const link = "/product/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const getDetailProduct = async (id: string) => {
  const link = `/product/detail/${id}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const searchProduct = async (q: string) => {
  const link = `/product/search?keyword=${q}`;
  const { data } = await apiFetch.get(link);
  return data;
};
