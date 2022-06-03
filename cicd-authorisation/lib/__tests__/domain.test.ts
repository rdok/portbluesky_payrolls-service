import { Stack } from "aws-cdk-lib";
import { Effect, Role, User } from "aws-cdk-lib/aws-iam";
import { Config } from "../config";
import { Match, Template } from "aws-cdk-lib/assertions";
import { DomainPolicy } from "../domain-policy";

const config = new Config();
const stack = new Stack();
const stackRegex = `${config.org}-*-${config.name}*`;
const user = new User(stack, "CICDUser", { userName: "CICDStackName" });
const role = new Role(stack, "Role", { assumedBy: user });
new DomainPolicy(stack, { stackRegex, config, role });
const template = Template.fromStack(stack);

test("Authorise API Gateway domain management", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "apigateway:*",
          Effect: "Allow",
          Resource: "arn:aws:apigateway:*::/domainnames/*",
        },
      ]),
    },
  });
});

test("Authorise getting hosted zone of", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: [
            "route53:GetHostedZone",
            "route53:ChangeResourceRecordSets",
            "route53:GetChange",
          ],
          Effect: "Allow",
          Resource: [
            `arn:aws:route53:::hostedzone/${config.baseDomainHostedZoneId}`,
            "arn:aws:route53:::change/*",
          ],
        },
      ]),
    },
  });
});

test("Authorise managing service Route53 record set for API Gateway", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "apigateway:*",
          Effect: Effect.ALLOW,
          Resource: "arn:aws:apigateway:*::/domainnames/*",
        },
      ]),
    },
  });
});
