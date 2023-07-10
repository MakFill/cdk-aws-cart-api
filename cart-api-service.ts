#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CartApiServiceStack } from './lib/cart-api-stack';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new cdk.App();
new CartApiServiceStack(app, 'CartApiServiceStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.PRODUCT_AWS_REGION!,
  },
});
