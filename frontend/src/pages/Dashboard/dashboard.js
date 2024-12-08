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

  const [jsonData, setJsonData] = useState(null); // To store your JSON data
  const [locations, setLocations] = useState([]); // To store locations
  const [selectedLocation, setSelectedLocation] = useState(null); // To store selected location

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
  const gaugePercent = latestAQI / 500; // Assuming AQI scale is 0-500

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
            <a href="#alerts">
              <FontAwesomeIcon icon={faBell} /> ALerts
            </a>
          </li>
          <li>
            <a href="#health-impact">
              <FontAwesomeIcon icon={faHeartPulse} /> Health Impact
            </a>
          </li>
          <li>
            <a href="#logout">Logout</a>
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
                percent={gaugePercent}
                textColor="#000"
                needleColor="#000"
              />
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

        <section className="custom-alerts" id="alerts">
          <h2>Custom Alerts</h2>
          <div className="alert-buttons">
            <button>Alerts</button>
            <button>Notifications</button>
            <button>Updates</button>
          </div>
        </section>

        <section className="health-impact" id="health-impact">
          <h2>Health Impact Forecasting</h2>
          <div className="forecast-grid">
            <div>Air Quality</div>
            <div>Climate Data</div>
            <div>Traffic Rush Hours</div>
            <div>Smart Homes</div>
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
