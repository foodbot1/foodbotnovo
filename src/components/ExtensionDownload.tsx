import React from 'react';
import { Download } from 'lucide-react';

interface ExtensionDownloadProps {
  isSubscriptionActive: boolean;
}

const ExtensionDownload: React.FC<ExtensionDownloadProps> = ({ isSubscriptionActive }) => {
  if (!isSubscriptionActive) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600 font-medium">
          Você precisa ter uma assinatura ativa para baixar a extensão.
        </p>
      </div>
    );
  }

  const extensionUrl = import.meta.env.VITE_EXTENSION_URL;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Download da Extensão FoodBot</h3>
      <div className="space-y-4">
        <a
          href={extensionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Download size={20} className="mr-2" />
          Instalar Extensão
        </a>
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">Instruções de instalação:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Clique no botão acima para abrir a Chrome Web Store</li>
            <li>Clique em "Adicionar ao Chrome"</li>
            <li>Confirme a instalação</li>
            <li>A extensão será instalada automaticamente</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ExtensionDownload;