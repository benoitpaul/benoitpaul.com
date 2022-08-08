import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DOMAIN_NAME } from "./constants";
import { Website } from "./website";

export class BenoitPaulWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    if (props) {
      const { env } = props;
      console.log("BenoitPaulWebsiteStack for env", env);
    }

    new Website(this, "BenoitPaulWebsite", {
      domainName: DOMAIN_NAME,
      privateBuckets: false,
      appPath: "../website/out",
    });
  }
}
