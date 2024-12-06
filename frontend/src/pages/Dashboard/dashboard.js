import React, { useState, useEffect, useCallback } from "react"; // Correct import for useEffect
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Plot from "react-plotly.js"; // Correct import statement
import {
  faHouse,
  faDesktop,
  faMap,
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

const pieData = [
  { name: "Pollution", value: 30 },
  { name: "Health", value: 25 },
  { name: "Traffic", value: 40 },
  { name: "Other", value: 5 },
];

const barData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
];

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
        const heat = L.heatLayer(aqiData, {
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

      // Reload the page with the selected location in the query parameters
      window.location.search = `?location=${newLocation}`;
    };
  
  useEffect(() => {
    // Re-render charts when location changes
    if (selectedLocation) {
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
            <a href="#heat-map">
              <FontAwesomeIcon icon={faMapLocationDot} /> Heat Map
            </a>
          </li>
          <li>
            <a href="#stacked-bar">
              <FontAwesomeIcon icon={faChartBar} /> Stacked Bar
            </a>
          </li>
          <li>
            <a href="#gauge-chart">
              <FontAwesomeIcon icon={faTachometerAlt} /> Gauge Chart
            </a>
          </li>
          <li>
            <a href="#alerts">
              <FontAwesomeIcon icon={faMap} /> Map
            </a>
          </li>
          <li>
            <a href="#health-impact">
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
            <h3>Pie Chart</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"][index]
                        }
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
            <h3>Bar Chart</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="uv" fill="#8884d8" />
                  <Bar dataKey="pv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Heat Map (Placeholder with ComposedChart) */}
          <section id="heat-map" className="chart-card">
            <h3>Heat Map</h3>
            <div className="chart-container">
              <HeatMap />
            </div>
          </section>

          {/* Stacked Bar Chart */}
          <section id="stacked-bar" className="chart-card">
            <h3>Stacked Bar Chart</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} stackOffset="sign">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="uv" stackId="a" fill="#8884d8" />
                  <Bar dataKey="pv" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Gauge Chart */}
          <section id="gauge-chart" className="chart-card">
            <h3>Gauge Chart</h3>
            <div className="chart-container">
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={20} // Number of color levels
                colors={["#FFCE56", "#4CAF50"]} // Color range
                arcWidth={0.3} // Width of the arc
                percent={0.25} // Percentage to display (0.25 = 25%)
                textColor="#000" // Label color
                needleColor="#000" // Needle color
              />
            </div>
          </section>
        </section>

        <section className="map-section">
          <h2>City Map</h2>
          <div className="map-container">
            <iframe
              title="City Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13603.970581227723!2d73.1350!3d31.4504!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39226838e6d50a4f%3A0x434a01c71c0910ff!2sFaisalabad%2C%20Punjab!5e0!3m2!1sen!2s!4v1690032457308!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
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
