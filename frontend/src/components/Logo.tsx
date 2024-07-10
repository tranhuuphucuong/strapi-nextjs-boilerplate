import Image from 'next/image';
import Link from 'next/link';

export default function Logo({
  src,
  children,
}: {
  src?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href="/"
      aria-label="Back to homepage"
      className="inline-flex items-center gap-3 p-2"
    >
      {src && <Image src={src} alt="logo" width={45} height={45} />}
      <div className="ml-2">{children}</div>
    </Link>
  );
}
