import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../../pages/Dashboard';
import { AuthProvider } from '../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the useAuth hook
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '123' },
    signOut: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Supabase client
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => ({
            data: {
              status: 'active',
              active_until: '2025-12-31',
            },
          }),
        }),
      }),
    }),
  },
}));

describe('Dashboard', () => {
  it('renders subscription status correctly', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText('Status:')).toBeInTheDocument();
    expect(await screen.findByText('Ativa')).toBeInTheDocument();
  });
});