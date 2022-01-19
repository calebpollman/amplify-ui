/*
 * Copyright 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InAppMessage, Notifications } from '@aws-amplify/notifications';

import InAppMessagingContext from './InAppMessagingContext';
import { InAppMessagingProviderProps } from './types';

const { InAppMessaging } = Notifications;

export default function InAppMessagingProvider({
  children,
  components = {},
  style = {},
}: InAppMessagingProviderProps) {
  const [inAppMessage, setInAppMessage] = useState<InAppMessage>(null);

  useEffect(() => {
    const listener = InAppMessaging.onMessageReceived((message) => {
      setInAppMessage(message);
    });
    return listener.remove;
  }, []);

  const clearInAppMessage = useCallback(() => {
    setInAppMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      clearInAppMessage,
      components,
      displayInAppMessage: setInAppMessage,
      inAppMessage,
      style,
    }),
    [clearInAppMessage, components, inAppMessage, style]
  );

  return (
    <InAppMessagingContext.Provider value={value}>
      {children}
    </InAppMessagingContext.Provider>
  );
}
