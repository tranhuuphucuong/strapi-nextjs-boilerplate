import { FALLBACK_SEO } from '@/lib/constants';
import { getPageBySlug } from '@/lib/get-page-by-slug';
import { sectionRenderer } from '@/lib/section-renderer';
import { Metadata } from 'next';

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug, params.lang);
  if (!page.data || !page.data[0]?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang);
  if (!page.data || page.data?.length === 0) return null;
  const contentSections = page.data[0].contentSections;
  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index),
  );
}
