import React from "react";

const Statistics = ({ urls }) => {
  if (!urls.length) return <p>No URLs shortened yet.</p>;

  return (
    <div>
      {urls.map((u, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <p><b>Short:</b> <a href={u.shortUrl}>{u.shortUrl}</a></p>
          <p><b>Original:</b> {u.longUrl}</p>
          <p><b>Created:</b> {new Date(u.createdAt).toLocaleString()}</p>
          <p><b>Expires:</b> {new Date(u.expiry).toLocaleString()}</p>
          <p><b>Total Clicks:</b> {u.clicks.length}</p>
          {u.clicks.map((c, j) => (
            <li key={j}>
              {new Date(c.timestamp).toLocaleString()} | {c.source} | {c.location}
            </li>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Statistics;
