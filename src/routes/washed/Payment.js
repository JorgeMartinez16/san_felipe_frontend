import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function Payment() {
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState("");

  console.log(moment(startDate).toISOString());
  console.log(employeeId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId) return;
    try {
      setError("");

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/washed/employee/${employeeId}/payment`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: moment(startDate).toISOString(),
            endDate: moment(endDate).toISOString(),
          },
        }
      );
      setPayment(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
      setError("Error al calcular el pago. Verifica los datos ingresados.");
    }
  };

  async function getEmployees() {
    const token = localStorage.getItem("token");
    const employees = await axios.get("http://localhost:8080/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEmployees(employees.data);
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="container">
      <div className="subContainer">
        <h2>Calcular Pago</h2>
        <form onSubmit={handleSubmit}>
          <div className="horizontal-view">
            <p>Empleado ID: </p>
            <select onChange={(e) => setEmployeeId(e.target.value)} required>
              <option value={false}>Selecciona un empleado</option>
              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                >{`${employee.name} ${employee.lastName}`}</option>
              ))}
            </select>
          </div>
          <div className="horizontal-view">
            <label>Fecha de inicio:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="horizontal-view">
            <label>Fecha de fin:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Calcular</button>
        </form>
        {payment !== null && (
          <div>
            <h3>Pago calculado: ${payment.toFixed(2)}</h3>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Payment;
