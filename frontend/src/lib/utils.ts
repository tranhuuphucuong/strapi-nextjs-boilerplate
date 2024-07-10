import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const _toString = (input: string | number | null | undefined) => {
  return (input ?? '').toString().trim();
};
export const emojiRegex =
  /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g;
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const valRequired = (input: string | number | null | undefined) => {
  return _toString(input).length > 0;
};

export const valEmail = (input: string | number | null | undefined) => {
  return (
    valRequired(input) &&
    emailRegex.test(_toString(input).toLowerCase()) &&
    !emojiRegex.test(_toString(input))
  );
};
