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

const POSTERS: string[] = [
  'https://image.tmdb.org/t/p/w780/3ehMpKNXSK8atX3sVtWXqZSWGrf.jpg',
  'https://image.tmdb.org/t/p/w780/pv6VZMLO20GNBt3Mbxxcpoo3lM0.jpg',
  'https://image.tmdb.org/t/p/w780/86funb4NWWxp33eLIZuQrYEWg71.jpg',
  'https://image.tmdb.org/t/p/w780/3QkvxgRkgV9mTXXVRC5VdYe4yl.jpg',
  'https://image.tmdb.org/t/p/w780/ndgaAkooNS1Bw1FCmRHOPgcyPAg.jpg',
  'https://image.tmdb.org/t/p/w780/2bkjybhoCkbc1qRhlddyjBafU5.jpg',
  'https://image.tmdb.org/t/p/w780/x6OSrIgRRueeTQ63PoZfUgwpceK.jpg',
  'https://image.tmdb.org/t/p/w780/iAzcDIsUU6E18TgJo530j1IDBW0.jpg',
  'https://image.tmdb.org/t/p/w780/aQ6uUrVM6beU29tbybXN4oKcIJd.jpg',
  'https://image.tmdb.org/t/p/w780/4G7mBrbxnPXZqteZrGVhQbk7CvF.jpg',
  'https://image.tmdb.org/t/p/w780/7onsvPfhN6Ezymw2AntoAijqDHX.jpg'
];

const randomPoster = (): string => POSTERS[Math.floor(Math.random() * POSTERS.length)];

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
            <Card src={randomPoster()} key={i}>
              <ContentBlock title="Acts of War" alignement="center" size="small" />
            </Card>
          );
        }
        return childs;
      })()}
    </Carousel>
  );
};

const App = (): JSX.Element => {
  const [scrollTo, setScrollTo] = useState(0);

  const handleClick: MouseEventHandler = (event) => {
    if (event.ctrlKey) setScrollTo((prev) => prev - 1);
    else setScrollTo((prev) => prev + 1);
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

render(<App />, document.getElementById('app'));
