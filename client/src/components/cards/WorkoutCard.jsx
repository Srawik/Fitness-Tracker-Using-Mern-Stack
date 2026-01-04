import React from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts/BarChart";

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

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const EmptyText = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

/* ================= COMPONENT ================= */

const WeeklyStatCard = ({ data }) => {
  const weeks = data?.totalWeeksCaloriesBurnt?.weeks ?? [];
  const calories =
    data?.totalWeeksCaloriesBurnt?.caloriesBurned ?? [];

  const hasValidData =
    Array.isArray(weeks) &&
    Array.isArray(calories) &&
    weeks.length > 0 &&
    calories.length > 0 &&
    weeks.length === calories.length;

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>

      {hasValidData ? (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: weeks,
            },
          ]}
          series={[
            {
              data: calories,
            },
          ]}
          height={300}
        />
      ) : (
        <EmptyText>No weekly data available</EmptyText>
      )}
    </Card>
  );
};

export default WeeklyStatCard;
