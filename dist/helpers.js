"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentReviews = void 0;
const axios_1 = __importDefault(require("axios"));
const luxon_1 = require("luxon");
const constants_1 = require("./constants");
const getRecentReviews = async (payload) => {
    const businessId = payload.settings[0].default;
    try {
        const nameResponse = await axios_1.default.get(`${constants_1.YELP_API_BASE_URL}/businesses/${businessId}`, {
            headers: {
                Authorization: `Bearer ${constants_1.YELP_API_KEY}`,
                Accept: "application/json",
            },
        });
        const reviewsResponse = await axios_1.default.get(`${constants_1.YELP_API_BASE_URL}/businesses/${businessId}/reviews`, {
            headers: {
                Authorization: `Bearer ${constants_1.YELP_API_KEY}`,
                Accept: "application/json",
            },
        });
        const reviews = reviewsResponse.data.reviews || [];
        const oneHourAgo = luxon_1.DateTime.now().minus({ hours: 1 }).toJSDate();
        const recentReviews = reviews
            .filter((review) => new Date(review.time_created) >= oneHourAgo)
            .map((review) => ({
            author_name: review.user.name,
            rating: review.rating,
            text: review.text,
            time: new Date(review.time_created),
        }));
        return { recentReviews, name: nameResponse.data.name };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw new Error(`Error fetching reviews: ${error.message}`);
        }
        throw error;
    }
};
exports.getRecentReviews = getRecentReviews;
//# sourceMappingURL=helpers.js.map