const render = async () => {
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

  const width = 1200;
  const height = 630;

  document.body.innerHTML = `<div style="height: ${height}px; width: ${width}px;">${html}</div>`;

  document.body.removeAttribute("class");
  document.body.removeAttribute("style");

  await new Promise(r => requestAnimationFrame(r));

  const timeout = (ms) => new Promise(r => setTimeout(r, ms));
  await Promise.race([
    (document.fonts && document.fonts.ready) || Promise.resolve(),
    timeout(1200)
  ]);

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
