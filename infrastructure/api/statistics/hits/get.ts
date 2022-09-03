import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { TABLE_NAME, getSlugPathParameter, getHeaders } from "../constants";

const dbClient = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const slug = getSlugPathParameter(event);

  const params = {
    TableName: TABLE_NAME,
    Key: {
      PK: `ARTICLE#${slug}`,
      SK: `ARTICLE#${slug}`,
    },
  };

  try {
    const item = await dbClient.get(params).promise();
    const hits = (item?.Item?.["Hits"] || 0) as number;

    return {
      statusCode: 200,
      headers: getHeaders(event),
      body: JSON.stringify({
        hits: hits,
      }),
    };
  } catch {
    return { statusCode: 500, body: "Internal error" };
  }
};
