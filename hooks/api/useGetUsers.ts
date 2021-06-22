import { useEffect, useRef } from "react";
import { useState } from "react";
import useAPI from "./useAPI";

const useGetUsers = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const cachedPage = useRef(page);
  const cachedQuery = useRef(query);

  const api = useAPI();

  async function get() {
    try {
      let currentPage = page;

      setLoading(true);

      if (cachedQuery.current !== query) {
        currentPage = 0;
      }

      const response = await api.get("/users", {
        params: {
          q: query,
          page,
        },
      });

      setData(response.data?.items || []);
    } catch (error) {
      setError(true);
    } finally {
      cachedQuery.current = query;
      cachedPage.current = page;

      setLoading(false);
    }
  }

  useEffect(() => {
    get();
  }, [query, page]);

  return {
    data,
    loading,
    error,
    setPage,
    setQuery,
  };
};

export default useGetUsers;
