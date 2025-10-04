
import React from 'react';
import { cn } from '../../lib/utils';

const Avatar = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';

export { Avatar };
