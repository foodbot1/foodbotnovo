import React from 'react';
import HeroSection from '../components/HeroSection';
import ValueSection from '../components/ValueSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ResultsSection from '../components/ResultsSection';
import ComparisonSection from '../components/ComparisonSection';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';

const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ValueSection />
      <HowItWorksSection />
      <ResultsSection />
      <ComparisonSection />
      <FAQ />
      <CallToAction />
    </>
  );
};

export default LandingPage;