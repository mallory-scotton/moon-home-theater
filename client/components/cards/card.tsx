// Dependencies
import { Children, FC, ReactElement } from 'react';
import styles from './card.module.scss';
import { ContentBlock } from '@/components/contentBlock';

// Component Props
interface CardProps {
  variant?: 'standard' | 'classic' | 'compact' | 'wide-standard' | 'wide-classic';
  ratio?: '16:9' | '1:1' | '2:3';
  children?: ReactElement<typeof ContentBlock>;
  src: string;
}

// React Component
export const Card: FC<CardProps> = ({ variant = 'standard', ratio = '16:9', children, src }) => {
  // Join the class of the card
  const classes = [styles.card, styles[variant]].join(' ');

  // Validate the children
  if (Children.count(children) > 1 || children.type !== ContentBlock) {
    throw new Error('Card component must have a single ContentBlock as its child.');
  }

  // Return the react element
  return (
    <div className={classes}>
      <img src={src} />
      {children}
    </div>
  );
};
