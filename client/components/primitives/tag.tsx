// Dependencies
import { FC } from 'react';
import styles from './tag.module.scss';

// Component Props
interface TagProps {
  size?: 'default' | 'large';
  outlined?: boolean;
  label: string;
}

// React Component
export const Tag: FC<TagProps> = ({ size = 'default', outlined = false, label }) => {
  // Get the classes of the tag component
  const classes = [
    styles.tag,
    styles[size],
    outlined ? styles.outlined : styles.filled
  ].join(' ');

  // The tag element
  return <div className={classes}>{label}</div>;
};
