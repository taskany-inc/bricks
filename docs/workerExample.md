``` ts
import { worker, Job } from '@taskany/bricks';

const getNextJob = // function to get first job with needed state update Status to pending, lock before updating
const jobUpdate = // function to update job
const jobDelete = // function to delete job
const resolve = // how to resolve jobs of different kinds

const onRetryLimitExeed = // what to do if retryLimit exeeded
const onQueueTooLong = // what to do if queue is too long
const log = // how to log info
const onError = // what to do on error

const defaultJobDelay = // ms between the jobs
const retryLimit = // number of retryes before onRetryLimitExeed will be executed

(() =>
    setInterval(async () => {
        await worker(
            getNextJob,
            jobUpdate,
            jobDelete,
            resolve,
            onRetryLimitExeed,
            onQueueTooLong,
            log,
            onError,
            defaultJobDelay,
            retryLimit,
        );
    }, queueInterval))();

```