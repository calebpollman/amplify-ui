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

import React, { useMemo } from 'react';
import { Image, Text, View } from 'react-native';

import { Button, IconButton } from '@ui';
import icons from '../../../assets';
import TestIDs from '../../../AmplifyTestIDs';

import { ICON_BUTTON_HIT_SLOP, ICON_BUTTON_SIZE } from '../constants';
import { ImageDimensions, useMessageProps } from '../hooks';
import MessageWrapper from '../MessageWrapper';

import { getStyles, positionStyle } from './styles';
import { BannerMessageProps } from './types';

const { IN_APP_MESSAGING } = TestIDs;

export default function BannerMessage(props: BannerMessageProps) {
  const {
    body,
    header,
    image,
    onClose,
    position = 'top',
    primaryButton,
    secondaryButton,
  } = props;

  const getBannerStyle = useMemo(
    () => (imageDimensions: ImageDimensions) =>
      getStyles(imageDimensions, { position: { ...positionStyle[position] } }),
    [position]
  );

  const {
    hasButtons,
    hasPrimaryButton,
    hasRenderableImage,
    hasSecondaryButton,
    shouldRenderMessage,
    styles,
  } = useMessageProps(props, getBannerStyle);

  if (!shouldRenderMessage) {
    return null;
  }

  return (
    <MessageWrapper style={styles.componentWrapper}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {hasRenderableImage && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image?.src }}
                style={styles.image}
                testID={IN_APP_MESSAGING.IMAGE}
              />
            </View>
          )}
          <View style={styles.textContainer}>
            {header?.content && (
              <Text style={styles.header} testID={IN_APP_MESSAGING.HEADER}>
                {header.content}
              </Text>
            )}
            {body?.content && (
              <Text style={styles.body} testID={IN_APP_MESSAGING.BODY}>
                {body.content}
              </Text>
            )}
          </View>
          <IconButton
            color={styles.iconButton.iconColor}
            hitSlop={ICON_BUTTON_HIT_SLOP}
            onPress={onClose}
            size={ICON_BUTTON_SIZE}
            source={icons.close}
            style={styles.iconButton.container}
            testID={IN_APP_MESSAGING.CLOSE_BUTTON}
          />
        </View>
        {hasButtons && (
          <View style={styles.buttonsContainer}>
            {hasSecondaryButton && (
              <Button
                onPress={secondaryButton.onPress}
                style={styles.secondaryButton.container}
                testID={IN_APP_MESSAGING.SECONDARY_BUTTON}
                textStyle={styles.secondaryButton.text}
              >
                {secondaryButton.title}
              </Button>
            )}
            {hasPrimaryButton && (
              <Button
                onPress={primaryButton.onPress}
                style={styles.primaryButton.container}
                testID={IN_APP_MESSAGING.PRIMARY_BUTTON}
                textStyle={styles.primaryButton.text}
              >
                {primaryButton.title}
              </Button>
            )}
          </View>
        )}
      </View>
    </MessageWrapper>
  );
}
