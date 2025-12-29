export function checkPassword(email, password) {
  const pw = users[email?.toLowerCase()]
  return pw && pw === password
}

/**
 * checkUserAccount - calls remote service to verify if account exists.
 * If remote call fails, falls back to local mock users object.
 *
 * Note: the service endpoint expects an `id` field — in production this may
 * need to be an encrypted token. For now we send the plain email and infer
 * existence from the response. Adjust if the API contract differs.
 */
export async function checkUserAccount(email) {
  try {
    const res = await fetch(
      "https://beanstalk.myskillstree.com/skill/api/v1/skills/check/account/encrypt",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: email }),
      }
    );
    if (!res.ok) {
      return false;
    }
    const json = await res.json();

    // Try common response shapes
    if (typeof json === "object" && json !== null) {
      if (json.exists === true) return true;
      if (json.status === "success" && (json.data?.exists === true || json.data === true)) return true;
      if (json.data === true) return true;
      // If API returns something like { message: "Account found" }
      if (json.message && /found|exists/i.test(json.message)) return true;
    }
    // If API returns boolean true
    if (json === true) return true;

    return false;
  } catch (err) {
    // network/error fallback to local mock
    return Boolean(users[email?.toLowerCase()]);
  }
}

export default { isValidUser, checkPassword, checkUserAccount }
