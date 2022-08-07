import { Stack, StackProps, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as pipelines from "aws-cdk-lib/pipelines";
import { BenoitPaulWebsiteStack } from "./benoitpaul-website-stack";

class BenoitPaulStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    // new BenoitPaulWebsiteStack(this, "BenoitPaulWebsiteProdStack", {
    //   env: getEnvConfig("prod").env,
    // });

    new BenoitPaulWebsiteStack(this, "BenoitPaulWebsiteProdStack");
  }
}

export class BenoitPaulPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      crossAccountKeys: false,
      synth: new pipelines.ShellStep("Synth", {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: pipelines.CodePipelineSource.connection(
          "benoitpaul/benoitpaul.com",
          "main",
          {
            connectionArn:
              "arn:aws:codestar-connections:us-east-1:353417148721:connection/9b9e2ac9-9bcf-450f-810b-8bf5a989d161",
          }
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
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
