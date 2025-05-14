import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExtensionDownload from '../../components/ExtensionDownload';

describe('ExtensionDownload', () => {
  it('shows inactive subscription message when subscription is not active', () => {
    render(<ExtensionDownload isSubscriptionActive={false} />);
    
    expect(screen.getByText(/Você precisa ter uma assinatura ativa para baixar a extensão/)).toBeInTheDocument();
  });

  it('shows download button when subscription is active', () => {
    render(<ExtensionDownload isSubscriptionActive={true} />);
    
    expect(screen.getByText('Baixar Extensão')).toBeInTheDocument();
    expect(screen.getByText('Instruções de instalação:')).toBeInTheDocument();
  });

  it('displays installation instructions when subscription is active', () => {
    render(<ExtensionDownload isSubscriptionActive={true} />);
    
    const instructions = [
      'Baixe o arquivo da extensão',
      'Abra o Google Chrome',
      'Vá para chrome://extensions/',
      'Ative o "Modo do desenvolvedor"',
      'Arraste o arquivo baixado para a página de extensões'
    ];

    instructions.forEach(instruction => {
      expect(screen.getByText(instruction, { exact: false })).toBeInTheDocument();
    });
  });
});