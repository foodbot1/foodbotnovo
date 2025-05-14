import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// ✅ Substitua pelo link real da sua extensão publicada na Chrome Web Store
const EXTENSION_URL = 'https://chromewebstore.google.com/detail/abcd1234efgh5678ijkl9012mnop3456'; // <-- EDITAR AQUI

export function ExtensionDownload() {
  const [status, setStatus] = useState<'verificando' | 'aguardando' | 'ativo'>('verificando');

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const interval = setInterval(async () => {
      const user = auth.currentUser;

      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          if (data.status === 'ativo') {
            setStatus('ativo');
            clearInterval(interval); // ✅ Parar de checar quando ativado
          } else {
            setStatus('aguardando');
          }
        }
      }
    }, 3000); // Verifica a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  // Mensagens intermediárias
  if (status === 'verificando') return <p>🔄 Verificando status do pagamento...</p>;
  if (status === 'aguardando') return <p>⏳ Aguardando confirmação do pagamento...</p>;

  // Se pagamento confirmado, mostra o botão
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>✅ Pagamento confirmado!</h2>
      <p>Clique no botão abaixo para instalar sua extensão:</p>
      <a
        href={EXTENSION_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#fa090d',
          color: '#fff',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '10px',
        }}
      >
        Instalar extensão agora
      </a>
    </div>
  );
}
