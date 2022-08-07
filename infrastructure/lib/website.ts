import { Duration, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53_targets from "aws-cdk-lib/aws-route53-targets";
import * as iam from "aws-cdk-lib/aws-iam";

export interface WebsiteProps {
  domainName: string;
  appPath: string;
}

export class Website extends Construct {
  private wwwDomainName: string;
  private nakedDomainName: string;
  private wildcardDomainName: string;
  private wwwDomainBucket: s3.Bucket;
  private nakedDomainBucket: s3.Bucket;
  private oai: cloudfront.OriginAccessIdentity;

  private wwwDistribution: cloudfront.Distribution;
  private nakedDistribution: cloudfront.Distribution;

  private hostedZone: route53.IHostedZone;
  private certificate: acm.DnsValidatedCertificate;

  private appPath: string;

  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    this.nakedDomainName = props.domainName;
    this.wwwDomainName = `www.${props.domainName}`;
    this.wildcardDomainName = `*.${props.domainName}`;
    this.appPath = props.appPath;

    this.initialize();
  }

  private initialize() {
    this.createHostedZone();
    this.createCertificate();

    this.createBuckets();
    this.createOriginAccessIdentity();
    this.createCloudfrontDistributions();
    this.createAliasRecords();
    this.createBucketDeployment();
  }

  private createHostedZone() {
    this.hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: this.nakedDomainName,
    });
  }

  private createCertificate() {
    // const cert = new acm.Certificate(this, "WebCert", {
    //   domainName: this.nakedDomainName,
    //   subjectAlternativeNames: [this.wildcardDomainName],
    //   validation: acm.CertificateValidation.fromDns(),
    //   region: "us-east-1",
    // });

    this.certificate = new acm.DnsValidatedCertificate(this, "Certificate", {
      domainName: this.nakedDomainName,
      subjectAlternativeNames: [this.wildcardDomainName],
      hostedZone: this.hostedZone,
      region: "us-east-1",
    });
  }

  private createBuckets() {
    this.wwwDomainBucket = new s3.Bucket(this, "WwwDomainBucket", {
      bucketName: this.wwwDomainName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      // destroy bucket
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.nakedDomainBucket = new s3.Bucket(this, "NakedDomainBucket", {
      bucketName: this.nakedDomainName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      // redirects to the www canonical website
      websiteRedirect: { hostName: this.wwwDomainName },

      // destroy bucket
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }

  private createOriginAccessIdentity() {
    // create the origin access identity
    this.oai = new cloudfront.OriginAccessIdentity(this, "CloudfrontAccess");

    // assign the origin access identity to the buckets
    this.assignOriginAccessIdentity(this.wwwDomainBucket);
    this.assignOriginAccessIdentity(this.nakedDomainBucket);
  }

  private assignOriginAccessIdentity(bucket: s3.Bucket) {
    const cloudfrontUserAccessPolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [bucket.arnForObjects("*")],
      principals: [
        new iam.CanonicalUserPrincipal(
          this.oai.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
    });
    bucket.addToResourcePolicy(cloudfrontUserAccessPolicy);
  }

  private createCloudfrontDistributions() {
    this.wwwDistribution = this.createCloudfrontDistribution(true);
    this.nakedDistribution = this.createCloudfrontDistribution(false);
  }

  private createCloudfrontDistribution(www: boolean) {
    const distributionName = www ? "WwwDistribution" : "NakedDistribution";
    const domainName = www ? this.wwwDomainName : this.nakedDomainName;
    const bucket = www ? this.wwwDomainBucket : this.nakedDomainBucket;
    const defaultRootObject = www ? "index.html" : undefined;

    return new cloudfront.Distribution(this, distributionName, {
      certificate: this.certificate,
      defaultRootObject: defaultRootObject,
      domainNames: [domainName],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(bucket, {
          originAccessIdentity: this.oai,
        }),
        // origin: new cloudfront_origins.HttpOrigin(bucket.bucketWebsiteDomainName),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }

  private createAliasRecords() {
    new route53.ARecord(this, "WwwARecord", {
      recordName: this.wwwDomainName,
      target: route53.RecordTarget.fromAlias(
        new route53_targets.CloudFrontTarget(this.wwwDistribution)
      ),
      zone: this.hostedZone,
    });

    new route53.AaaaRecord(this, "WwwAAAARecord", {
      recordName: this.wwwDomainName,
      target: route53.RecordTarget.fromAlias(
        new route53_targets.CloudFrontTarget(this.wwwDistribution)
      ),
      zone: this.hostedZone,
    });

    new route53.ARecord(this, "NakedARecord", {
      recordName: this.nakedDomainName,
      target: route53.RecordTarget.fromAlias(
        new route53_targets.CloudFrontTarget(this.nakedDistribution)
      ),
      zone: this.hostedZone,
    });

    new route53.AaaaRecord(this, "NakedAAAARecord", {
      recordName: this.nakedDomainName,
      target: route53.RecordTarget.fromAlias(
        new route53_targets.CloudFrontTarget(this.nakedDistribution)
      ),
      zone: this.hostedZone,
    });
  }

  private createBucketDeployment() {
    new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
      sources: [s3deploy.Source.asset(this.appPath)],
      destinationBucket: this.wwwDomainBucket,
      distribution: this.wwwDistribution,
      distributionPaths: ["/*"],
    });
  }
}
