import React, { useState, useEffect } from "react";
import ActivityList from "../Activity/ActivityList";

const Home = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const response = await fetch("http://127.0.0.1:5000/home");
    const data = await response.json();
    setActivities(data.activities);
    console.log(data.activities);
  };
  return <ActivityList activities={activities}/>;
};

export default Home;
