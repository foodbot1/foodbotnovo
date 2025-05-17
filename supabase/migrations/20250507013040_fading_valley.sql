/*
  # Add backup links for sensitive information

  1. Changes
    - Add initial links for backup information
    - Set links as inactive by default for security
    
  2. Security
    - Only admins can see these links
    - Links are inactive by default
*/

INSERT INTO links (name, url, description, active) 
VALUES 
  (
    'Firebase Config',
    'https://console.firebase.google.com/project/foodbot-73cc8/settings/general/',
    'Configurações do projeto Firebase, incluindo chaves de API e IDs',
    false
  ),
  (
    'Google Cloud Console',
    'https://console.cloud.google.com/apis/credentials',
    'Credenciais OAuth e chaves de API do Google Cloud',
    false
  ),
  (
    'Mercado Pago Dashboard',
    'https://www.mercadopago.com.br/developers/panel/app',
    'Credenciais e configurações do Mercado Pago',
    false
  ),
  (
    'Webhook Config',
    'https://foodbot-webhook-production.up.railway.app/webhook-pagamento',
    'URL do webhook para notificações de pagamento',
    false
  ),
  (
    'Chrome Web Store',
    'https://chromewebstore.google.com/detail/avalyoai/kgjelbicakaadbongldeojjhdkbigecf',
    'Link temporário da extensão no Chrome Web Store',
    false
  );