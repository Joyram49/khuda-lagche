"use client";
import React from "react";
import FoodOrderTable from "./order-table";

const FilteredOrdersComponent = React.memo(({ filteredOrders }) => {
  return <FoodOrderTable filteredOrders={filteredOrders} />;
});

export default FilteredOrdersComponent;
