#!/usr/bin/env node

import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'

async function main(): Promise<void> {
    const app: cdk.App = new cdk.App()
    const stack: cdk.Stack = new cdk.Stack(app, `expunge-backend`)

    /* eslint-disable no-new */
    new lambda.Function(stack, `exampleFunction`, {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromInline(`exports.handler = async function(event) { console.log("Hello, World!"); }`),
        handler: `index.handler`
    })
    /* eslint-disable no-new */
}

/* eslint-disable @typescript-eslint/no-floating-promises */
main().catch(console.error)
/* eslint-enable @typescript-eslint/no-floating-promises */
