export function getAndSetLastSession(): string | null {
  const lastSession = localStorage.getItem("last_session");
  localStorage.setItem("last_session", new Date().toISOString());
  return lastSession;
}
