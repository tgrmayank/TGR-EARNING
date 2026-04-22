import {
  auth, db,
  RecaptchaVerifier, signInWithPhoneNumber,
  PhoneAuthProvider, signInWithCredential,
  doc, setDoc, getDoc, updateDoc, arrayUnion,
  signOut
} from "./firebase.js";

let verificationId;

// captcha only once
window.onload = () => {
  if (document.getElementById("recaptcha")) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      size: 'invisible'
    });
  }
};

// SEND OTP
window.sendOTP = async () => {
  const phone = "+91" + document.getElementById("phone").value;

  const res = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
  verificationId = res.verificationId;
  sessionStorage.setItem("vid", verificationId);
  location = "otp.html";
};

// VERIFY OTP
window.verifyOTP = async () => {
  const code = document.getElementById("otp").value;
  const vid = sessionStorage.getItem("vid");

  const cred = PhoneAuthProvider.credential(vid, code);
  const user = await signInWithCredential(auth, cred);

  const ref = doc(db, "users", user.user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { coins: 0, history: [] });
  }

  location = "home.html";
};

// SPIN
window.spin = async () => {
  const values = [10,20,30,40,50,100];
  const val = values[Math.floor(Math.random()*values.length)];

  const user = auth.currentUser;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

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