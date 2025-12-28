/* ==========================================================================
 ReVive Index – JS
 ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const textEl = document.querySelector('#reviveIntroText');
  if (!textEl) return;

  const text =
    "Adéntrate en este libro.\n" +
    "Cada página guarda un recuerdo;\n" +
    "cada recuerdo puede volver a habitarse.\n\n" +
    "Este libro no se lee:\n" +
    "se atraviesa.";

  // Troika uses the "troika-text" component
  textEl.setAttribute('troika-text', 'value', text);
});

AFRAME.registerComponent('go-to-vr', {
  schema: { url: { type: 'string' } },
  init: function () {
    this.el.addEventListener('click', () => {
      window.location.href = this.data.url;
    });
  }
});