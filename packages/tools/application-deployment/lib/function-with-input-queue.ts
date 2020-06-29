import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'
import * as lambda from '@aws-cdk/aws-lambda'
import * as sqs from '@aws-cdk/aws-sqs'
import * as path from 'path'

export interface IFunctionWithInputQueueProps {
    runtime: lambda.Runtime,
    handler: string
    packageName: string
}

export class FunctionWithInputQueue extends cdk.Construct {
    private readonly _function: lambda.Function
    private readonly _inputQueue: sqs.IQueue

    public constructor(scope: cdk.Construct, id: string, { runtime, handler, packageName }: IFunctionWithInputQueueProps) {
        super(scope, id)

        const bundlePath = path.dirname(require.resolve(packageName))
        this._function = new lambda.Function(this, `function`, {
            runtime,
            handler,
            code: lambda.Code.fromAsset(bundlePath)
        })

        this._inputQueue = new sqs.Queue(this, `input-queue`, {
            deadLetterQueue: {
                queue: new sqs.Queue(this, `input-queue-dlq`),
                maxReceiveCount: 3
            }
        })

        this._inputQueue.grantConsumeMessages(this.role)
    }

    private get role(): iam.IRole {
        const role = this._function.role
        if (!role) {
            throw new Error(`Function ${this._function.functionName} does not have a role`)
        }

        return role
    }

    public grantSendMessages(sender: FunctionWithInputQueue): iam.Grant {
        return this._inputQueue.grantSendMessages(sender.role)
    }
}
