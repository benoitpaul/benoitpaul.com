import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { TABLE_NAME, getSlugPathParameter, getHeaders } from "./constants";

const dbClient = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const slug = getSlugPathParameter(event);

  const incrementTotalHitCountParams = {
    TableName: TABLE_NAME,
    Key: {
      PK: `TOTAL`,
      SK: `TOTAL`,
    },
    UpdateExpression: `SET #hits = #hits + :incr`,
    ExpressionAttributeNames: {
      "#hits": "Hits",
    },
    ExpressionAttributeValues: {
      ":incr": 1,
    },
  };

  const incrementArticleHitCountParams = {
    TableName: TABLE_NAME,
    Key: {
      PK: `ARTICLE#${slug}`,
      SK: `ARTICLE#${slug}`,
    },
    // initialize the page hit count to 0 if it does not exist in the table
    // then increment by one
    UpdateExpression: `SET #hits = if_not_exists(#hits, :initial) + :num`,
    ExpressionAttributeNames: {
      "#hits": "Hits",
    },
    ExpressionAttributeValues: {
      ":num": 1,
      ":initial": 0,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    await dbClient.update(incrementTotalHitCountParams).promise();
    const updated = await dbClient
      .update(incrementArticleHitCountParams)
      .promise();

    const hits = updated?.Attributes?.["Hits"];

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
