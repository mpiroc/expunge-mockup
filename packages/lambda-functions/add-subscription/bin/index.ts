import * as aws from 'aws-sdk'
import { ISqsClient, SqsClient, getInputQueueUrl } from '@code-for-baltimore/aws-clients'

export async function handler(): Promise<void> {
    // The AWS SDK is configured by the Lambda runtime environment, so we need
    // to import it at runtime rather than bundling it. Parcel automatically
    // enables code-splitting for asynchronously-imported packages.
    // TODO: Is NodeJS smart enough to cache dynamic imports? We don't want to
    //       re-import on warm-start invocations.
    console.log(`Hello, add-subscription!`)
    console.log(`Region: ${aws.config.region}`)

    const sqs: ISqsClient = new SqsClient(new aws.SQS())
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
