import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import {
  addWorkout,
  getDashboardDetails,
  getWorkouts,
} from "../api";

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
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Title = styled.div`
  padding: 0 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 22px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

/* ================= COMPONENT ================= */

const Dashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [workoutLoading, setWorkoutLoading] = useState(false);
  const [data, setData] = useState(null);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [workout, setWorkout] = useState(`#Legs
Squats
5 sets X 15 reps
30 kg
10 min`);

  /* ===== Dashboard Stats ===== */
  const fetchDashboardData = useCallback(async () => {
    try {
      setDashboardLoading(true);
      const res = await getDashboardDetails();
      setData(res.data);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  /* ===== Today's Workouts ===== */
  const fetchTodaysWorkouts = useCallback(async () => {
    try {
      setWorkoutLoading(true);
      const res = await getWorkouts("");
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
    } catch (err) {
      console.error("Workout fetch failed", err);
    } finally {
      setWorkoutLoading(false);
    }
  }, []);

  /* ===== Add Workout ===== */
  const addNewWorkout = async () => {
    if (!workout.trim()) return;

    try {
      setButtonLoading(true);
      await addWorkout({ workoutString: workout });
      setWorkout("");
      fetchDashboardData();
      fetchTodaysWorkouts();
    } catch (err) {
      alert("Failed to add workout");
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchTodaysWorkouts();
  }, [fetchDashboardData, fetchTodaysWorkouts]);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>

        {/* ===== COUNTS ===== */}
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard
              key={item.key}
              item={item}
              data={data}
              loading={dashboardLoading}
            />
          ))}
        </FlexWrap>

        {/* ===== STATS + ADD WORKOUT ===== */}
        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        {/* ===== TODAY'S WORKOUTS ===== */}
        <Section>
          <Title>Today&apos;s Workouts</Title>

          <CardWrapper>
            {workoutLoading ? (
              <EmptyText>Loading workouts...</EmptyText>
            ) : todaysWorkouts.length > 0 ? (
              todaysWorkouts.map((item) => (
                <WorkoutCard
                  key={item._id}
                  workout={item}
                />
              ))
            ) : (
              <EmptyText>No workouts added today</EmptyText>
            )}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
