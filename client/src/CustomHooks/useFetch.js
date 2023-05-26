import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url) => {
    try {
      //   setIsLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();

      const updatedData = responseData.map((apmt) => {
        if (apmt.startTime.length === 3) {
          apmt = { ...apmt, startTime: "0" + apmt.startTime };
        }
        if (apmt.endTime.length === 3) {
          apmt = { ...apmt, endTime: "0" + apmt.endTime };
        }
        return apmt;
      });

      setData(updatedData);
      //   setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setIsLoading(false);
    }
  };

  return [data, fetchData];
};

export default useFetch;
