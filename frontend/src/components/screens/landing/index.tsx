import { getLandingPage } from '@/api/getLandingPage';
import Hero from './Hero';

export const Landing = async () => {
  const landingData = await getLandingPage();
  return <Hero data={landingData?.hero} />;
};
