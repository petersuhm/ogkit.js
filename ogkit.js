const render = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const shouldRender = urlParams.has("ogkit-render");

  if (!shouldRender) {
    return;
  }

  const template = document.querySelector("template[data-og-template]");

  if (!template) {
    return;
  }

  const html = template.innerHTML;

  const width = 1280;
  const height = 720;

  document.body.innerHTML = `<div style="height: ${height}px; width: ${width}px;">${html}</div>`;

  document.body.removeAttribute("class");
  document.body.removeAttribute("style");

  window.__OG_READY__ = true;
};

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  render();
} else {
  window.addEventListener("DOMContentLoaded", render);
}
