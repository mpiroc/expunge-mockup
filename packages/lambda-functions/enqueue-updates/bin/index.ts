import * as aws from 'aws-sdk'

export async function handler(): Promise<void> {
    console.log(`Hello, enque-updates!`)
    console.log(`Region: ${aws.config.region}`)
}