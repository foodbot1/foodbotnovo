import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';

describe('App', () => {
  it('renders without crashing', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    
    // Wait for the loading state to finish
    expect(await screen.findByText(/FoodBot/i)).toBeInTheDocument();
  });
});