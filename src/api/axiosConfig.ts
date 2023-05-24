import axios from "axios";

const DEFAULT_API = "https://api.punkapi.com/v2/";

export const api = axios.create({ baseURL: DEFAULT_API });
