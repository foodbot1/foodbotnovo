import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock Google Pay Button
vi.mock('@google-pay/button-react', () => ({
  default: () => React.createElement('div', { 'data-testid': 'google-pay-button-mock' }, 'Google Pay Button Mock')
}));

// Mock Supabase client
vi.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => ({
            data: null,
            error: null
          })
        })
      }),
      insert: () => ({
        select: () => ({
          single: () => ({
            data: null,
            error: null
          })
        })
      })
    })
  }
}));

// Mock AuthContext
vi.mock('./contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signIn: vi.fn(),
    signOut: vi.fn(),
    isAdmin: false
  }),
  AuthProvider: ({ children }) => React.createElement(React.Fragment, null, children)
}));