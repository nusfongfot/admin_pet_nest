import apiFetch from "@/helpers/interceptors";

export const getAllOrders = async () => {
  const link = "/order/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const updateStatusOrder = async (id: string, body: object) => {
  const link = `/order/edit-status?orderId=${id}`;
  const { data } = await apiFetch.put(link, body);
  return data;
};

export const getRevenueCurrentWeek = async () => {
  const link = "/order/revenue/week";
  const { data } = await apiFetch.get(link);
  return data;
};

export const getRevenueTotal = async () => {
  const link = "/order/revenue/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const getRevenueOfMonth = async () => {
  const link = "/order/revenue/month";
  const { data } = await apiFetch.get(link);
  return data;
};
