import { MonitorPayload, Review } from "./types";
import axios from "axios";
import { DateTime } from "luxon";
import { YELP_API_BASE_URL, YELP_API_KEY } from "./constants";

type ReturnType = {
  recentReviews: Review[];
  name: string;
};

export const getRecentReviews = async (
  payload: MonitorPayload
): Promise<ReturnType> => {
  const businessId = payload.settings[0].default;

  try {
    const nameResponse = await axios.get(
      `${YELP_API_BASE_URL}/businesses/${businessId}`,
      {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    const reviewsResponse = await axios.get(
      `${YELP_API_BASE_URL}/businesses/${businessId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    const reviews = reviewsResponse.data.reviews || [];
    const oneHourAgo = DateTime.now().minus({ hours: 1 }).toJSDate();

    const recentReviews = reviews
      .filter((review: any) => new Date(review.time_created) >= oneHourAgo)
      .map((review: any) => ({
        author_name: review.user.name,
        rating: review.rating,
        text: review.text,
        time: new Date(review.time_created),
      }));

    return { recentReviews, name: nameResponse.data.name };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching reviews: ${error.message}`);
    }
    throw error;
  }
};
