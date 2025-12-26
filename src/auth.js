// Simple mock auth for demo purposes
const users = {
  "alice@example.com": "password123",
  "bob@example.com": "secret",
}

export function isValidUser(email) {
  return Boolean(users[email?.toLowerCase()])
}

export function checkPassword(email, password) {
  const pw = users[email?.toLowerCase()]
  return pw && pw === password
}

export default { isValidUser, checkPassword }
