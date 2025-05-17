import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PaymentPage from '../../pages/PaymentPage';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock the useAuth hook
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Supabase client
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: () => ({
        select: () => ({
          single: () => ({
            data: { id: 'test-subscription-id' },
          }),
        }),
      }),
    }),
  },
}));

describe('PaymentPage', () => {
  it('renders payment details correctly', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <PaymentPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Finalizar Assinatura')).toBeInTheDocument();
    expect(screen.getByText('FoodBot - Automação para iFood')).toBeInTheDocument();
    expect(screen.getByText('R$ 50,00')).toBeInTheDocument();
    expect(screen.getByText(/Automação 24\/7/)).toBeInTheDocument();
    expect(screen.getByText(/Suporte técnico/)).toBeInTheDocument();
    expect(screen.getByText(/Cancelamento flexível/)).toBeInTheDocument();
  });

  it('displays correct payment amount and period', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <PaymentPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const priceElement = screen.getByText('R$ 50,00');
    const periodElement = screen.getByText('/semana');
    
    expect(priceElement).toBeInTheDocument();
    expect(periodElement).toBeInTheDocument();
  });
});