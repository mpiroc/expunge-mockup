import * as aws from 'aws-sdk'

export async function handler(event: unknown): Promise<void> {
    console.log(`Hello, enque-updates!`)
    console.log(`Region: ${aws.config.region}`)

    console.log(`Event:`)
    console.log(JSON.stringify(event, undefined, 4))
}
