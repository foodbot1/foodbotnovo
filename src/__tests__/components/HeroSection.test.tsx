import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '../../components/HeroSection';
import { AuthProvider } from '../../contexts/AuthContext';

describe('HeroSection', () => {
  it('renders main heading', async () => {
    render(
      <AuthProvider>
        <HeroSection />
      </AuthProvider>
    );
    expect(await screen.findByText(/FOODBOT \+ iFOOD =/i)).toBeInTheDocument();
  });

  it('renders call to action buttons', async () => {
    render(
      <AuthProvider>
        <HeroSection />
      </AuthProvider>
    );
    expect(await screen.findByText(/COMEÇAR AGORA/i)).toBeInTheDocument();
    expect(await screen.findByText(/COMO FUNCIONA/i)).toBeInTheDocument();
  });
});