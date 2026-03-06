// profile-filter.js
// Purpose: When a profile is clicked, keep that selected profile visible in the header
// on profile pages (ella/arjay/edmar), hiding the others.
(function () {
  const isIndex = /(^|\/)index\.html$/i.test(location.pathname) || location.pathname.endsWith("/");
  if (isIndex) return;

  const params = new URLSearchParams(location.search);
  let selected = (params.get("p") || "").trim().toLowerCase();

  if (!selected) {
    const m = location.pathname.toLowerCase().match(/\/(ella|edmar|arjay)\.html$/);
    if (m) selected = m[1];
  }

  if (!selected) return;

  const container = document.querySelector(".profiles");
  if (!container) return;

  const links = Array.from(container.querySelectorAll("a.profile"));
  links.forEach((a) => {
    const id = (a.getAttribute("data-profile") || "").trim().toLowerCase();
    if (!id) return;

    if (id === selected) {
      a.classList.add("profile-is-selected");
      return;
    }

    // Hide immediately (prevents the "buffer" where all 3 show first)
    a.style.display = "none";
  });
})();

