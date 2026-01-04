import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

export const counts = [
  {
    name: "Calories Burned",
    icon: (
      <LocalFireDepartmentRounded
        sx={{ color: "inherit", fontSize: 26 }}
      />
    ),
    desc: "Total calories burned today",
    key: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#EB9E34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Workouts",
    icon: (
      <FitnessCenterRounded
        sx={{ color: "inherit", fontSize: 26 }}
      />
    ),
    desc: "Total number of workouts today",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Average Calories Burned",
    icon: (
      <TimelineRounded
        sx={{ color: "inherit", fontSize: 26 }}
      />
    ),
    desc: "Average calories burned per workout",
    key: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];
