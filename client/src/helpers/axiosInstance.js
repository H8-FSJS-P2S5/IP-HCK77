import axios from "axios";

export const serverInstance = axios.create({
  baseURL: "https://api.fauzhanwahyudi.com",
});
