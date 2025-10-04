
import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
    secondary: 'border-transparent bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
    destructive: 'border-transparent bg-[var(--color-danger)]/90 text-[var(--color-primary-foreground)]',
    outline: 'text-[var(--color-foreground)]',
    success: 'border-transparent bg-[var(--color-success)] text-[var(--color-primary-foreground)]',
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