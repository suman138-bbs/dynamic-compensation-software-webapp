import { ReactNode } from 'react';

export type ButtonProps = {
  className?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
