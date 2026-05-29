import { Queue } from "bullmq";

export const TX_CONFIRM_QUEUE = "tx-confirm";

export interface ConfirmJobData {
  transactionId: string;
}

function redisConnectionOpts() {
  const url = process.env.REDIS_URL ?? "redis://localhost:6379";
  return { url };
}

export function createTxQueue(): Queue<ConfirmJobData> {
  return new Queue<ConfirmJobData>(TX_CONFIRM_QUEUE, {
    connection: redisConnectionOpts(),
    defaultJobOptions: {
      attempts: 10,
      backoff: { type: "exponential", delay: 2_000 }, // 2s, 4s, 8s … ~34 min total
      removeOnComplete: 100,
      removeOnFail: 500,
    },
  });
}
