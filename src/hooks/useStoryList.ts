import { useEffect, useState } from "react";
import axios from "axios";

export const useStoryList = () => {
  const [storyList, setStoryList] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.axios.com/api/render/stream/content", {
        params: {
          page_size: 20,
        },
      })
      .then((data) => setStoryList(data.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setIsFetching(false));
  }, []);

  return { storyList, error, isFetching };
};

export const useStoryContent = (storyId) => {
  const [storyContent, setStoryContent] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.axios.com/api/render/content/${storyId}`)
      .then((data) => setStoryContent(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsFetching(false));
  }, [storyId]);

  return { storyContent, error, isFetching };
};
