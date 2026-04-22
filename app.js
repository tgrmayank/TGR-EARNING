import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from "./firebase.js";

let verifier;

// INIT
window.addEventListener("load", async () => {
  const container = document.getElementById("recaptcha");

  if (container) {
    verifier = new RecaptchaVerifier(auth, container, {
      size: "invisible"
    });

    await verifier.render();
    window.recaptchaVerifier = verifier;

    console.log("Captcha Ready");
  }
});

// SEND OTP
window.sendOTP = async () => {
  try {
    const num = document.getElementById("phone").value.trim();

    if (!/^[0-9]{10}$/.test(num)) {
      alert("Enter valid number");
      return;
    }

    const phone = "+91" + num;

    const result = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    sessionStorage.setItem("vid", result.verificationId);

    alert("OTP Sent");
    location = "otp.html";

  } catch (e) {
    console.error(e);
    alert("Error: " + e.message);
  }
};

// VERIFY OTP
window.verifyOTP = async () => {
  try {
    const code = document.getElementById("otp").value;
    const vid = sessionStorage.getItem("vid");

    const cred = PhoneAuthProvider.credential(vid, code);
    await signInWithCredential(auth, cred);

    alert("Login Success");
    location = "home.html";

  } catch (e) {
    alert("Wrong OTP");
  }
};const snap = await getDoc(ref);

  const coins = snap.data().coins || 0;

  await updateDoc(ref, {
    coins: coins + val,
    history: arrayUnion({ val, date: new Date().toLocaleString() })
  });

  alert("You got " + val);
};

// LOAD DATA
window.loadData = async () => {
  const user = auth.currentUser;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  const data = snap.data();
  document.getElementById("coins").innerText = data.coins;

  let h = "";
  data.history.forEach(e=>{
    h += `<p>+${e.val} (${e.date})</p>`;
  });
  document.getElementById("history").innerHTML = h;
};

// LOGOUT
window.logout = async () => {
  await signOut(auth);
  location = "login.html";
};c(db, "users", user.uid);
  const snap = await getDoc(ref);

  const data = snap.data();
  document.getElementById("coins").innerText = data.coins;

  let html = "";
  data.history.forEach(h => {
    html += `<p>+${h.amount} coins - ${h.date}</p>`;
  });
  document.getElementById("history").innerHTML = html;
};