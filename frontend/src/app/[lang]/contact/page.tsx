import LangRedirect from '@/components/LangRedirect';
import { Contact } from '@/components/screens/contact';

export default async function RootRoute({
  params,
}: {
  params: { lang: string };
}) {
  try {
    if (params.lang !== 'en') return <LangRedirect />;

    return <Contact />;
  } catch (error: any) {
    window.alert('Missing or invalid credentials');
  }
}
