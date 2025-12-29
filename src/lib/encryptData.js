import CryptoJS from "crypto-js";
export function encryptData(dataToEncrypt) {
  var randomKey = generateRandomText();
  var randomIv = generateRandomText();
  var key = CryptoJS.enc.Base64.parse(randomKey);
  var initVector = CryptoJS.enc.Base64.parse(randomIv);
  var utf8Stringified = CryptoJS.enc.Utf8.parse(dataToEncrypt);
  var encryptedData = CryptoJS.AES.encrypt(utf8Stringified.toString(), key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: initVector,
  });
  return (
    randomKey +
    randomIv +
    encryptedData.ciphertext.toString(CryptoJS.enc.Base64)
  );             
}

/**
 * <p>
 * Method to dynamically generate text by math.random
 * </p>
 *
 * @returns dynamically generated 24 digit string
 */
function generateRandomText() {
  return "xxxxxxxxxxx/xxxxxxxxxx==".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const sessionEncrypt = (dataToEncrypt) => {
  const encryptedToken = CryptoJS.AES.encrypt(
    dataToEncrypt,
    secretKey
  ).toString();
  return encryptedToken;
};

// Resolve secret key in a browser-friendly way:
// - In Vite, use an env var prefixed with VITE_ (e.g. VITE_SECRET_KEY)
// - `process` is undefined in the browser which caused your error
// WARNING: embedding a secret key in client-side code exposes it to users. Prefer server-side encryption when possible.
const secretKey = (typeof process !== "undefined" && process.env && process.env.SECRET_KEY)
  ? process.env.SECRET_KEY
  : (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SECRET_KEY)
  ? import.meta.env.VITE_SECRET_KEY
  : "MySecretKey"; // fallback (unsafe)

export const sessionDecrypt = (storedEncryptedToken) => {
  if (storedEncryptedToken) {
    // Decrypt the token
    const bytes = CryptoJS.AES.decrypt(storedEncryptedToken, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } else {
    // console.log("No token found");
  }
};
