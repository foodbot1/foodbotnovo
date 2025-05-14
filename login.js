import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3CYZqWvMAGnUU5CDujSB04ia0Aq-B6Ic",
  authDomain: "foodbot-73cc8.firebaseapp.com",
  projectId: "foodbot-73cc8",
  storageBucket: "foodbot-73cc8.appspot.com",
  messagingSenderId: "757969990378",
  appId: "1:757969990378:web:d1c1bedaa42d07e8cf5d93"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // ✅ Redireciona direto para o link de pagamento Stripe
    window.location.href = `https://foodbot-backend.up.railway.app/pagamento?uid=${user.uid}`;



  } catch (error) {
    console.error("Erro no login:", error);
    alert("Erro ao fazer login. Tente novamente.");
  }
});
