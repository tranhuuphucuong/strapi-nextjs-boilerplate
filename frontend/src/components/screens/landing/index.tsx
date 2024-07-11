import { getLandingPage } from '@/api/getLandingPage';
import { APIResponse } from '@/types/strapi';
import Hero from './Hero';

export const Landing = async () => {
  const landingData =
    (await getLandingPage()) as APIResponse<'api::landing-page.landing-page'>;
  return <Hero data={landingData} />;
};
