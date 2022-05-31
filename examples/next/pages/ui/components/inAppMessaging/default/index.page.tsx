import {
  InAppMessageDisplay,
  InAppMessagingProvider,
} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

export default function App() {
  return (
    <InAppMessagingProvider>
      <InAppMessageDisplay />
    </InAppMessagingProvider>
  );
}
