import * as SecureStore from "expo-secure-store";

export async function storeTokens(accessToken, refreshToken) {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  } catch (error) {
    console.log("Error saving tokens:", error);
  }
}

export async function getTokens() {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.log("Error retrieving tokens:", error);
  }
}
