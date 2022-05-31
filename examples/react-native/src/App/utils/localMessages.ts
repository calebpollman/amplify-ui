import { InAppMessage, InAppMessageLayout } from '@aws-amplify/notifications';

export const layouts: InAppMessageLayout[] = [
  'BOTTOM_BANNER',
  'CAROUSEL',
  'FULL_SCREEN',
  'MIDDLE_BANNER',
  'MODAL',
  'TOP_BANNER',
];

const button: InAppMessage['content'][0]['primaryButton'] = {
  title: 'button',
  action: 'LINK',
  url: 'https://github.com/aws-amplify/amplify-ui',
};

function getMessageBase(layout: InAppMessageLayout): {
  [T: string]: InAppMessage;
} {
  return {
    [layout]: {
      layout,
      id: layout,
      content: [
        {
          header: {
            content: layout,
            style: {
              color: '#000',
              textAlign: 'left',
            },
          },
          body: {
            content: 'Body',
            style: {
              color: '#000',
              textAlign: 'left',
            },
          },
          image: {
            // potrait
            src: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/princess-pumpkin-royal-cat-portrait-milly-may.jpg',
            // landscape
            // src: 'https://c4.wallpaperflare.com/wallpaper/595/784/1020/animal-silhouette-art-design-wallpaper-preview.jpg',
          },
          primaryButton: button,
          secondaryButton: button,
        },
      ],
    },
  };
}

export const localMessages = layouts.reduce(
  (messages, layout) => ({
    ...messages,
    ...getMessageBase(layout),
  }),
  {} as Record<InAppMessageLayout, InAppMessage>
);
