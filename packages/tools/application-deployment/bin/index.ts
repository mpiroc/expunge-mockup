#!/usr/bin/env node

import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import { FunctionWithInputQueue } from '../lib'

async function main(): Promise<void> {
    const app: cdk.App = new cdk.App()
    const stack: cdk.Stack = new cdk.Stack(app, `expunge-backend`)

    const addSubscriptionPackage = new FunctionWithInputQueue(stack, `add-subscription`, {
        packageName: `@code-for-baltimore/add-subscription`,
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: `index.handler`
    })
    const enqueueUpdatesPackage = new FunctionWithInputQueue(stack, `enqueue-updates`, {
        packageName: `@code-for-baltimore/enqueue-updates`,
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: `index.handler`
    })

    enqueueUpdatesPackage.grantSendMessages(addSubscriptionPackage)
}

/* eslint-disable @typescript-eslint/no-floating-promises */
main().catch(console.error)
/* eslint-enable @typescript-eslint/no-floating-promises */
