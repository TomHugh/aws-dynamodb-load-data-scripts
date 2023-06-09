#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsDynamodbStack } from '../lib/aws-dynamodb-stack';

const app = new cdk.App();
new AwsDynamodbStack(app, 'AwsDynamodbStack');
