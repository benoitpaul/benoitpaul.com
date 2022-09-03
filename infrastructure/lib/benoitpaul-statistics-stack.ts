import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as logs from "aws-cdk-lib/aws-logs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { join } from "path";
import { Cors } from "aws-cdk-lib/aws-apigateway";

export class BenoitPaulStatisticsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const statisticsTable = new dynamodb.Table(this, "StatisticsTable", {
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const getStatisticsLambda = new lambda_nodejs.NodejsFunction(
      this,
      "GetStatistics",
      {
        entry: join(__dirname, "..", "api", "statistics", "get-total.ts"),
        handler: "handler",
        logRetention: logs.RetentionDays.ONE_WEEK,
        environment: {
          TABLE_NAME: statisticsTable.tableName,
        },
      }
    );
    statisticsTable.grantReadData(getStatisticsLambda);

    const getArticleStatisticsLambda = new lambda_nodejs.NodejsFunction(
      this,
      "GetArticleStatistics",
      {
        entry: join(__dirname, "..", "api", "statistics", "get.ts"),
        handler: "handler",
        logRetention: logs.RetentionDays.ONE_WEEK,
        environment: {
          TABLE_NAME: statisticsTable.tableName,
        },
      }
    );
    statisticsTable.grantReadData(getArticleStatisticsLambda);

    const incrementArticleHitCountLambda = new lambda_nodejs.NodejsFunction(
      this,
      "IncrementArticleHitCount",
      {
        entry: join(__dirname, "..", "api", "statistics", "increment-hits.ts"),
        handler: "handler",
        logRetention: logs.RetentionDays.ONE_WEEK,
        environment: {
          TABLE_NAME: statisticsTable.tableName,
        },
      }
    );
    statisticsTable.grantReadWriteData(incrementArticleHitCountLambda);

    const api = new apigateway.RestApi(this, "api", {
      // 👇 set up CORS
      // defaultCorsPreflightOptions: {
      //   allowHeaders: Cors.DEFAULT_HEADERS.concat("x-api-key"),
      //   allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
      //   allowCredentials: true,
      //   allowOrigins: ["http://localhost:3000"],
      // },
    });

    const statisticsResource = api.root.addResource("statistics");
    statisticsResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getStatisticsLambda)
    );

    const articleResource = statisticsResource.addResource("{slug}");
    articleResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getArticleStatisticsLambda)
    );

    const hitsResource = articleResource.addResource("hits");
    hitsResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(incrementArticleHitCountLambda)
    );
  }
}
