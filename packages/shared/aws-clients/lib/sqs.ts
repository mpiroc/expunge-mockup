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

function sanitizeEnvVarKey(key: string): string {
    // AWS validates environment variable names against the pattern /^[a-zA-Z]([a-zA-Z0-9_])+$/
    // So we just replace any disallowed characters with '_'. We only pass in package names that
    // we control, so collisions shouldn't be an issue.

    if (!key.match(/^[a-zA-z]/)) {
        throw new Error(`Cannot sanitize environment variable key '${key}': Environment variable keys must start with a letter.`)
    }

    return key.replace(/[^a-zA-Z0-9_]/g, '_')
}

export function formatInputQueueUrlKey(packageName: string): string {
    return sanitizeEnvVarKey(`INPUT_QUEUE_URL_${packageName}`)
}

export function getInputQueueUrl(packageName: string): string {
    const targetQueueUrlKey: string = formatInputQueueUrlKey(packageName)
    const queueUrl: string | undefined = process.env[targetQueueUrlKey]

    if (!queueUrl) {
        throw new Error(`Could not get input queue url for package ${packageName}. Ensure that environment variable ${targetQueueUrlKey} is set.`)
    }

    return queueUrl
}