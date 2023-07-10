import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';

export class CartApiServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = Vpc.fromLookup(this, 'CartLambdaVpc', {
      vpcId: process.env.VPC_ID,
    });

    const cartLambda = new NodejsFunction(this, 'cartLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      environment: {
        PRODUCT_AWS_REGION: process.env.PRODUCT_AWS_REGION!,
        PG_HOST: process.env.PG_HOST,
        PG_PORT: process.env.PG_PORT,
        PG_DATABASE: process.env.PG_DATABASE,
        PG_USERNAME: process.env.PG_USERNAME,
        PG_PASSWORD: process.env.PG_PASSWORD,
      },
      functionName: 'cartApi',
      entry: './dist/main.js',
      allowPublicSubnet: true,
      vpc,
      timeout: cdk.Duration.seconds(10),
      bundling: {
        externalModules: [
          'pg-native',
          'sqlite3',
          'pg-query-stream',
          'better-sqlite3',
          'tedious',
          'class-validator',
          'class-transformer',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
          '@nestjs/microservices',
        ],
      },
    });

    const api = new apiGateway.HttpApi(this, 'CartApi', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: [apiGateway.CorsHttpMethod.ANY],
      },
    });

    api.addRoutes({
      integration: new HttpLambdaIntegration(
        'cartLambdaIntegration',
        cartLambda,
      ),
      path: '/{proxy+}',
      methods: [apiGateway.HttpMethod.ANY],
    });
  }
}
