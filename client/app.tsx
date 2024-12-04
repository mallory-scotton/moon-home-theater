// Dependencies
import { ReactElement, StrictMode, JSX, useState, MouseEventHandler } from 'react';
import { render } from 'react-dom';
// Styles
import '@/sass/styles.scss';

// Components
import { Card } from '@/components/cards';
import { ContentBlock } from '@/components/contentBlock';
import { Carousel } from '@/components/carousels';

// Images
import poster from '@/assets/template/poster.png';

const CarouselFactory = ({
  columnCount,
  scrollTo
}: {
  columnCount: 2 | 3 | 4 | 5 | 6;
  scrollTo: number;
}): JSX.Element => {
  return (
    <Carousel columnCount={columnCount} scrollTo={scrollTo}>
      {(() => {
        const childs: ReactElement<typeof Card>[] = [];
        for (let i = 0; i < columnCount + 1; i++) {
          childs.push(
            <Card src={poster} key={i}>
              <ContentBlock title="Acts of War" alignement="center" size="small" />
            </Card>
          );
        }
        return childs;
      })()}
    </Carousel>
  );
};

let scrollTo = 0;

const App = (): JSX.Element => {
  const [scrollTo, setScrollTo] = useState(0);

  const handleClick: MouseEventHandler = (event) => {
    if (event.ctrlKey) setScrollTo((prev) => prev - 1);
    else setScrollTo((prev) => prev + 1)
  };

  return (
    <StrictMode>
      <div
        style={{
          paddingTop: '24px',
          paddingBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
        onClick={handleClick}
      >
        <CarouselFactory columnCount={6} scrollTo={scrollTo} />
        <CarouselFactory columnCount={5} scrollTo={scrollTo} />
        <CarouselFactory columnCount={4} scrollTo={scrollTo} />
        <CarouselFactory columnCount={3} scrollTo={scrollTo} />
        <CarouselFactory columnCount={2} scrollTo={scrollTo} />
      </div>
    </StrictMode>
  );
};

render(<App/>, document.getElementById('app'));
