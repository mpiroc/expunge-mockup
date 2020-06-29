type SQS = import('aws-sdk').SQS
type SendMessageBatchResult = import('aws-sdk').SQS.SendMessageBatchResult
type SendMessageBatchRequest = import('aws-sdk').SQS.SendMessageBatchRequest

export interface ISqsClient {
    sendMessageBatch(params: SendMessageBatchRequest): Promise<SendMessageBatchResult>
}

export class SqsClient implements ISqsClient {
    private readonly _client: SQS

    public constructor(client: SQS) {
        this._client = client
    }

    public async sendMessageBatch(params: SendMessageBatchRequest): Promise<SendMessageBatchResult> {
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