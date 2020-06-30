import * as aws from 'aws-sdk'
import { ISqsClient, SqsClient } from '@code-for-baltimore/aws-clients'
import { getInputQueueUrl } from '@code-for-baltimore/utils'
// import {  } from '@code-for-baltimore/events'

// Re-use client for warm-start invocations.
const sqs: ISqsClient = new SqsClient(new aws.SQS())

export async function handler(event: unknown): Promise<void> {
    console.log(`Hello, add-subscription!`)
    console.log(`Region: ${aws.config.region}`)

    console.log(`Event:`)
    console.log(JSON.stringify(event, undefined, 4))
    
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
