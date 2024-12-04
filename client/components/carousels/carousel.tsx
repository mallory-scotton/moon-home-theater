// Dependencies
import { ReactElement, JSX, CSSProperties, Children } from 'react';
import styles from './carousel.module.scss';
import { Card } from '@/components/cards';
import { clamp } from '../../../common/utils/math';

// Component Props
interface CarouselProps {
  direction?: 'row' | 'column';
  columnCount?: 2 | 3 | 4 | 5 | 6;
  children?: ReactElement<typeof Card>[] | ReactElement<typeof Card>;
  style?: CSSProperties;
  scrollTo?: number;
}

// React Component
export const Carousel = ({
  direction = 'row',
  columnCount = 4,
  children,
  style,
  scrollTo = 0
}: CarouselProps): JSX.Element => {
  // Clamp the scrollTo
  scrollTo = clamp(scrollTo, 0, Children.count(children) - 1);

  // Apply the scrolling to the carousel
  style = { transform: `translateX(calc(((100vw - 58px * 2) / ${columnCount}) * ${-scrollTo}))` };

  // Return the react element
  return (
    <div className={[styles.carousel, styles['column-' + columnCount], styles[direction]].join(' ')} style={style}>
      {children}
    </div>
  );
};
