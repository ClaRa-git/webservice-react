import { createSelector } from "@reduxjs/toolkit";

const selectPlans = (state) => state.plans.plans;
const selectLoading = (state) => state.plans.loading;

const planSelector = createSelector(
    [selectPlans, selectLoading],
    (plans, loading)=>({plans, loading})
)

export default planSelector;