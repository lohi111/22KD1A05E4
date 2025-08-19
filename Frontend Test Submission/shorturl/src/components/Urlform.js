import React from "react";
import { TextField, Card, CardContent } from "@mui/material";

const Urlform = ({ url, index, handleChange }) => {
  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <TextField
          label="Long URL"
          fullWidth
          margin="normal"
          value={url.longUrl}
          onChange={(e) => handleChange(index, "longUrl", e.target.value)}
        />
        <TextField
          label="Custom Shortcode (optional)"
          margin="normal"
          value={url.shortcode}
          onChange={(e) => handleChange(index, "shortcode", e.target.value)}
        />
        <TextField
          label="Validity (minutes)"
          type="number"
          margin="normal"
          value={url.validity}
          onChange={(e) => handleChange(index, "validity", e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default Urlform;
