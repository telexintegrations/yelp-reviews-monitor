# Yelp Reviews Monitor API

## Description

This project is an API built with Express and TypeScript that monitors Yelp business reviews. It fetches new reviews every hour and sends them to a specified endpoint.

## Prerequisites

- Node.js (v14 or higher)
- npm
- A Yelp API key

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/victoribironke/hng-stage-3-task
   ```
2. Navigate to the project directory:
   ```sh
   cd hng-stage-3-task
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following details:
   ```plaintext
   YELP_CLIENT_ID=
   YELP_API_KEY=
   YELP_API_BASE_URL=https://api.yelp.com/v3
   ```

## Development

To build the project, run:

```sh
npm run build
```

## Start

To start the project, run:

```sh
npm start
```

# API Documentation

## Base URL

```plaintext
https://hng-stage-3-task.vercel.app
```

---

## Endpoints

### 1. **Get Integration Details**

Returns the integration configuration and metadata.

- **Endpoint**: `GET /integration.json`
- **Response**:
  - **Success** (`200`):
    ```json
    {
      "data": {
        "date": {
          "created_at": "2025-02-18",
          "updated_at": "2025-02-18"
        },
        "descriptions": {
          "app_name": "Yelp Reviews Monitor",
          "app_description": "This integration will monitor and fetch reviews from Yelp left by the customers every hour.",
          "app_logo": "https://raw.githubusercontent.com/victoribironke/hng-stage-3-task/refs/heads/master/logo.png",
          "app_url": "http://hng-stage-3-task.vercel.app",
          "background_color": "#fff"
        },
        "is_active": true,
        "integration_type": "interval",
        "key_features": ["Fetches reviews from Yelp hourly."],
        "integration_category": "Monitoring & Logging",
        "author": "Victor Ibironke",
        "website": "http://hng-stage-3-task.vercel.app",
        "settings": [
          {
            "label": "Business ID",
            "type": "text",
            "required": true,
            "default": ""
          },
          {
            "label": "Interval",
            "type": "text",
            "required": true,
            "default": "0 * * * *"
          }
        ],
        "target_url": "http://hng-stage-3-task.vercel.app/tick",
        "tick_url": "http://hng-stage-3-task.vercel.app/tick"
      }
    }
    ```

### 2. **Process Reviews**

Fetches recent reviews and sends them to the specified return URL.

- **Endpoint**: `POST /tick`
- **Request Body**:
  ```json
  {
    "channel_id": "string",
    "return_url": "string",
    "settings": [
      {
        "label": "Business ID",
        "type": "text",
        "required": true,
        "default": ""
      },
      {
        "label": "interval",
        "type": "text",
        "required": true,
        "default": "0 * * * *"
      }
    ]
  }
  ```
- **Response**:
  - **Success** (`202`):
    ```json
    {
      "status": "accepted"
    }
    ```

## Review Message Format

When new reviews are found, they are formatted and sent to the return URL with the following structure:

```json
{
  "message": "Your business, [Business Name], received [X] reviews in the last hour.\n\n⭐ [Author] left a [Rating] star rating with a review that says: '[Review Text]'.",
  "username": "Yelp Reviews Monitor",
  "event_name": "Reviews Check",
  "status": "success"
}
```

## Cron Schedule

The integration runs hourly using the cron expression: `0 * * * *`

---

[View on GitHub](https://github.com/victoribironke/hng-stage-3-task)
