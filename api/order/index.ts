import apiFetch from "@/helpers/interceptors";

export const getAllOrders = async () => {
  const link = "/order/all";
  const { data } = await apiFetch.get(link);
  return data;
};
