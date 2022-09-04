import { APIGatewayProxyEvent } from "aws-lambda";

export const TABLE_NAME = process.env.TABLE_NAME!;

export const getSlugPathParameter = (event: APIGatewayProxyEvent) => {
  const slug = event.pathParameters!.slug;
  if (!slug) {
    throw new Error(`slug not provided`);
  }
  return slug;
};

const allowedOrigins = ["https://www.benoitpaul.com", "http://localhost:3000"];

export const getHeaders = (event: APIGatewayProxyEvent) => {
  const origin = event.headers.Origin || event.headers.origin;
  const validOrigin = allowedOrigins.find((allowedOrigin) =>
    origin?.match(allowedOrigin)
  );

  if (!validOrigin) {
    console.log(`invalid origin: ${origin}`);
  }

  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": validOrigin || allowedOrigins[0],
  };
};
