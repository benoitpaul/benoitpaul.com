import * as cdk from "aws-cdk-lib";
import { Capture, Match, Template } from "aws-cdk-lib/assertions";
import { DOMAIN_NAME } from "../lib/constants";
import * as Infrastructure from "../lib/benoitpaul-website-stack";

const WWW_DOMAIN_NAME = `www.${DOMAIN_NAME}`;

const getLogicalIdFromResource = (resource: any) => {
  try {
    const resKeys = Object.keys(resource);
    if (resKeys.length !== 1) {
      throw new Error("Resource is not unique.");
    }
    const [logicalId] = resKeys;
    return logicalId;
  } catch (err) {
    console.log(resource);
    throw err;
  }
};

let stack: Infrastructure.BenoitPaulWebsiteStack;
const MOCK_STACK_PROPS = {
  env: {
    account: "account",
    region: "region",
  },
};

describe("BenoitPaulWebsiteStack", () => {
  beforeEach(() => {
    const app = new cdk.App();
    stack = new Infrastructure.BenoitPaulWebsiteStack(
      app,
      "BenoitPaulWebsiteTesStack",
      MOCK_STACK_PROPS
    );
  });

  test("WWW S3/Policy/OAI/Cloudfront/RecordSet", () => {
    const template = Template.fromStack(stack);

    // find the S3 bucket
    const bucket = template.findResources("AWS::S3::Bucket", {
      Properties: {
        BucketName: WWW_DOMAIN_NAME,
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
      },
    });

    const bucketLogicalId = getLogicalIdFromResource(bucket);

    // find the cloudfront distribution corresponding to the S3 bucket
    const originAccessIdentityLogicalIdCapture = new Capture();
    const distribution = template.findResources(
      "AWS::CloudFront::Distribution",
      {
        Properties: {
          DistributionConfig: {
            Aliases: [WWW_DOMAIN_NAME],
            Origins: [
              {
                DomainName: {
                  "Fn::GetAtt": [bucketLogicalId, "RegionalDomainName"],
                },
                S3OriginConfig: {
                  OriginAccessIdentity: {
                    "Fn::Join": [
                      "",
                      [
                        "origin-access-identity/cloudfront/",
                        {
                          Ref: originAccessIdentityLogicalIdCapture,
                        },
                      ],
                    ],
                  },
                },
              },
            ],
          },
        },
      }
    );
    const distributionLogicalId = getLogicalIdFromResource(distribution);

    // make sure there is a policy to allow GET access
    template.hasResourceProperties("AWS::S3::BucketPolicy", {
      Bucket: {
        Ref: bucketLogicalId,
      },
      PolicyDocument: {
        Statement: [
          Match.anyValue(),
          {
            Action: "s3:GetObject",
            Effect: "Allow",
            Principal: {
              CanonicalUser: {
                "Fn::GetAtt": [
                  originAccessIdentityLogicalIdCapture.asString(),
                  "S3CanonicalUserId",
                ],
              },
            },
            Resource: {
              "Fn::Join": [
                "",
                [
                  {
                    "Fn::GetAtt": [bucketLogicalId, "Arn"],
                  },
                  "/*",
                ],
              ],
            },
          },
        ],
      },
    });

    const trailingDotDomainName = `${WWW_DOMAIN_NAME}.`;

    // make sure A record is set
    template.hasResourceProperties("AWS::Route53::RecordSet", {
      Name: trailingDotDomainName,
      Type: "A",
      AliasTarget: {
        DNSName: {
          "Fn::GetAtt": [distributionLogicalId, "DomainName"],
        },
      },
    });

    // make sure AAAA record is set
    template.hasResourceProperties("AWS::Route53::RecordSet", {
      Name: trailingDotDomainName,
      Type: "AAAA",
      AliasTarget: {
        DNSName: {
          "Fn::GetAtt": [distributionLogicalId, "DomainName"],
        },
      },
    });
  });

  test("Naked S3/Cloudfront/RecordSet", () => {
    const template = Template.fromStack(stack);

    // find the S3 bucket
    const bucket = template.findResources("AWS::S3::Bucket", {
      Properties: {
        BucketName: DOMAIN_NAME,
        WebsiteConfiguration: {
          RedirectAllRequestsTo: {
            HostName: WWW_DOMAIN_NAME,
          },
        },
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
      },
    });

    const bucketLogicalId = getLogicalIdFromResource(bucket);

    // find the cloudfront distribution corresponding to the S3 bucket
    const distribution = template.findResources(
      "AWS::CloudFront::Distribution",
      {
        Properties: {
          DistributionConfig: {
            Aliases: [DOMAIN_NAME],
            Origins: [
              {
                DomainName: {
                  "Fn::Select": [
                    2,
                    {
                      "Fn::Split": [
                        "/",
                        {
                          "Fn::GetAtt": [bucketLogicalId, "WebsiteURL"],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        },
      }
    );
    const distributionLogicalId = getLogicalIdFromResource(distribution);

    const trailingDotDomainName = `${DOMAIN_NAME}.`;

    // make sure A record is set
    template.hasResourceProperties("AWS::Route53::RecordSet", {
      Name: trailingDotDomainName,
      Type: "A",
      AliasTarget: {
        DNSName: {
          "Fn::GetAtt": [distributionLogicalId, "DomainName"],
        },
      },
    });

    // make sure AAAA record is set
    template.hasResourceProperties("AWS::Route53::RecordSet", {
      Name: trailingDotDomainName,
      Type: "AAAA",
      AliasTarget: {
        DNSName: {
          "Fn::GetAtt": [distributionLogicalId, "DomainName"],
        },
      },
    });
  });
});
