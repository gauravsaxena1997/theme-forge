
import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
    secondary: 'border-transparent bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]',
    destructive: 'border-transparent bg-[var(--color-danger)]/90 text-[var(--color-primary-foreground)]',
    outline: 'text-[var(--color-foreground)]',
  };
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
