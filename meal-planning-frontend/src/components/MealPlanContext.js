import React, { createContext, useState } from "react";

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({});

  const addRecipeToMealPlan = (date, recipe) => {
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [date]: [...(prevPlan[date] || []), recipe],
    }));
  };

  return (
    <MealPlanContext.Provider value={{ mealPlan, addRecipeToMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => React.useContext(MealPlanContext);

export default MealPlanContext;