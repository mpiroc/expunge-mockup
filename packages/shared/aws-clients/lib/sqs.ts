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
