"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("./helpers");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/integration.json", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const integrationJson = {
        data: {
            date: {
                created_at: "2025-02-18",
                updated_at: "2025-02-18",
            },
            descriptions: {
                app_name: "Yelp Reviews Monitor",
                app_description: "This integration will monitor and fetch reviews from Yelp left by the customers every hour.",
                app_logo: "https://raw.githubusercontent.com/victoribironke/hng-stage-3-task/refs/heads/master/logo.png",
                app_url: baseUrl,
                background_color: "#fff",
            },
            is_active: true,
            integration_type: "interval",
            key_features: ["Fetches reviews from Yelp hourly."],
            integration_category: "Monitoring & Logging",
            author: "Victor Ibironke",
            website: baseUrl,
            settings: [
                { label: "Business ID", type: "text", required: true, default: "" },
                {
                    label: "Interval",
                    type: "text",
                    required: true,
                    default: "0 * * * *",
                },
            ],
            target_url: `${baseUrl}/tick`,
            tick_url: `${baseUrl}/tick`,
        },
    };
    res.json(integrationJson);
});
// Tick endpoint
app.post("/tick", async (req, res) => {
    const payload = req.body;
    // Using setImmediate for background processing
    // setImmediate(async () => {
    try {
        const { recentReviews, name } = await (0, helpers_1.getRecentReviews)(payload);
        const formattedReviews = recentReviews.map((r) => {
            return `⭐ ${r.author_name} left a ${r.rating} star rating with a review that says: "${r.text}".`;
        });
        const prefix = `Your business, ${name}, received ${recentReviews.length} reviews in the last hour.`;
        //  `${review.author_name} (${review.rating}★): ${review.text}`
        const message = prefix +
            (recentReviews.length > 0 ? "\n\n\n" : "") +
            formattedReviews.join("\n\n");
        const data = {
            message: message,
            username: "Yelp Reviews Monitor",
            event_name: "Reviews Check",
            status: "success",
        };
        await axios_1.default.post(payload.return_url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        console.error("Error:", error);
    }
    // });
    res.status(202).json({ status: "accepted" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map