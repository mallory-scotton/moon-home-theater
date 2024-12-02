// Dependencies
import { FC } from 'react';
import styles from './contentBlock.module.scss';
import { Tag } from '@/components/primitives';

// Component Props
interface ContentBlockProps {
  alignement?: 'left' | 'right' | 'center';
  size?: 'small' | 'medium' | 'large';
  title: string;
  subtitle?: string;
  description?: string;
  extra?: {
    label: string;
    text: string;
  };
}

// React Components
export const ContentBlock: FC<ContentBlockProps> = ({
  alignement = 'center',
  size = 'medium',
  title,
  subtitle,
  description,
  extra
}) => {
  const classes = [
    styles.contentBlock,
    styles[alignement],
    styles[size]
  ].join(' ');

  return (
    <div className={classes}>
      <div className={styles.heading}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && (
        <div className={styles.extra}>
          <Tag label={extra.label} />
          <div className={styles.extraText}>{extra.text}</div>
        </div>
      )}
    </div>
  );
};
