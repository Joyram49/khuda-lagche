import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export const EmailTemplate = ({ details }) => {
  let message;

  switch (details.type) {
    case "user":
      message = (
        <Html>
          <Head />
          <Preview>
            Your order {details.orderNumber} is being processed!
          </Preview>
          <Body style={main}>
            <Container style={container}>
              <Heading style={h1}>Hello {details.userName},</Heading>
              <Text style={text}>
                Thank you for ordering from <strong>FoodAnyDay</strong>! Your
                order {details.orderNumber} is being processed.
              </Text>
              <Text style={text}>
                <strong>Order Details:</strong>
              </Text>
              <ul>
                {details.orderItems.map((item, index) => (
                  <li key={index} style={text}>
                    {item.description} (x{item.quantity}):{" "}
                    {item.price.unit_amount / 100} BDT
                  </li>
                ))}
              </ul>
              <Text style={text}>
                <strong>Total Amount:</strong> {details.totalAmount} BDT
              </Text>
              <Text style={text}>Enjoy your meal!</Text>
              <Text style={text}>
                Best regards, <strong>FoodAnyDay</strong> Team
              </Text>
            </Container>
          </Body>
        </Html>
      );
      break;

    case "billing":
      message = (
        <Html>
          <Head />
          <Preview>Payment received for order {details.orderNumber}</Preview>
          <Body style={main}>
            <Container style={container}>
              <Heading style={h1}>Hi {details.billingName},</Heading>
              <Text style={text}>
                Thank you for the payment for Order {details.orderNumber}.
              </Text>
              <Text style={text}>
                <strong>Order Placed By:</strong> {details.userName}
              </Text>
              <Text style={text}>
                <strong>Total Amount Paid:</strong> {details.totalAmount} BDT
              </Text>
              <Text style={text}>
                Best regards, <strong>FoodAnyDay</strong> Team
              </Text>
            </Container>
          </Body>
        </Html>
      );
      break;

    case "restaurant":
      message = (
        <Html>
          <Head />
          <Preview>You have received a new order {details.orderNumber}</Preview>
          <Body style={main}>
            <Container style={container}>
              <Heading style={h1}>Hello {details.restaurantName},</Heading>
              <Text style={text}>You have received a new order!</Text>
              <Text style={text}>
                <strong>Order Summary:</strong>
              </Text>
              <Text style={text}>- Order Number: {details.orderNumber}</Text>
              <Text style={text}>- Customer Name: {details.userName}</Text>
              <Text style={text}>
                - Delivery/Pickup Time: {details.deliveryTime}
              </Text>
              <Text style={text}>
                <strong>Items Ordered:</strong>
              </Text>
              <ul>
                {details.orderItems.map((item, index) => (
                  <li key={index} style={text}>
                    {item.description} (x{item.quantity})
                  </li>
                ))}
              </ul>
              <Text style={text}>
                <strong>Total Amount:</strong> {details.totalAmount} BDT
              </Text>
              <Text style={text}>
                Please prepare the order as soon as possible.
              </Text>
              <Text style={text}>
                Best regards, <strong>FoodAnyDay</strong> Team
              </Text>
            </Container>
          </Body>
        </Html>
      );
      break;

    default:
      message = (
        <Html>
          <Head />
          <Preview>Invalid recipient type</Preview>
          <Body style={main}>
            <Container style={container}>
              <Heading style={h1}>Invalid recipient type</Heading>
              <Text style={text}>
                Please check your email template configuration.
              </Text>
            </Container>
          </Body>
        </Html>
      );
      break;
  }

  return message;
};

// Inline styles for email components
const main = {
  fontFamily: "robotoSlab, sans-serif",
  backgroundColor: "#f9f9f9",
  padding: "20px",
};

const container = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
};

const text = {
  fontSize: "16px",
  color: "#555555",
  lineHeight: "1.5",
};
