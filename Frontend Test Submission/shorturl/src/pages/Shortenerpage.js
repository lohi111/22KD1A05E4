import React, { useState } from "react";
import { Button } from "@mui/material";
import Urlform from "../components/Urlform";
import Urllist from "../components/Urllist";
import { saveUrl } from "../utils/storage";
import { logEvent } from "../utils/logger";

const Shortenerpage = () => {
  const [urls, setUrls] = useState([{ longUrl: "", shortcode: "", validity: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (i, field, value) => {
    const newUrls = [...urls];
    newUrls[i][field] = value;
    setUrls(newUrls);
  };

  const generateShortCode = () => Math.random().toString(36).substring(2, 7);

  const handleSubmit = () => {
    const existingUrls = JSON.parse(localStorage.getItem("urls")) || [];

    const newResults = urls.map((u) => {
      // Validate URL
      try {
        new URL(u.longUrl);
      } catch {
        alert("❌ Invalid URL format");
        logEvent("error", "Invalid URL", { input: u.longUrl });
        return null;
      }

      // Shortcode uniqueness
      const code = u.shortcode || generateShortCode();
      if (existingUrls.find((e) => e.shortcode === code)) {
        alert("❌ Shortcode already exists, try another");
        logEvent("error", "Shortcode collision", { code });
        return null;
      }

      // Expiry
      const expiry = new Date(Date.now() + (u.validity ? u.validity * 60000 : 30 * 60000));

      const shortUrl = `http://localhost:3000/${code}`;
      const obj = {
        ...u,
        shortcode: code,
        shortUrl,
        expiry,
        createdAt: new Date(),
        clicks: [],
      };

      saveUrl(obj);
      logEvent("info", "URL shortened", obj);
      return obj;
    }).filter(Boolean);

    setResults(newResults);
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      {urls.map((u, i) => (
        <Urlform key={i} url={u} index={i} handleChange={handleChange} />
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Shorten URLs
      </Button>
      <Urllist results={results} />
    </div>
  );
};

export default Shortenerpage;
