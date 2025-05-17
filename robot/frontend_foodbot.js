import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3CYZqWvMAGnUU5CDujSB04ia0Aq-B6Ic",
  authDomain: "foodbot-73cc8.firebaseapp.com",
  databaseURL: "https://foodbot-73cc8-default-rtdb.firebaseio.com",
  projectId: "foodbot-73cc8",
  storageBucket: "foodbot-73cc8.firebasestorage.app",
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

    const response = await fetch("https://foodbotnovo.railway.app/criar-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: user.uid })
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erro ao gerar link de pagamento");
    }
  } catch (error) {
    alert("Erro: " + error.message);
  }
}
export { loginAndPay };