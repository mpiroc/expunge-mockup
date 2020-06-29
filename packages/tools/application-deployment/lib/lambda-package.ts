import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as path from 'path'

export interface ILambdaPackageProps {
    runtime: lambda.Runtime,
    handler: string
    packageName: string
}

export class LambdaPackage extends cdk.Construct {
    public constructor(scope: cdk.Construct, id: string, { runtime, handler, packageName }: ILambdaPackageProps) {
        super(scope, id)

        const bundlePath = path.dirname(require.resolve(packageName))
        new lambda.Function(this, `function`, {
            runtime,
            handler,
            code: lambda.Code.fromAsset(bundlePath)
        })
    }
}
