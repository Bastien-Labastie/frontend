import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://capstone-backend-09dw.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class DnDApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${DnDApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    console.log("Fetching user for:", username);
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    console.log("logged");
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    console.log("Help");
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    console.log(data.password);
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /**Check API calls are working */
  static async getSpells() {
    try {
      const response = await axios.get("https://www.dnd5eapi.co/api/spells");
      return response.data.results;
    } catch (err) {
      console.error("Error fetching spells:", err);
      throw err;
    }
  }
}

export default DnDApi;