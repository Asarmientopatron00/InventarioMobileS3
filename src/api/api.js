import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import env from "../env";

const baseURL = env.baseURL;
const api = axios.create({baseURL});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@secSellApiToken');
    if (token) {
      config.headers.authorization = 'Bearer '+token;
    }
    return config;
  }
);

export default api;