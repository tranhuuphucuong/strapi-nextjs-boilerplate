import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai';

export function RenderSocialIcon({
  social,
  className,
}: {
  social: string | undefined;
  className?: string;
}) {
  switch (social) {
    case 'x':
      return <AiFillTwitterCircle className={className} />;
    case 'youtube':
      return <AiFillYoutube className={className} />;
    case 'facebook':
      return <AiFillFacebook className={className} />;
    default:
      return null;
  }
}
