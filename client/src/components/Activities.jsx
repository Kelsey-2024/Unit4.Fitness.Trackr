import { useEffect, useState } from "react";

const API_URL = `/api/activities`;

const Activities = () => {
  const [allActivities, setAllActivities] = useState([]);

  //useEffect
  useEffect(() => {
    //fetchallactivities
    const fetchActivities = async () => {
      const result = await fetch(API_URL);
      const json = await result.json();
      console.log(json); //failed to fetch
      setAllActivities(json);
    };
    fetchActivities();
  }, []);

  return (
    <>
      <h1>All Activities!</h1>
      {allActivities.map((activity) => {
        return (
          <p>
            {activity.name}, {activity.description}
          </p>
        );
      })

      }
    </>
  )
}

export default Activities;