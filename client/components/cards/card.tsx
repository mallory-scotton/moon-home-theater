// Dependencies
import { ReactElement, JSX, CSSProperties } from 'react';
import styles from './card.module.scss';
import { ContentBlock } from '@/components/contentBlock';

// Component Props
interface CardProps {
  variant?: 'standard' | 'classic' | 'compact' | 'wide-standard' | 'wide-classic';
  ratio?: '16:9' | '1:1' | '2:3';
  children?: ReactElement<typeof ContentBlock>;
  src: string;
  style?: CSSProperties;
}

// React Component
export const Card = ({ variant = 'standard', ratio = '16:9', children, src, style }: CardProps): JSX.Element => {
  // Return the react element
  return (
    <div className={[styles.card, styles[variant]].join(' ')} style={style}>
      <img
        src={src}
        className={[styles.cardImage, styles['r' + ratio.replace(':', 'x')]].join(' ')}
        draggable={false}
      />
      {children}
    </div>
  );
};
