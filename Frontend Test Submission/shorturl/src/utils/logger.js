// Custom logging middleware (no console.log allowed)
export const logEvent = (type, message, data = {}) => {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    message,
    ...data
  };
  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
};
