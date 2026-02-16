import { useEffect, useState } from "react";
import api from "../services/api";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    const res = await api.get("/activity/");
    setActivities(res.data);
  };

  return (
    <div className="activity-card">
      <h3>Recent Activity</h3>

      {activities.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        activities.map((a, index) => (
          <div key={index} className="activity-item">
            <p>{a.message}</p>
            <span>{a.created_at}</span>
          </div>
        ))
      )}
    </div>
  );
}
