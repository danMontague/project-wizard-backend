import axios from "axios";
import { env } from "../../config/env.js";

export const ServerService = {
  async registerProject(data) {
    const res = await axios.post(env.SERVER_API_URL, data);
    return res.data;
  }
};
