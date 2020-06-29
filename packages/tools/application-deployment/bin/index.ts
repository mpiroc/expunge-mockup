#!/usr/bin/env node

import * as cdk from '@aws-cdk/core'
import { ExpungeStack } from '../lib'

async function main(): Promise<void> {
    const app: cdk.App = new cdk.App()
    new ExpungeStack(app, `expunge-backend`)
}

/* eslint-disable @typescript-eslint/no-floating-promises */
main().catch(console.error)
/* eslint-enable @typescript-eslint/no-floating-promises */
