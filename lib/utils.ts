import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional class names and merges Tailwind styles cleanly.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into readable short format.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Truncates text with ellipsis if it exceeds specified length.
 */
export function truncateText(text: string, maxLength: number = 60): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Returns color class corresponding to a score value.
 */
export function getScoreColorClass(score: number): string {
  if (score >= 88) return 'text-green-400';
  if (score >= 75) return 'text-purple-400';
  return 'text-amber-400';
}