export interface IEvent {
    Records: IRecord[]
}

export interface IRecord {
    messageId: string
    receiptHandle: string
    body: string
    attributes: {
        ApproximateReceiveCount: string
        SentTimestamp: string
        SenderId: string
        ApproximateFirstReceiveTimestamp: string
        [key: string]: string
    }
    messageAttributes: {}
    md5OfBody: string
    eventSource: string
    eventSourceARN: string
    awsRegion: string
}
