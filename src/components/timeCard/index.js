import moment from "moment";
import 'moment/locale/es';
import React from "react";

export default function TimeCard({ time }) {
  return (
    <div style={styles.container}>
      <div style={styles.clock}>
        <h1 style={styles.time}>{moment(time).format("hh:mm:ss A")}</h1>
        {time && <p style={styles.date}>{moment(time).format("dddd DD MMM").toLocaleLowerCase()}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "65vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)", // Fondo degradado
    color: "white",
    fontFamily: `'Roboto', sans-serif`,
  },
  clock: {
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.1)", // Fondo translúcido
    borderRadius: "15px",
    padding: "20px 40px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)", // Sombra suave
    backdropFilter: "blur(10px)", // Efecto de vidrio esmerilado
  },
  time: {
    fontSize: "4rem",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "2px",
  },
  date: {
    fontSize: "1.2rem",
    marginTop: "10px",
    opacity: 0.8,
  },
};
