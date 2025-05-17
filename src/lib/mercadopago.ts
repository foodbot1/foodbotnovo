import { loadMercadoPago } from '@mercadopago/sdk-js';

export const initMercadoPago = async () => {
  await loadMercadoPago();
  const mp = new MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);
  return mp;
};