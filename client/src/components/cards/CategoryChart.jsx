import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

/* ================= STYLES ================= */

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + "15"};
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

const EmptyText = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 40px;
`;

/* ================= COMPONENT ================= */

const CategoryChart = ({ data }) => {
  const pieData = Array.isArray(data?.pieChartData)
    ? data.pieChartData.map((item, index) => ({
        id: item.id ?? index,
        value: item.value,
        label: item.label,
      }))
    : [];

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>

      {pieData.length > 0 ? (
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 45,     // ⬅️ bigger donut like video
              outerRadius: 110,
              paddingAngle: 4,
              cornerRadius: 6,
            },
          ]}
          height={260}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
              padding: 0,
            },
          }}
        />
      ) : (
        <EmptyText>No workout data available</EmptyText>
      )}
    </Card>
  );
};

export default CategoryChart;
