import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3CYZqWvMAGnUU5CDujSB04ia0Aq-B6Ic",
  authDomain: "foodbot-73cc8.firebaseapp.com",
  databaseURL: "https://foodbot-73cc8-default-rtdb.firebaseio.com",
  projectId: "foodbot-73cc8",
  storageBucket: "foodbot-73cc8.appspot.com",
  messagingSenderId: "757969990378",
  appId: "1:757969990378:web:d1c1bedaa42d07e8cf5d93"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function loginAndPay() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // ✅ NOVO: chama rota GET para /pagamento?uid=xxx
    const response = await fetch(`/pagamento?uid=${user.uid}`);
    
    if (response.redirected) {
      window.location.href = response.url;  // Redireciona para Stripe Checkout
    } else {
      alert("Erro ao iniciar pagamento");
    }

  } catch (error) {
    alert("Erro: " + error.message);
  }
}

export { loginAndPay };