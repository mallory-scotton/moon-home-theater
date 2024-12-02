// Dependencies
import { StrictMode } from 'react';
import { render } from 'react-dom';
// Styles
import '@/sass/styles.scss';

// Components
import { Card } from '@/components/cards';
import { ContentBlock } from '@/components/contentBlock';

// Images
import poster from '@/assets/template/poster.png';

render(
  <StrictMode>
    <Card src={poster}>
      <ContentBlock
        title="Title goes here"
        subtitle="Secondary • text"
        description="Description offers a more detailed explanation of the content, product, or feature being presented."
        extra={{ label: 'Label', text: 'Secondary • text' }}
        alignement="left"
      />
    </Card>
  </StrictMode>,
  document.getElementById('app')
);
