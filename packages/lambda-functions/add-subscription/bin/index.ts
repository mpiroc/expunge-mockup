import * as aws from 'aws-sdk'

export async function handler(): Promise<void> {
    console.log(`Hello, add-subscription!`)
    console.log(`Region: ${aws.config.region}`)
}
