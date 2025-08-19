import React from "react";

const Urllist = ({ results }) => {
  if (!results.length) return null;

  return (
    <div>
      <h3>Shortened URLs</h3>
      {results.map((r, i) => (
        <p key={i}>
          {r.longUrl} →{" "}
          <a href={r.shortUrl} target="_blank" rel="noreferrer">
            {r.shortUrl}
          </a>{" "}
          (expires {new Date(r.expiry).toLocaleString()})
        </p>
      ))}
    </div>
  );
};

export default Urllist;
