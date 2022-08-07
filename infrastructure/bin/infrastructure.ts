#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BenoitPaulPipelineStack } from "../lib/benoitpaul-pipeline-stack";

const getEnvConfig = (configName: string) => {
  const envConfig = app.node.tryGetContext(configName);
  return envConfig;
};

const app = new cdk.App();

new BenoitPaulPipelineStack(app, "BenoitPaulPipelineStack", {
  env: getEnvConfig("prod").env,
});
app.synth();

// new BenoitPaulWebsiteStack(app, "BenoitPaulWebsiteProdStack", {
//   env: getEnvConfig("prod").env,
// });
