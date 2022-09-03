import { Stack, StackProps, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as pipelines from "aws-cdk-lib/pipelines";
import { BenoitPaulWebsiteStack } from "./benoitpaul-website-stack";
import { BenoitPaulStatisticsStack } from "./benoitpaul-statistics-stack";

class BenoitPaulStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new BenoitPaulStatisticsStack(this, "BenoitPaulStatisticsStack");
    new BenoitPaulWebsiteStack(this, "BenoitPaulWebsiteStack");
  }
}

export class BenoitPaulPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const source = pipelines.CodePipelineSource.connection(
      "benoitpaul/benoitpaul.com",
      "main",
      {
        connectionArn:
          "arn:aws:codestar-connections:us-east-1:353417148721:connection/9b9e2ac9-9bcf-450f-810b-8bf5a989d161",
      }
    );

    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      crossAccountKeys: false,
      synth: new pipelines.ShellStep("Synth", {
        input: source,
        commands: [
          "cd website",
          "npm ci",
          "npm run build:export",
          "cd ../infrastructure",
          "npm ci",
          "npm run build",
          "npx cdk synth",
        ],
        primaryOutputDirectory: "infrastructure/cdk.out",
      }),
    });

    const prodEnv = this.node.tryGetContext("prod").env;
    pipeline.addStage(
      new BenoitPaulStage(this, "Prod", {
        env: prodEnv,
      })
    );
  }
}
