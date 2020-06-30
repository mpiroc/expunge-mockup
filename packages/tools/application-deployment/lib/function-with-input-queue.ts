import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'
import * as lambda from '@aws-cdk/aws-lambda'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import * as sqs from '@aws-cdk/aws-sqs'
import * as path from 'path'
import { formatInputQueueUrlKey } from '@code-for-baltimore/utils'

export interface IFunctionWithInputQueueProps extends Pick<lambda.FunctionProps, 'handler' | 'runtime'>{
    packageName: string
}

export class FunctionWithInputQueue extends cdk.Construct {
    private readonly _packageName: string
    private readonly _function: lambda.Function
    private readonly _inputQueue: sqs.IQueue

    public constructor(scope: cdk.Construct, id: string, { runtime, handler, packageName }: IFunctionWithInputQueueProps) {
        super(scope, id)

        this._packageName = packageName

        const bundlePath = path.dirname(require.resolve(packageName))
        if (!bundlePath) {
            throw new Error(`Could not find bundle for package ${packageName}. Did you forget to add it as a dependency of the deployment package?`)
        }

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

        this._function.addEventSource(new SqsEventSource(this._inputQueue))
    }

    private get role(): iam.IRole {
        const role = this._function.role
        if (!role) {
            throw new Error(`Function ${this._function.functionName} does not have a role`)
        }

        return role
    }

    public grantSendMessages(sender: FunctionWithInputQueue): iam.Grant {
        sender._function.addEnvironment(formatInputQueueUrlKey(this._packageName), this._inputQueue.queueUrl)

        return this._inputQueue.grantSendMessages(sender.role)
    }
}
