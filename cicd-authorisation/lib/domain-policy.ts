import { Stack } from "aws-cdk-lib";
import { Effect, ManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { RolePolicyProps } from "./types";

export class DomainPolicy {
  constructor(stack: Stack, { role, config }: RolePolicyProps) {
    const managedPolicy = new ManagedPolicy(stack, "DomainPolicy", {
      description: `Policy to manage custom domain for API Gateway: ${stack.stackName}`,
      roles: [role],
    });

    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [
          `arn:aws:route53:::hostedzone/${config.baseDomainHostedZoneId}`,
          "arn:aws:route53:::change/*",
        ],
        actions: [
          "route53:GetHostedZone",
          "route53:ChangeResourceRecordSets",
          "route53:GetChange",
        ],
      })
    );
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["arn:aws:apigateway:*::/domainnames/*"],
        actions: ["apigateway:*"],
      })
    );
  }
}
