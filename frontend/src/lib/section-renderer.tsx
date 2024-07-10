import Email from '@/components/Email';
import { LargeVideo } from '@/components/LargeVideo';

export function sectionRenderer(section: any, index: number) {
  // console.log("section: ", section);

  switch (section.__component) {
    // case "sections.hero":
    //   return <Hero key={index} data={section} />;
    case 'sections.large-video':
      return <LargeVideo key={index} data={section} />;
    // case "sections.features":
    //   return <Features key={index} data={section} />;
    // case "sections.testimonials-group":
    //   return <Testimonials key={index} data={section} />;
    // case "sections.pricing":
    //   return <Pricing key={index} data={section} />;
    case 'sections.lead-form':
      return <Email key={index} data={section} />;
    default:
      return null;
  }
}
