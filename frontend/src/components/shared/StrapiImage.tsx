import { sizes as sizesParse } from '@/lib/utils';
import { StrapiMedia } from '@/types';
import cloudinaryLoader from 'image-loader';
import Image from 'next/image';
import { getImage } from './getImage';

type Props = {
  data?: StrapiMedia;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  preview?: boolean;
  sizes?: string;
};

export const StrapiImage = async ({
  data,
  className = '',
  fill = false,
  priority,
  preview,
  sizes = '',
}: Props) => {
  if (!data?.attributes) return null;

  const { alternativeText, caption, width, height, hash } = data.attributes;

  const base64 = preview
    ? (
        await getImage(
          cloudinaryLoader({
            src: hash,
            width: 64,
            quality: 70,
          }),
        )
      ).base64
    : null;

  return (
    <Image
      src={hash || ''}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      sizes={sizesParse(sizes)}
      alt={alternativeText || ''}
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64 || ''}
      className={className}
      priority={priority}
    />
  );
};
