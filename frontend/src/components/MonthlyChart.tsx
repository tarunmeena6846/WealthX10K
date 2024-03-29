import React, { useEffect, useRef } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  ChartTypeRegistry,
} from "chart.js";

interface MonthlyChartProps {
  monthlyIncome: number;
  monthlyExpenses: number;
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({
  monthlyIncome,
  monthlyExpenses,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<
    keyof ChartTypeRegistry,
    number[],
    string
  > | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      // Destroy the previous chart instance
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Register Chart.js components
        Chart.register(DoughnutController, ArcElement, Legend, Title);

        chartInstance.current = new Chart(ctx, {
          type: "doughnut" as keyof ChartTypeRegistry,
          data: {
            labels: [`Income`, `Expenses`],
            datasets: [
              {
                label: "Monthly Income and Expenses",
                data: [monthlyIncome, monthlyExpenses],
                backgroundColor: ["#76d6f3", "#f377e7"],
                hoverOffset: 4,
              },
            ],
          },
          plugins: [
            DoughnutController,
            ArcElement,
            Legend,
            Title,
            {
              id: "beforeDrawPlugin", // Add the id property
              beforeDraw: (chart) => {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;

                const total = monthlyIncome + monthlyExpenses;
                const savingPercentage = Math.round(
                  ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
                );

                ctx.restore();
                const fontSize = height / 500;
                const font = `bold ${fontSize}em sans-serif`; // Make the text bold
                ctx.font = font;
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#000";

                const text = `${savingPercentage}% Savings`;

                const textX = width / 2 - ctx.measureText(text).width / 2;
                const textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
              },
            },
          ],
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        // Destroy the chart instance when the component is unmounted
        chartInstance.current.destroy();
      }
    };
  }, [monthlyIncome, monthlyExpenses]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MonthlyChart;
