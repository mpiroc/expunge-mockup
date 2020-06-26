export interface ICase {
    id: string
    status: boolean
    lastUpdated: number,
    subscribers: string[] // array of user ids
}

export interface IUser {
    id: String
    email: string
    subscriptions: string[] // array of case ids
}

export interface IAddSubscriptionMessage {

}

export interface IHandleResponseMessage {

}

export interface IScheduleRequestsMessage {

}

export interface ISendNotificationsMessage {

}

export interface ISendRequestsMessage {

}

export interface IEnqueueUpdatesMessage {

}

