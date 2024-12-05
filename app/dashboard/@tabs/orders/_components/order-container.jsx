import { overviewDataFromOrder } from "@/queries/orders";
import OrderList from "./orders-list";

async function OrderContainer() {
  const { orders } = await overviewDataFromOrder();
  return <OrderList orders={orders} />;
}

export default OrderContainer;
