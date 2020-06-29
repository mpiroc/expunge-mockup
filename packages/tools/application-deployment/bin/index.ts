#!/usr/bin/env node

import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import { LambdaPackage } from '../lib'

async function main(): Promise<void> {
    const app: cdk.App = new cdk.App()
    const stack: cdk.Stack = new cdk.Stack(app, `expunge-backend`)

    new LambdaPackage(stack, `add-subscription`, {
        packageName: `@code-for-baltimore/add-subscription`,
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: `index.handler`
    })
}

/* eslint-disable @typescript-eslint/no-floating-promises */
main().catch(console.error)
/* eslint-enable @typescript-eslint/no-floating-promises */
