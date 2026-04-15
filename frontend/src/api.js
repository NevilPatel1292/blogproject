const apiBaseUrl = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:10000/api").replace(/\/$/, "");

export const BLOGS_API_URL = `${apiBaseUrl}/Blogs`;
