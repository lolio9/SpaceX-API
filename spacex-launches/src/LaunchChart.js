import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function LaunchChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [view, setView] = useState("month");

  useEffect(() => {
    // Henter alle oppskytinger og grupperer dem
    axios.get("https://api.spacexdata.com/v5/launches").then((res) => {
      const grouped = {};

      res.data.forEach((l) => {
        const d = new Date(l.date_utc);
        let key;

        if (view === "month") key = `${d.getFullYear()}-${d.getMonth() + 1}`;
        if (view === "year") key = `${d.getFullYear()}`;
        if (view === "decade")
          key = `${Math.floor(d.getFullYear() / 10) * 10}s`;

        grouped[key] = (grouped[key] || 0) + 1;
      });

      const labels = Object.keys(grouped);
      const data = Object.values(grouped);

      const colors = labels.map((_, i) => `hsl(${(i * 47) % 360}, 70%, 60%)`);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Oppskytinger",
            data: data,
            backgroundColor: colors,
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      });
    });
  }, [view]);

  return (
    <div>
      <h2>Graf</h2>
      <select value={view} onChange={(e) => setView(e.target.value)}>
        <option value="month">Per måned</option>
        <option value="year">Per år</option>
        <option value="decade">Per tiår</option>
      </select>
      <div style={{ height: "500px" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 20,
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default LaunchChart;
