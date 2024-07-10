import LangRedirect from '@/components/LangRedirect';
import { Landing } from '@/components/screens/landing';

export default async function RootRoute({
  params,
}: {
  params: { lang: string };
}) {
  try {
    if (params.lang !== 'en') return <LangRedirect />;
    return <Landing />;
  } catch (error: any) {
    window.alert('Missing or invalid credentials');
  }
}
