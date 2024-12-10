import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const usePostData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}${url}`, payload, options);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};