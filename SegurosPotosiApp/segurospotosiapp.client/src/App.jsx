import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap'
import axios from 'axios';
import './App.css';

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </Table>;

    return (
        <Container fluid>
            <h1 id="tabelLabel">Weather forecast</h1>
            {contents}
        </Container>
    );

    async function populateWeatherData() {
        axios.get(`https://localhost:44343/weatherforecast`, {
            mode: 'no-cors'
        })
            .then(res => {
                setForecasts(res.data);
            });
    }
}

export default App;