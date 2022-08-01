import { MessageComponentBaseProps } from '@aws-amplify/ui-react-core';

import {
  MessageComponentStyles,
  MessageOverrideStyle,
  UseMessageProps,
} from '../hooks';

type MessageLayoutOrientation = 'horizontal' | 'vertical';

export type MessageLayoutButtonModifier = 'dark' | 'light';

export interface MessageLayoutProps
  extends Omit<MessageComponentBaseProps<MessageOverrideStyle>, 'style'>,
    Omit<UseMessageProps, 'shouldRenderMessage' | 'styles'> {
  /**
   * @description
   * The orientation determines how message content will be laid out.
   */
  orientation?: MessageLayoutOrientation;

  /**
   * @description
   * Component styles - typically a combination of payload and override styles.
   */
  styles: MessageComponentStyles;
}
