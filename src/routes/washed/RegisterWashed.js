import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterWashed = () => {
    const [employees, setEmployees] = useState([]);
    const [cars, setCars] = useState([]);
    const [services, setServices] = useState([]);
    const [clients, setClients] = useState([]); // Lista de clientes

    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedClient, setSelectedClient] = useState(''); // Cliente seleccionado
    const [responseMessage, setResponseMessage] = useState('');

    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    // Cargar datos de empleados, autos, servicios y clientes desde los endpoints
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener empleados
                const employeesResponse = await axios.get('http://localhost:8080/employees', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setEmployees(employeesResponse.data);

                // Obtener autos
                const carsResponse = await axios.get('http://localhost:8080/cars', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setCars(carsResponse.data);

                // Obtener servicios
                const servicesResponse = await axios.get('http://localhost:8080/services', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setServices(servicesResponse.data);

                // Obtener clientes
                const clientsResponse = await axios.get('http://localhost:8080/clients', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setClients(clientsResponse.data);

            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };
        fetchData();
    }, [token]); // Dependencia del token

    const handleRegister = async (e) => {
        e.preventDefault();

        const washRecord = {
            employee: selectedEmployee,
            car: selectedCar,
            serviceOffered: selectedService,
            client: selectedClient, // Incluir el cliente seleccionado
        };

        try {
            const response = await axios.post('http://localhost:8080/washed/register', washRecord, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });
            setResponseMessage('Lavado registrado exitosamente');
            // Limpiar los campos después del registro
            setSelectedEmployee('');
            setSelectedCar('');
            setSelectedService('');
            setSelectedClient('');
        } catch (error) {
            console.error('Error al registrar el lavado:', error);
            setResponseMessage('Error al registrar el lavado');
        }
    };

    return (
        <div className="container">
            <h2>Registrar Lavado</h2>
            <form onSubmit={handleRegister}>
                {/* Selección de Cliente */}
                <label>Cliente:</label>
                <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    required
                >
                    <option value="">Selecciona un cliente</option>
                    {clients.length > 0 ? (
                        clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name} {client.lastName}
                            </option>
                        ))
                    ) : (
                        <option value="">No hay clientes disponibles</option>
                    )}
                </select>

                {/* Selección de Empleado */}
                <label>Lavador:</label>
                <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    required
                >
                    <option value="">Selecciona un lavador</option>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No hay lavadores disponibles</option>
                    )}
                </select>

                {/* Selección de Auto */}
                <label>Auto (placa):</label>
                <select
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                    required
                >
                    <option value="">Selecciona un auto</option>
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <option key={car.id} value={car.licencePlate}>
                                {car.licencePlate}
                            </option>
                        ))
                    ) : (
                        <option value="">No hay autos disponibles</option>
                    )}
                </select>

                {/* Selección de Servicio */}
                <label>Servicio:</label>
                <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                >
                    <option value="">Selecciona un servicio</option>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name} - ${service.price}
                            </option>
                        ))
                    ) : (
                        <option value="">No hay servicios disponibles</option>
                    )}
                </select>
                
                <button type="submit">Registrar Lavado</button>
            </form>

            {responseMessage && <p className="success">{responseMessage}</p>}
        </div>
    );
};

export default RegisterWashed;
