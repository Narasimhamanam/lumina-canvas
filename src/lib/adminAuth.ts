// Simple client-side admin auth.
// WARNING: Hardcoded credentials are visible in the JS bundle. This was
// chosen by the site owner; replace with real auth (e.g. Supabase email/password)
// for production.
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin@123";
const KEY = "nm_admin_session";

export const adminLogin = (username: string, password: string) => {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(KEY, "1");
    return true;
  }
  return false;
};

export const adminLogout = () => sessionStorage.removeItem(KEY);

export const isAdmin = () => sessionStorage.getItem(KEY) === "1";
