import axios from "axios";

// Use environment variable if available, otherwise default to localhost for development
const baseURL = 
  process.env.REACT_APP_API_URL || 
  "https://food-donation-website-fv3s.onrender.com";

export default axios.create({ 
  baseURL: baseURL,
  withCredentials: true 
});
