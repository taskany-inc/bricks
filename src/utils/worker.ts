import parser from 'cron-parser';

export enum jobState {
    scheduled = 'scheduled',
    pending = 'pending',
    completed = 'completed',
}

declare type JsonObject = {
    [Key in string]?: JsonValue;
};
declare interface JsonArray extends Array<JsonValue> {}
declare type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

export interface Job {
    id: string;
    state: string;
    priority: number;
    kind: string;
    data: JsonValue;
    delay?: number;
    retry?: number;
    runs: number;
    force: boolean;
    cron?: string;
    error?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateJobData {
    state?: string;
    force?: boolean;
    runs?: number | { increment: number };
    error?: string;
    retry?: number;
    delay?: number;
}

const iterateJobQueue = async (
    state: jobState,
    cb: (job: Job) => Promise<void>,
    getNextJob: (state: jobState, watchedIds: string[]) => Promise<Job>,
): Promise<number> => {
    const watchedIds: string[] = [];

    while (true) {
        // eslint-disable-next-line no-await-in-loop
        const job = await getNextJob(state, watchedIds);

        if (!job) {
            break;
        }

        watchedIds.push(job.id);
        // eslint-disable-next-line no-await-in-loop
        await cb(job);
    }

    return watchedIds.length;
};

export const worker = async (
    getNextJob: (state: jobState, watchedIds: string[]) => Promise<Job>,
    jobUpdate: (id: string, data: UpdateJobData) => Promise<void>,
    jobDelete: (id: string) => Promise<void>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: { [key: string]: (args: any) => any },
    onRetryLimitExeed: (error: unknown, job: Job) => void,
    onQueueTooLong: () => void,
    logger: (...rest: unknown[]) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => void,
    defaultJobDelay: number,
    retryLimit: number,
) => {
    try {
        const completedCount = await iterateJobQueue(
            jobState.completed,
            async (job) => {
                setTimeout(async () => {
                    if (job.cron) {
                        logger(`plan cron ${job.id}`);
                        await jobUpdate(job.id, {
                            state: jobState.scheduled,
                        });
                    } else {
                        logger(`delete job ${job.id}`);
                        await jobDelete(job.id);
                    }
                }, 0);
            },
            getNextJob,
        );

        const scheduledCount = await iterateJobQueue(
            jobState.scheduled,
            async (job) => {
                const planJob = () => jobUpdate(job.id, { state: jobState.scheduled });

                if (job.cron) {
                    const interval = parser.parseExpression(job.cron, {
                        currentDate: new Date(job.updatedAt),
                    });

                    if (Number(interval.next().toDate()) > Date.now() && !job.force) {
                        await planJob();

                        return;
                    }
                }

                if (job.delay && Date.now() - new Date(job.createdAt).valueOf() < job.delay) {
                    await planJob();

                    return;
                }

                setTimeout(async () => {
                    try {
                        logger(`resolve job ${job.kind} ${job.id}`);

                        await resolve[job.kind](job.data as any);
                        await jobUpdate(job.id, { state: jobState.completed, runs: { increment: 1 }, force: false });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (error: any) {
                        if (job.retry !== retryLimit) {
                            const retry = job.retry ? job.retry + 1 : 1;

                            logger(`error job ${job.id}`, error);
                            logger(`retry job ${job.id}`);

                            setTimeout(async () => {
                                await jobUpdate(job.id, {
                                    state: jobState.scheduled,
                                    error: error?.message,
                                    retry,
                                    delay: defaultJobDelay * retry,
                                });
                            }, 0);
                        } else {
                            onRetryLimitExeed(error, job);

                            logger(`delete job ${job.id} after ${retryLimit} retries`);

                            await jobDelete(job.id);
                        }
                    }
                }, 0);
            },
            getNextJob,
        );

        if (completedCount + scheduledCount > 300) {
            onQueueTooLong();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // eslint-disable-next-line no-console
        onError(error);
    }
};
