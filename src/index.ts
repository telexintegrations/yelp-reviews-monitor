import express, { Request, Response } from "express";

import { MonitorPayload } from "./types";
import { getRecentReviews } from "./helpers";
import axios from "axios";

const app = express();
app.use(express.json());

app.get("/integration.json", (req: Request, res: Response) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const integrationJson = {
    data: {
      date: {
        created_at: "2025-02-18",
        updated_at: "2025-02-18",
      },
      descriptions: {
        app_name: "Yelp Reviews Monitor",
        app_description:
          "This integration will monitor and fetch reviews from Yelp left by the customers every hour.",
        app_logo:
          "https://raw.githubusercontent.com/victoribironke/hng-stage-3-task/refs/heads/master/logo.png", // UPDATE THIS AFTER PUSHING
        app_url: baseUrl,
        background_color: "#fff",
      },
      is_active: true,
      integration_type: "interval",
      key_features: ["Fetches reviews from Yelp hourly."],
      category: "Monitoring & Logging",
      author: "Victor Ibironke",
      website: baseUrl,
      settings: [
        { label: "Business ID", type: "text", required: true, default: "" },
        {
          label: "interval",
          type: "text",
          required: true,
          default: "0 * * * *",
        },
      ],
      target_url: "",
      tick_url: `${baseUrl}/tick`,
    },
  };

  res.json(integrationJson);
});

// Tick endpoint
app.post("/tick", async (req: Request, res: Response) => {
  const payload: MonitorPayload = req.body;

  // Using setImmediate for background processing
  setImmediate(async () => {
    try {
      const { recentReviews, name } = await getRecentReviews(payload);
      const formattedReviews = recentReviews.map((r) => {
        return `⭐ ${r.author_name} left a ${r.rating} star rating with a review that says: "${r.text}".`;
      });
      const prefix = `Your business, ${name}, received ${recentReviews.length} reviews in the last hour.`;

      //  `${review.author_name} (${review.rating}★): ${review.text}`

      const message =
        prefix +
        (recentReviews.length > 0 ? "\n\n\n" : "") +
        formattedReviews.join("\n\n");

      const data = {
        message: message,
        username: "Yelp Reviews Monitor",
        event_name: "Reviews Check",
        status: "success",
      };

      await axios.post(payload.return_url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Background task error:", error);
    }
  });

  res.status(202).json({ status: "accepted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
