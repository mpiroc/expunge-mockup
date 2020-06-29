import * as aws from 'aws-sdk'
import { ISqsClient, SqsClient, getInputQueueUrl } from '@code-for-baltimore/aws-clients'

export async function handler(): Promise<void> {
    console.log(`Hello, add-subscription!`)
    console.log(`Region: ${aws.config.region}`)

    const sqs: ISqsClient = new SqsClient()
    const response = await sqs.sendMessageBatch({
        QueueUrl: getInputQueueUrl(`@code-for-baltimore/enqueue-updates`),
        Entries: [
            {
                Id: "0",
                MessageBody: "MY BODY 0"
            },
            {
                Id: "1",
                MessageBody: "MY BODY 1"
            },
        ]
    })

    console.log(`SQS Response:`)
    console.log(JSON.stringify(response, undefined, 4))
}
