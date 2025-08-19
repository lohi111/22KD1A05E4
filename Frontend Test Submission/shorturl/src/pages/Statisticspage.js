import React from "react";
import Statistics from "../components/Statistics";
import { getUrls } from "../utils/storage";

const Statisticspage = () => {
  const urls = getUrls();

  return (
    <div>
      <h2>URL Statistics</h2>
      <Statistics urls={urls} />
    </div>
  );
};

export default Statisticspage;
