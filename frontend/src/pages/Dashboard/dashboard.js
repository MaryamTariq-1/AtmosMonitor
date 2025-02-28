import React, { useState, useEffect } from "react"; // Correct import for useEffect
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Plot from "react-plotly.js"; // Correct import statement
import {
  faHouse,
  faDesktop,
  faBell,
  faChartColumn,
  faMapLocationDot,
  faHeartPulse,
  faPieChart,
  faChartBar,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./dashboard.css";
import GaugeChart from "react-gauge-chart";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat"; // Import leaflet.heat plugin

class HeatMap extends React.Component {
  componentDidMount() {
    // Initialize the map centered on Faisalabad
    this.map = L.map("heatmap").setView([30.7628, 72.9297], 10);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(this.map);

    // Fetch AQI data from the JSON file
    fetch("/aqidata.json") // Replace with the actual path to your JSON file
      .then((response) => response.json())
      .then((data) => {
        // Validate and process the JSON structure
        if (!data || !Array.isArray(data.features)) {
          throw new Error("Invalid data structure");
        }

        // Prepare the data for the heatmap
        const aqiData = [];
        data.features.forEach((feature) => {
          const { AQI, lat, long } = feature.attributes; // Extract AQI and coordinates

          // Determine intensity based on AQI value for heatmap
          const getIntensity = (aqi) => {
            if (aqi <= 224.890014) return 0.6; // Moderate AQI (yellow zone)
            if (aqi <= 226.57779) return 0.8; // Very Unhealthy AQI (red zone)
            return 1.0; // Hazardous AQI (maroon zone)
          };

          // Push the [lat, long, intensity] format to the aqiData array
          aqiData.push([lat, long, getIntensity(AQI)]);
        });
        // Add heatmap layer
        L.heatLayer(aqiData, {
          radius: 25, // Radius of each heatmap point
          blur: 15, // Blur effect intensity
          maxZoom: 13, // Maximum zoom level
          gradient: {
            0.4: "blue", // Low intensity
            0.6: "lime", // Moderate intensity
            0.7: "yellow", // Higher intensity
            0.8: "orange", // Very high intensity
            1.0: "red", // Maximum intensity
          },
        }).addTo(this.map);
      })
      .catch((error) => {
        console.error("Error loading AQI data:", error);
      });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  render() {
    return <div id="heatmap" style={{ width: "100%", height: "400px" }}></div>;
  }
}

function Dashboard() {
  const navigate = useNavigate();

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [predictedAqi, setPredictedAqi] = useState("N/A");
  const [jsonData, setJsonData] = useState(null); // To store your JSON data
  const [locations, setLocations] = useState([]); // To store locations
  const [selectedLocation, setSelectedLocation] = useState(null); // To store selected location
  const [healthAdvice, setHealthAdvice] = useState(""); // Store health advice based on AQI

  const [alerts, setAlerts] = useState([]); // Store alerts
  const [alertName, setAlertName] = useState(""); // Alert name input
  const [alertFrequency, setAlertFrequency] = useState("Daily"); // Frequency of alert
  const [alertTime, setAlertTime] = useState(""); // Custom time for alert

  // Handle adding an alert
  // Handle adding an alert
  const handleAddAlert = (e) => {
    e.preventDefault();

    // Make sure the alert name and time are valid
    if (!alertName || !alertTime) return; // Don't add if name or time is empty

    // Check if the alert already exists (based on name, for simplicity)
    const alertExists = alerts.some(
      (alert) => alert.name === alertName && alert.time === alertTime
    );

    if (alertExists) {
      console.log("This alert already exists!");
      return; // Prevent adding a duplicate alert
    }

    // Create a new alert
    const newAlert = {
      id: Date.now(), // Unique ID for each alert
      name: alertName,
      frequency: alertFrequency,
      time: alertTime, // Store the custom time
    };

    // Add the new alert to the list
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    // Clear input fields after adding
    setAlertName(""); // Clear name input
    setAlertFrequency("Daily"); // Reset frequency selection
    setAlertTime(""); // Reset time picker
  };

  // Handle removing an alert
  const handleRemoveAlert = (alertId) => {
    setAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== alertId)
    );
  };

  // Set up periodic notifications (just for demonstration purposes)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toISOString();
      alerts.forEach((alert) => {
        // Check if current time matches the alert time
        if (alert.time === currentTime) {
          console.log(`Alert triggered: ${alert.name}`);
          // You can replace this log with an actual notification logic
        }
      });
    }, 1000); // Check every second for simplicity
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [alerts]);

  const [pollutionData, setPollutionData] = useState(null); // Store pollution data
  const [pollutionAlert, setPollutionAlert] = useState(""); // Pollution level alert message
  const [alertThresholds, setAlertThresholds] = useState({
    pm25: 100, // Threshold for PM2.5
    pm10: 150, // Threshold for PM10
    co2: 500, // Threshold for CO2
  });
  useEffect(() => {
    const fetchPollutionData = () => {
      // Simulated pollution data (in real use, fetch data from an API)
      const simulatedData = {
        pm25: Math.random() * 200, // Simulated PM2.5 value
        pm10: Math.random() * 200, // Simulated PM10 value
        co2: Math.random() * 1000, // Simulated CO2 value
      };
      setPollutionData(simulatedData);
      checkPollutionLevels(simulatedData); // Check pollution levels after fetching
    };
    fetchPollutionData();
    const intervalId = setInterval(fetchPollutionData, 60000); // Fetch data every minute
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Check pollution levels and trigger alerts
  const checkPollutionLevels = (data) => {
    let alertMessage = "";

    if (data.pm25 > alertThresholds.pm25) {
      alertMessage += `PM2.5 levels are high: ${data.pm25.toFixed(2)} µg/m³. `;
    }

    if (data.pm10 > alertThresholds.pm10) {
      alertMessage += `PM10 levels are high: ${data.pm10.toFixed(2)} µg/m³. `;
    }

    if (data.co2 > alertThresholds.co2) {
      alertMessage += `CO2 levels are high: ${data.co2.toFixed(2)} ppm. `;
    }

    if (alertMessage) {
      setPollutionAlert(alertMessage);
      // Optionally, add the alert to the alert list
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        { id: Date.now(), message: alertMessage },
      ]);
    } else {
      setPollutionAlert("Pollution levels are normal.");
    }
  };

  useEffect(() => {
    // Fetch the data from JSON
    fetch("csvjson.json") // Replace with actual file path or API
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        // Extract unique locations
        const uniqueLocations = [
          ...new Set(data.map((record) => record.Location)),
        ];
        setLocations(uniqueLocations);
        setSelectedLocation(uniqueLocations[0]); // Set default location
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);

    // Update the query parameters without reloading the page
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("location", newLocation);

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };
  useEffect(() => {
    if (jsonData && selectedLocation) {
      updateCharts(selectedLocation);
    }
  }, [selectedLocation, jsonData]);

  const updateCharts = (selectedLocation) => {
    const filteredData = jsonData.filter(
      (record) => record.Location === selectedLocation
    );
    const timeRange = filteredData.map((record) => record.Date);
    const pm25Data = filteredData.map((record) => record["PM2.5"]);
    const pm10Data = filteredData.map((record) => record["PM10"]);
    const co2Data = filteredData.map((record) => record.CO2);
    const tempData = filteredData.map((record) => record.Temperature);
    const humidData = filteredData.map((record) => record.Humidity);

    // Update chart data state
    setChartsData({
      timeRange,
      pm25Data,
      pm10Data,
      co2Data,
      tempData,
      humidData,
    });

    const avgPM25 = (
      pm25Data.reduce((a, b) => a + b, 0) / pm25Data.length
    ).toFixed(2);
    const avgPM10 = (
      pm10Data.reduce((a, b) => a + b, 0) / pm10Data.length
    ).toFixed(2);
    const avgCO2 = (
      co2Data.reduce((a, b) => a + b, 0) / co2Data.length
    ).toFixed(2);

    const averageAQI = Math.max(avgPM25, avgPM10, avgCO2);
    const advice = getHealthAdvice(averageAQI, avgPM25, avgPM10, avgCO2);
    setHealthAdvice(advice);
  };

  const [chartsData, setChartsData] = useState({
    timeRange: [],
    pm25Data: [],
    pm10Data: [],
    co2Data: [],
    tempData: [],
    humidData: [],
  });

  // Filter data for the selected location
  const filteredData = jsonData
    ? jsonData.filter((record) => record.Location === selectedLocation)
    : [];

  if (!jsonData || locations.length === 0) {
    return <div>Loading data...</div>;
  }

  // Data preparation
  const timeRange = filteredData.map((record) => record.Date);
  const pm25Data = filteredData.map((record) => record["PM2.5"]);
  const pm10Data = filteredData.map((record) => record["PM10"]);
  const co2Data = filteredData.map((record) => record.CO2);

  const avgPM25 = parseFloat(
    (pm25Data.reduce((a, b) => a + b, 0) / pm25Data.length).toFixed(2)
  );
  const avgPM10 = parseFloat(
    (pm10Data.reduce((a, b) => a + b, 0) / pm10Data.length).toFixed(2)
  );
  const avgCO2 = parseFloat(
    (co2Data.reduce((a, b) => a + b, 0) / co2Data.length).toFixed(2)
  );

  const pieData = [
    { name: "PM2.5", value: avgPM25 },
    { name: "PM10", value: avgPM10 },
    { name: "CO2", value: avgCO2 },
  ];

  const lastDayIndex = timeRange.length - 1;
  const barData = [
    { name: "PM2.5", value: pm25Data[lastDayIndex] },
    { name: "PM10", value: pm10Data[lastDayIndex] },
    { name: "CO2", value: co2Data[lastDayIndex] },
  ];

  const stackedBarData = timeRange.map((time, index) => ({
    name: time,
    PM25: pm25Data[index],
    PM10: pm10Data[index],
    CO2: co2Data[index],
  }));

  const latestAQI = Math.max(
    pm25Data[lastDayIndex],
    pm10Data[lastDayIndex],
    co2Data[lastDayIndex]
  );
  const maxAQI = 500; // Maximum AQI value
  const gaugeValue = latestAQI / maxAQI; // Scale AQI value to range 0-1

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!longitude || !latitude) {
      alert("Please enter both longitude and latitude.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/predict?longitude=${longitude}&latitude=${latitude}`,
        {
          method: "GET",
          mode: "cors", // Include CORS headers
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.predicted_aqi) {
          setPredictedAqi(data.predicted_aqi.toFixed(2));
        } else {
          setPredictedAqi("Error fetching data");
        }
      } else {
        setPredictedAqi("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an error fetching the AQI prediction. Please try again later."
      );
    }
  };

  const getHealthAdvice = (aqi, pm25, pm10, co2) => {
    if (aqi <= 50) {
      return "Air quality is good. You can go outside.";
    } else if (aqi <= 100) {
      return "Air quality is moderate. Consider limiting outdoor activities.";
    } else if (aqi <= 150) {
      return "Air quality is unhealthy for sensitive groups. Stay indoors if you have respiratory issues.";
    } else if (aqi <= 200) {
      return "Air quality is unhealthy. Limit outdoor exposure.";
    } else if (aqi <= 300) {
      return "Air quality is very unhealthy. Stay indoors and wear a mask if you need to go outside.";
    } else {
      return "Air quality is hazardous. Stay indoors and avoid outdoor activities.";
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo"> Dashboard</div>
        <ul className="sidebar-links">
          <li>
            <a href="#home" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </a>
          </li>
          <li>
            <a href="#stats">
              <FontAwesomeIcon icon={faDesktop} /> Monitoring Environment
            </a>
          </li>
          <li>
            <a href="#visual-data">
              <FontAwesomeIcon icon={faDesktop} /> Visual Data
            </a>
          </li>
          <li>
            <a href="#pie-chart">
              <FontAwesomeIcon icon={faPieChart} /> Pie Chart
            </a>
          </li>
          <li>
            <a href="#bar-chart">
              <FontAwesomeIcon icon={faChartColumn} /> Bar Chart
            </a>
          </li>

          <li>
            <a href="#stacked-bar-chart">
              <FontAwesomeIcon icon={faChartBar} /> Stacked Bar
            </a>
          </li>
          <li>
            <a href="#gauge-chart">
              <FontAwesomeIcon icon={faTachometerAlt} /> Gauge Chart
            </a>
          </li>
          <li>
            <a href="#heat-map">
              <FontAwesomeIcon icon={faMapLocationDot} /> Heat Map
            </a>
          </li>
          <li>
            <a href="#recommendation">
              <FontAwesomeIcon icon={faDesktop} /> Recommendations System
            </a>
          </li>
          <li>
            <a href="#alerts">
              <FontAwesomeIcon icon={faBell} /> Managing ALerts
            </a>
          </li>
          <li>
            <a href="#health-impact">
              <FontAwesomeIcon icon={faHeartPulse} /> Health Impact
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="dropdown-container">
          <label htmlFor="locationDropdown">Select Location: </label>
          <select
            id="locationDropdown"
            value={selectedLocation || ""}
            onChange={handleLocationChange}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <section className="stats" id="stats">
          <h2>Monitoring Environment</h2>
          <div className="info-cards-container">
            <div className="info-card">78 Pollution</div>
            <div className="info-card">12 Health</div>
            <div className="info-card">13 Traffic Rush</div>
            <div className="info-card">1 Vehicle</div>
          </div>
        </section>

        <section className="visualize" id="visual-data-section">
          <h2>Visualize Data</h2>

          {/* Pie Chart */}
          <section id="pie-chart" className="chart-card">
            <h3>Average Pollutant Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                    fill="#8884d8"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={["#FF6384", "#36A2EB", "#FFCE56"][index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Plotly PM2.5 and PM10 Chart */}
          <section id="pm25-pm10-chart" className="chart-card">
            <h3>PM2.5 and PM10 Levels</h3>
            <Plot
              data={[
                {
                  x: chartsData.timeRange,
                  y: chartsData.pm25Data,
                  name: "PM2.5",
                  type: "scatter",
                  line: { color: "#1f77b4" },
                },
                {
                  x: chartsData.timeRange,
                  y: chartsData.pm10Data,
                  name: "PM10",
                  type: "scatter",
                  line: { color: "#ff7f0e" },
                },
              ]}
              layout={{
                title: `PM2.5 and PM10 Levels`,
                xaxis: { title: "Date" },
                yaxis: { title: "Concentration (μg/m³)" },
                margin: { t: 50, l: 50, r: 50, b: 50 },
              }}
            />
          </section>

          {/* Plotly CO2 Levels Chart */}
          <section id="co2-chart" className="chart-card">
            <h3>CO2 Levels</h3>
            <Plot
              data={[
                {
                  x: chartsData.timeRange,
                  y: chartsData.co2Data,
                  type: "scatter",
                  line: { color: "#2ca02c" },
                },
              ]}
              layout={{
                title: `CO2 Levels`,
                xaxis: { title: "Date" },
                yaxis: { title: "CO2 Concentration (ppm)" },
                margin: { t: 50, l: 50, r: 50, b: 50 },
              }}
            />
          </section>

          {/* Plotly Temperature & Humidity Chart */}
          <section id="temperature-humidity-chart" className="chart-card">
            <h3>Temperature & Humidity</h3>
            <Plot
              data={[
                {
                  x: chartsData.timeRange,
                  y: chartsData.tempData,
                  type: "scatter",
                  name: "Temperature",
                  line: { color: "#d62728" },
                },
                {
                  x: chartsData.timeRange,
                  y: chartsData.humidData,
                  type: "scatter",
                  name: "Humidity",
                  line: { color: "#9467bd" },
                },
              ]}
              layout={{
                title: "Temperature & Humidity",
                xaxis: { title: "Date" },
                yaxis: { title: "Temperature (°C)" },
                yaxis2: {
                  title: "Humidity (%)",
                  overlaying: "y",
                  side: "right",
                },
                margin: { t: 50, l: 50, r: 50, b: 50 },
              }}
            />
          </section>

          {/* Bar Chart */}
          <section id="bar-chart" className="chart-card">
            <h3>Pollutant Levels on the Last Day</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Stacked Bar Chart */}
          <section id="stacked-bar-chart" className="chart-card">
            <h3>Pollutants Over Time</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stackedBarData} stackOffset="sign">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="PM25" stackId="a" fill="#8884d8" />
                  <Bar dataKey="PM10" stackId="a" fill="#FFCE56" />
                  <Bar dataKey="CO2" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Gauge Chart */}
          <section id="gauge-chart" className="chart-card">
            <h3>Air Quality Index (Latest)</h3>
            <div className="chart-container">
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={20}
                colors={["#4CAF50", "#FFCE56", "#FF5733", "#C70039"]}
                arcWidth={0.3}
                percent={gaugeValue}
                textColor="#000"
                needleColor="#000"
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "1.2rem",
                }}
              >
                AQI: {latestAQI}
              </div>
            </div>
          </section>

          {/* Heat Map (Placeholder with ComposedChart) */}
          <section id="heat-map" className="chart-card">
            <h3>Heat Map</h3>
            <div className="chart-container">
              <HeatMap />
            </div>
          </section>
        </section>

        <section className="Recommendations-system" id="recommendation">
          <h2>Recommendations System </h2>
          <div className="Prediction" id="Prediction">
            <h1>Air Quality Index (AQI) Prediction</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="longitude">Longitude:</label>
              <input
                type="number"
                step="any"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter Longitude"
                required
              />

              <label htmlFor="latitude">Latitude:</label>
              <input
                type="number"
                step="any"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter Latitude"
                required
              />

              <button type="submit">Get AQI</button>
            </form>

            <div id="result">
              <h3>
                Predicted AQI: <span>{predictedAqi}</span>
              </h3>
            </div>
          </div>
        </section>

        <section className="custom-alerts" id="alerts">
          <h2>Custom Alerts</h2>

          {/* Alert Form */}
          <div className="add-alert-form">
            <form onSubmit={handleAddAlert}>
              <input
                type="text"
                value={alertName}
                onChange={(e) => setAlertName(e.target.value)}
                placeholder="Enter Alert Name"
                required
              />
              <select
                value={alertFrequency}
                onChange={(e) => setAlertFrequency(e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <input
                type="datetime-local"
                value={alertTime}
                onChange={(e) => setAlertTime(e.target.value)}
                required
              />
              <button type="submit">Add Alert</button>
            </form>
          </div>

          {/* Display List of Alerts */}
          <div className="alert-list">
            {alerts.map((alert) => (
              <div key={alert.id} className="alert-item">
                <div>
                  <strong>{alert.name}</strong> - {alert.frequency} -{" "}
                  {new Date(alert.time).toLocaleString()}
                </div>
                <button onClick={() => handleRemoveAlert(alert.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Pollution Level Alert */}
          {pollutionAlert && <div className="alert-item">{pollutionAlert}</div>}
        </section>

        <section className="health-impact" id="health-impact">
          <h2>Health Impact Forecasting</h2>
          <div className="forecast-grid">
            <div>
              <strong>Advices:</strong> {healthAdvice}
            </div>
          </div>
        </section>
      </main>

      {/* Notifications Section */}
      <section className="notifications">
        <h3>Recent Notifications</h3>
        <div className="notification-grid">
          <div className="notification-card">
            New Health Alert in your area!
          </div>
          <div className="notification-card">
            Traffic levels are high this morning.
          </div>
          <div className="notification-card">
            New air quality forecast is available.
          </div>
          <div className="notification-card">
            Reminder: Update your custom alerts.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
