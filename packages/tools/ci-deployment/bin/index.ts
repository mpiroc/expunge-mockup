#!/usr/bin/env node

import * as cdk from '@aws-cdk/core'
import { Pipeline } from '../lib'

async function main(): Promise<void> {
    const app: cdk.App = new cdk.App()
    const stack: cdk.Stack = new cdk.Stack(app, `expunge-ci`)
    const repo: string = `expunge-mockup`

    await Pipeline.create(
        stack,
        repo,
        {
            owner: `mpiroc`,
            repo,
            branches: [
                `master`
            ],
            name: repo
        }
    )
}

/* eslint-disable @typescript-eslint/no-floating-promises */
main().catch(console.error)
/* eslint-enable @typescript-eslint/no-floating-promises */
