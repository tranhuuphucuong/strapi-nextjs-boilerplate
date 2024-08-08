import { ClassValue } from 'class-variance-authority/dist/types';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(classNames(inputs));
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

/**
 * Converts a size string into a responsive sizes string for use in HTML.
 *
 * @param {string} sizesStr - The size string to be parsed.
 * @returns {string} - A responsive sizes string.
 *
 * The function takes a size string, parses it into an object, and then maps
 * the keys of the object to a responsive sizes string. If the key is 'default',
 * it returns the value directly. Otherwise, it formats the key as a media query
 * with the corresponding value.
 *
 * @example
 * // Assuming parseSizeString('20vw sm:30vw md:50vw lg:80vw') returns:
 * // { default: '20vw', sm: '30vw', md: '50vw', lg: '80vw' }
 * const sizesStr = 'default: 100vw, 600px: 50vw';
 * const result = sizes(sizesStr);
 * console.log(result); // Output: '20vw, (min-width: fullConfig.theme.screens['sm']) 30vw, (min-width: fullConfig.theme.screens['md']) 50vw, (min-width: fullConfig.theme.screens['lg']) 80vw, '
 */
export const sizes = (sizesStr?: string) => {
  const fullConfig = resolveConfig(tailwindConfig);
  const sizeObject = parseSizeString(sizesStr);
  return sortWithPredefinedOrder(Object.keys(sizeObject))
    .map((key: string) => {
      if (key === 'default') return sizeObject[key];
      if ((!fullConfig.theme.screens as any)[key]) return '';

      return `(min-width: ${(fullConfig.theme.screens as any)[key]}) ${sizeObject[key]}`;
    })
    .filter((v) => v)
    .join(',');
};

const predefinedImgSizesOrder = ['2xl', 'xl', 'lg', 'md', 'sm', 'default'];
const sortWithPredefinedOrder = (arr: string[]): string[] => {
  return arr.sort((a, b) => {
    const indexA = predefinedImgSizesOrder.indexOf(a);
    const indexB = predefinedImgSizesOrder.indexOf(b);

    if (indexA === -1 && indexB === -1) return 0; // Both elements not in predefined order
    if (indexA === -1) return 1; // Element 'a' not in predefined order
    if (indexB === -1) return -1; // Element 'b' not in predefined order

    return indexA - indexB;
  });
};

/**
 * Example usage:
 * ```js
 *   const sizeString = "20vw sm:30vw md:50vw lg:80vw xl:100vw 2xl:90vw";
 *   const sizeObject = parseSizeString(sizeString);
 *   console.log(sizeObject);
 *   // Output: { default: '20vw', sm: '30vw', md: '50vw', lg: '100vw', xl: '100vw', '2xl': '90vw' }
 * ```
 * @param sizeString
 * @returns
 */
function parseSizeString(sizeString?: string): Record<string, string> {
  if (!sizeString) return {};
  const sizeArray = sizeString.split(' ');
  const sizeObject: Record<string, string> = {};

  sizeArray.forEach((size) => {
    const [key, value] = size.includes(':')
      ? size.split(':')
      : ['default', size];
    if (key && value) {
      sizeObject[key] = value;
    }
  });

  return sizeObject;
}
