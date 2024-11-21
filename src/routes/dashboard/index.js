import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import WeatherCard from "../../components/weatherCard";
import TimeCard from "../../components/timeCard";

export default function Dashboard() {
  const [myData, setMyData] = useState({});
  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState();
  const data = [
    ["Titulo", "Cantidad"],
    ["Empleados", myData?.employeesCount],
    ["Clientes", myData?.clientsCount],
    ["Carros", myData?.carsCount],
  ];

  const options = {
    title: "Estadisticas de desempeño",
    legend: { position: "none" },
  };

  async function getData() {
    const token = localStorage.getItem("token");
    const employees = await axios.get("http://localhost:8080/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMyData(employees.data);
  }
  async function fetchWeatherData() {
    const cities = ["Cartagena, CO ", "Turbaco, CO"];
    const apiKey = "3ff36fea7aa69b4ed906d20bad4fbdc8";
    const unit = "metric";
    try {
      const responses = await Promise.all(
        cities.map((city) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}&lang=sp`
          )
        )
      );
      const data = responses.map((res) => ({
        city: res.data.name,
        temperature: res.data.main.temp,
        description: res.data.weather[0].description,
        icon: res.data.weather[0].icon,
      }));
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    getData();
    fetchWeatherData();
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          overflow: "auto",
        }}
      >
        {weather.map((data, index) => (
          <WeatherCard
            key={index}
            city={data.city}
            temperature={data.temperature}
            description={data.description}
            icon={data.icon}
          />
        ))}
      </div>
      <div style={{ width: "40%" }}>
        <Chart
          chartType="BarChart"
          data={data}
          options={options}
          height="400px"
        />
      </div>
      <div>
        <TimeCard time={time} />
      </div>
    </div>
  );
}
