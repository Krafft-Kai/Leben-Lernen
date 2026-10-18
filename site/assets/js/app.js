/* Leben Lernen – Bedienung auf allen Seiten:
   Rollen-Filter, Darstellung hell/dunkel, Altersregler, Drucken, Kommentare nach Klick laden.
   Keine Tracker, keine KI. localStorage nur für Rolle und Darstellung, jeder Zugriff in try/catch. */
(() => {
  "use strict";
  const html = document.documentElement;

  const lies = key => { try { return localStorage.getItem(key); } catch (e) { return null; } };
  const schreib = (key, wert) => {
    try {
      if (wert == null) localStorage.removeItem(key); else localStorage.setItem(key, wert);
    } catch (e) { /* privater Modus oder gesperrt: Auswahl gilt nur für diese Seite */ }
  };

  /* ---------- Rollen-Filter ---------- */
  const ROLLEN = ["alle", "eltern", "lehrkraefte", "jugendliche", "erwachsene"];
  const rollenKnoepfe = [...document.querySelectorAll(".rollen .seg button[data-rolle]")];
  function setzeRolle(rolle, speichern) {
    if (!ROLLEN.includes(rolle)) rolle = "alle";
    html.dataset.rolle = rolle;
    rollenKnoepfe.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.rolle === rolle)));
    if (speichern) schreib("ll-rolle", rolle === "alle" ? null : rolle);
  }
  rollenKnoepfe.forEach(b => b.addEventListener("click", () => setzeRolle(b.dataset.rolle, true)));
  setzeRolle(lies("ll-rolle") || "alle", false);

  /* ---------- Darstellung: automatisch → hell → dunkel ---------- */
  const THEMEN = [
    { wert: null, name: "automatisch", giscus: "preferred_color_scheme" },
    { wert: "light", name: "hell", giscus: "light" },
    { wert: "dark", name: "dunkel", giscus: "dark" }
  ];
  const themeKnopf = document.querySelector("[data-theme-umschalter]");
  let themeIndex = Math.max(0, THEMEN.findIndex(t => t.wert === (lies("ll-theme") || null)));
  function setzeTheme(i, speichern) {
    themeIndex = i;
    const t = THEMEN[i];
    if (t.wert) html.dataset.theme = t.wert; else delete html.dataset.theme;
    if (themeKnopf) {
      themeKnopf.textContent = `Darstellung: ${t.name}`;
      themeKnopf.setAttribute("aria-label", `Darstellung: ${t.name}. Umschalten`);
    }
    if (speichern) schreib("ll-theme", t.wert);
    // Geladene Kommentare an die Darstellung anpassen
    const frame = document.querySelector("iframe.giscus-frame");
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ giscus: { setConfig: { theme: t.giscus } } }, "https://giscus.app");
    }
  }
  if (themeKnopf) themeKnopf.addEventListener("click", () => setzeTheme((themeIndex + 1) % THEMEN.length, true));
  setzeTheme(themeIndex, false);

  /* ---------- Altersregler ---------- */
  document.querySelectorAll("[data-altersregler]").forEach(box => {
    const eingabe = box.querySelector("[data-alter-eingabe]");
    const ausgabe = box.querySelector("[data-alter-ausgabe]");
    const link = box.querySelector("[data-alter-link]");
    const phasen = [...box.querySelectorAll("[data-phasen] a")].map(a => ({
      href: a.href,
      von: Number(a.dataset.von),
      bis: a.dataset.bis === "" ? Infinity : Number(a.dataset.bis),
      name: a.dataset.name,
      alter: a.dataset.alter
    }));
    if (!eingabe || !phasen.length) return;
    const phaseZu = alter => phasen.find(p => alter >= p.von && alter < p.bis) || phasen[phasen.length - 1];
    let zeiger = false;
    function aktualisiere() {
      const alter = Number(eingabe.value);
      const p = phaseZu(alter);
      if (ausgabe) ausgabe.textContent = alter === 1 ? "1 Jahr" : `${alter} Jahre`;
      if (link) {
        link.href = p.href;
        link.textContent = `Zur Phase ${p.name} (${p.alter})`;
      }
      return p;
    }
    eingabe.addEventListener("input", aktualisiere);
    // Mit Maus oder Finger: beim Loslassen zur Phase wechseln. Mit der Tastatur bleibt man auf der Seite
    // und folgt dem Link, damit Pfeiltasten nicht bei jedem Schritt die Seite wechseln.
    eingabe.addEventListener("pointerdown", () => { zeiger = true; });
    eingabe.addEventListener("keydown", () => { zeiger = false; });
    eingabe.addEventListener("change", () => {
      const p = aktualisiere();
      if (zeiger) location.href = p.href;
    });
    aktualisiere();
  });

  /* ---------- Drucken ---------- */
  document.querySelectorAll("[data-drucken]").forEach(b => b.addEventListener("click", () => window.print()));

  /* ---------- Kommentare (giscus) erst nach Klick laden ---------- */
  document.querySelectorAll("[data-giscus]").forEach(box => {
    const knopf = box.querySelector("[data-giscus-laden]");
    if (!knopf) return;
    knopf.addEventListener("click", () => {
      const s = document.createElement("script");
      s.src = "https://giscus.app/client.js";
      s.async = true;
      s.crossOrigin = "anonymous";
      for (const [key, wert] of Object.entries(box.dataset)) {
        if (key === "giscus") continue;
        // dataset-Schlüssel (repoId) zurück in data-Attribute (data-repo-id)
        s.setAttribute("data-" + key.replace(/[A-Z]/g, c => "-" + c.toLowerCase()), wert);
      }
      if (THEMEN[themeIndex].wert) s.setAttribute("data-theme", THEMEN[themeIndex].giscus);
      const ziel = box.nextElementSibling && box.nextElementSibling.classList.contains("giscus") ? box.nextElementSibling : box;
      ziel.appendChild(s);
      box.hidden = true;
    });
  });
})();
