import * as aws from 'aws-sdk'
import { IEvent } from '@code-for-baltimore/events'

export async function handler(event: IEvent): Promise<void> {
    // The AWS SDK is configured by the Lambda runtime environment, so we need
    // to import it at runtime rather than bundling it. Parcel automatically
    // enables code-splitting for asynchronously-imported packages.
    // TODO: Is NodeJS smart enough to cache dynamic imports? We don't want to
    //       re-import on warm-start invocations.
    console.log(`Hello, enque-updates!`)
    console.log(`Region: ${aws.config.region}`)

    console.log(`Event:`)
    console.log(JSON.stringify(event, undefined, 4))
}
