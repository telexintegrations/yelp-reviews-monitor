import { config } from "dotenv";
config();

export const YELP_CLIENT_ID = process.env.YELP_CLIENT_ID;
export const YELP_API_KEY = process.env.YELP_API_KEY;
export const YELP_API_BASE_URL = process.env.YELP_API_BASE_URL;
