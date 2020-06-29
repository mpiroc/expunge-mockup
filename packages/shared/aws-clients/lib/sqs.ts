import * as aws from 'aws-sdk'

export interface ISqsClient {
    sendMessageBatch(params: aws.SQS.SendMessageBatchRequest): Promise<aws.SQS.SendMessageBatchResult>
}

export class SqsClient implements ISqsClient {
    private readonly _client: aws.SQS

    public constructor(client: aws.SQS = new aws.SQS()) {
        this._client = client
    }

    public async sendMessageBatch(params: aws.SQS.SendMessageBatchRequest): Promise<aws.SQS.SendMessageBatchResult> {
        const result = await this._client.sendMessageBatch(params).promise()

        return {
            Failed: result.Failed,
            Successful: result.Successful
        }
    }
}

export function formatInputQueueUrlKey(packageName: string): string {
    return `INPUT_QUEUE_URL_${packageName}`
}

export function getInputQueueUrl(packageName: string): string {
    const targetQueueUrlKey: string = `INPUT_QUEUE_URL_${packageName}`
    const queueUrl: string | undefined = process.env[targetQueueUrlKey]

    if (!queueUrl) {
        throw new Error(`Could not get input queue url for package ${packageName}. Ensure that environment variable ${targetQueueUrlKey} is set.`)
    }

    return queueUrl
}