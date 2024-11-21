import React from "react";

export default function WeatherCard({ city, temperature, description, icon }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.city}>{city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={styles.icon}
      />
      <h3 style={styles.temperature}>{temperature}°C</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "#f0f4f8",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    width: "200px",
  },
  city: {
    fontSize: "1.5em",
    margin: "10px 0",
  },
  temperature: {
    fontSize: "2em",
    margin: "10px 0",
    color: "#007BFF",
  },
  description: {
    fontSize: "1em",
    margin: "10px 0",
    color: "#555",
  },
  icon: {
    width: "80px",
    height: "80px",
  },
};
