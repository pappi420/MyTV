import { Provider } from "@/types/provider";

export async function testConnection(
  provider: Provider
) {
  try {
    const response = await fetch(
      `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}`
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    return !!data.user_info;
  } catch {
    return false;
  }
}