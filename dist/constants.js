"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YELP_API_BASE_URL = exports.YELP_API_KEY = exports.YELP_CLIENT_ID = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.YELP_CLIENT_ID = process.env.YELP_CLIENT_ID;
exports.YELP_API_KEY = process.env.YELP_API_KEY;
exports.YELP_API_BASE_URL = process.env.YELP_API_BASE_URL;
//# sourceMappingURL=constants.js.map