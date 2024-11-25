import { workflow } from "@novu/framework";

export const sendNotificationInApp = workflow(
  "send-notification-inapp",
  async ({ step, payload }) => {
    await step.inApp("send-inApp", async () => {
      return {
        subject: payload.subject,
        body: payload.body,
      };
    });
  }
);
