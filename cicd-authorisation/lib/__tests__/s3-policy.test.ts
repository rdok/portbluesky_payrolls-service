import { Stack } from "aws-cdk-lib";
import { Config } from "../config";
import { Match, Template } from "aws-cdk-lib/assertions";
import { Role, User } from "aws-cdk-lib/aws-iam";
import { S3Policy } from "../s3-policy";

const testStack = new Stack();
const config = new Config();
const stackRegex = `${config.org}-*-${config.name}*`;
const user = new User(testStack, "CICDUser", { userName: "CICDStackName" });
const role = new Role(testStack, "Role", { assumedBy: user });
new S3Policy(testStack, { stackRegex, config, role });
const template = Template.fromStack(testStack);

test("Authorise management of S3 storage", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: [
            "s3:CreateBucket",
            "s3:DeleteBucket",
            "s3:PutObject",
            "s3:GetObject",
            "s3:DeleteObjectVersion",
            "s3:RestoreObject",
            "s3:ListBucket",
            "s3:DeleteObject",
            "s3:GetBucketPolicy",
            "s3:PutBucketPolicy",
            "s3:DeleteBucketPolicy",
            "s3:GetLifecycleConfiguration",
            "s3:PutLifecycleConfiguration"
          ],
          Effect: "Allow",
          Resource: `arn:aws:s3:::${stackRegex}`,
        },
      ]),
    },
  });
});
