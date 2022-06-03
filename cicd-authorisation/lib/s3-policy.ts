import { Stack } from "aws-cdk-lib";
import { Effect, ManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { RolePolicyProps } from "./types";

export class S3Policy {
  constructor(stack: Stack, { role, stackRegex }: RolePolicyProps) {
    const managedPolicy = new ManagedPolicy(stack, "S3Policy", {
      description: `Policy to manage S3 service: ${stack.stackName}`,
      roles: [role],
    });

    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:s3:::${stackRegex}`],
        actions: [
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
        ],
      })
    );
  }
}
