export const API_URL = process.env.REACT_APP_API_URL!;
export const API_KEY = process.env.REACT_APP_API_KEY!;

export const LOGIN_URL = `${API_URL}/login`;
export const BLOG_POSTS_URL = (userId: number): string => `${API_URL}/posts/${userId}`;