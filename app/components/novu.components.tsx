"use client";

import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

export const Novu = ({ user }: { user: string }) => {
  return (
    <NovuProvider
      applicationIdentifier={`${process.env.NOVU_SECRET_KEY}`}
      subscriberId={user}
    >
      <PopoverNotificationCenter colorScheme="dark">
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};
