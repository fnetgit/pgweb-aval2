export function clearState() {
  localStorage.removeItem("catalogState");
}

export function setupClearStateLinks() {
  document.getElementById("logo-link")?.addEventListener("click", clearState);
  document.getElementById("home-link")?.addEventListener("click", clearState);
}
