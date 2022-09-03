import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { getHeaders, TABLE_NAME } from "./constants";

const dbClient = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      PK: `TOTAL`,
      SK: `TOTAL`,
    },
  };

  try {
    const item = await dbClient.get(params).promise();
    const hits = (item?.Item?.["Hits"] || 0) as number;

    return {
      statusCode: 200,
      headers: getHeaders(event),
      body: JSON.stringify({
        hits,
      }),
    };
  } catch {
    return { statusCode: 500, body: "Internal error" };
  }
};
