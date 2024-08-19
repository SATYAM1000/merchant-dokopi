import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { fetchAccessToken } from "@/actions/access-token";
import { format } from "date-fns";

const fetchOrders = async ({ queryKey }) => {
  const [_, currentUser, date] = queryKey;
  try {
    const token = await fetchAccessToken();
    let url = `${API_DOMAIN}/api/v1/merchant/orders/${currentUser?.storeId}`;

    const currentDate = date || new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    url += `?date=${encodeURIComponent(formattedDate)}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data);
    throw error;
  }
};

export const useOrders = (currentUser, date) => {
  return useQuery({
    queryKey: ["orders", currentUser, date],
    queryFn: fetchOrders,
    enabled: !!currentUser,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};
