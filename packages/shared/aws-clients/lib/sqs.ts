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