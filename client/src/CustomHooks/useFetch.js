import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return [data, fetchData];
};

export default useFetch;
