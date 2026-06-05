import axios, { isAxiosError } from "axios";
import { TREETRACKER_API, WALLET_API_KEY } from "../utils/config";

export async function getTokens(
  token: string,
  walletName: string,
  limit: number = 100,
) {
  try {
    const response = await axios.get(
      `${TREETRACKER_API}/tokens?wallet=${encodeURIComponent(
        walletName,
      )}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "treetracker-api-key": WALLET_API_KEY,
        },
      },
    );

    return response.data; // { tokens: [...] }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get tokens";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
