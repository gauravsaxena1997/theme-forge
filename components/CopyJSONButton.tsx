
import React, { useState } from 'react';
import { useThemeForge } from '../state/ThemeContext';
import { ClipboardCopyIcon, CheckIcon } from './icons';
import { Button } from './ui/Button';

export const CopyJSONButton: React.FC = () => {
  const { tokens } = useThemeForge();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const payload = { theme: tokens };
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={onCopy}>
      {copied ? <CheckIcon className="w-4 h-4 mr-2" /> : <ClipboardCopyIcon className="w-4 h-4 mr-2" />}
      {copied ? "Copied!" : "Copy JSON"}
    </Button>
  );
};
