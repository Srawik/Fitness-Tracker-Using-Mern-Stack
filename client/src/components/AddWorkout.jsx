import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

/* ================= STYLES ================= */

const Card = styled.div`
  flex: 1;
  min-width: 260px;
  max-width: 380px;
  padding: 16px 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_primary + "15"};
  box-shadow: 0px 8px 24px ${({ theme }) => theme.primary + "12"};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 12px 30px ${({ theme }) => theme.primary + "20"};
  }

  @media (max-width: 600px) {
    padding: 14px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + "20"};
  padding: 4px 10px;
  border-radius: 8px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Sets = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const Flex = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 4px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

/* ================= COMPONENT ================= */

const WorkoutCard = ({ workout }) => {
  const {
    category = "general",
    workoutName = "Workout",
    sets = 0,
    reps = 0,
    weight = 0,
    duration = 0,
  } = workout || {};

  return (
    <Card>
      <Category>#{category}</Category>

      <Name>{workoutName}</Name>

      <Sets>
        Count: {sets} sets × {reps} reps
      </Sets>

      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: 18 }} />
          {weight} kg
        </Details>

        <Details>
          <TimelapseRounded sx={{ fontSize: 18 }} />
          {duration} min
        </Details>
      </Flex>
    </Card>
  );
};

export default WorkoutCard;
