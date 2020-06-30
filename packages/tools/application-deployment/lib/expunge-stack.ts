import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import { FunctionWithInputQueue } from './function-with-input-queue'

export class ExpungeStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id)

        const addSubscriptionPackage = new FunctionWithInputQueue(this, `add-subscription`, {
            packageName: `@code-for-baltimore/add-subscription`,
            runtime: lambda.Runtime.NODEJS_12_X,
            handlerFunctionName: `handler`
        })
        const enqueueUpdatesPackage = new FunctionWithInputQueue(this, `enqueue-updates`, {
            packageName: `@code-for-baltimore/enqueue-updates`,
            runtime: lambda.Runtime.NODEJS_12_X,
            handlerFunctionName: `handler`
        })
    
        enqueueUpdatesPackage.grantSendMessages(addSubscriptionPackage)
    }
}