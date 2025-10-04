export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}