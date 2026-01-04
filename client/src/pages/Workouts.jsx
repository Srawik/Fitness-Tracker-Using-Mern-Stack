import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts } from "../api";
import { CircularProgress } from "@mui/material";

/* ================= STYLES ================= */

const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 22px 0;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0 16px;

  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.25;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + "15"};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
`;

const Right = styled.div`
  flex: 1;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 22px;
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const EmptyText = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

/* ================= COMPONENT ================= */

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getWorkouts(date);
      setWorkouts(res?.data?.todaysWorkouts || []);
    } catch (err) {
      console.error("Failed to fetch workouts", err);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return (
    <Container>
      <Wrapper>
        {/* ===== LEFT: DATE PICKER ===== */}
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(newDate) =>
                setDate(newDate ? newDate.format("YYYY-MM-DD") : "")
              }
            />
          </LocalizationProvider>
        </Left>

        {/* ===== RIGHT: WORKOUTS LIST ===== */}
        <Right>
          <Section>
            <SecTitle>
              {date ? `Workouts on ${date}` : "Today's Workouts"}
            </SecTitle>

            {loading ? (
              <Center>
                <CircularProgress />
              </Center>
            ) : workouts.length > 0 ? (
              <CardWrapper>
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout._id}
                    workout={workout}
                  />
                ))}
              </CardWrapper>
            ) : (
              <EmptyText>No workouts found</EmptyText>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
