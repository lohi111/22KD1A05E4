import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from "react-router-dom";
import Shortenerpage from "./pages/Shortenerpage";
import Statisticspage from "./pages/Statisticspage";
import { getUrls, saveUrl } from "./utils/storage";
import { logEvent } from "./utils/logger";

function Redirector() {
  const { code } = useParams();
  const urls = getUrls();
  const found = urls.find(u => u.shortcode === code || u.shortUrl.endsWith(code));

  if (!found) {
    logEvent("error", "Invalid shortcode", { code });
    return <p>Invalid or expired link</p>;
  }

  if (new Date(found.expiry) < new Date()) {
    logEvent("error", "Expired link", { code });
    return <p>Link expired</p>;
  }

  found.clicks.push({
    timestamp: new Date(),
    source: document.referrer || "direct",
    location: "unknown"
  });
  saveUrl(found);

  logEvent("info", "Redirected", { code });
  window.location.href = found.longUrl;
  return null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shortenerpage />} />
        <Route path="/stats" element={<Statisticspage />} />
        <Route path="/:code" element={<Redirector />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
