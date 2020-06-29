import * as aws from 'aws-sdk'
import { ISqsClient, SqsClient } from '@code-for-baltimore/aws-clients'

export async function handler(): Promise<void> {
    console.log(`Hello, add-subscription!`)
    console.log(`Region: ${aws.config.region}`)

    if (!process.env.ENQUEUE_UPDATES_INPUT_QUEUE_URL) {
        throw new Error(`Could not get target queue url--ensure that environment variable ENQUEUE_UPDATES_INPUT_QUEUE_URL is set`)
    }

    const targetQueueUrl: string = process.env.ENQUEUE_UPDATES_INPUT_QUEUE_URL  

    const sqs: ISqsClient = new SqsClient()
    const response = await sqs.sendMessageBatch({
        QueueUrl: targetQueueUrl,
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
