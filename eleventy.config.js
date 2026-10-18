// Eleventy-Konfiguration: Vorlagen in site/, Ausgabe nach public/, Daten aus daten/ über site/_data/daten.js.
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  const pathPrefix = process.env.PATH_PREFIX || "/Leben-Lernen/";

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "site/robots.txt": "robots.txt" });
  eleventyConfig.addWatchTarget("daten/");

  // Datum wie 18. Oktober 2026
  const monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  eleventyConfig.addFilter("datum", iso => {
    if (!iso) return "";
    const [j, m, t] = String(iso).split("-").map(Number);
    if (!j || !m || !t) return iso;
    return `${t}. ${monate[m - 1]} ${j}`;
  });
  eleventyConfig.addFilter("datumKurz", iso => {
    if (!iso) return "";
    const [j, m, t] = String(iso).split("-");
    return t && m ? `${t}.${m}.${j}` : iso;
  });
  // Issue-Link „Korrektur vorschlagen“ mit vorausgefüllten Feldern
  eleventyConfig.addFilter("issueLink", (site, seite, bezug) => {
    const p = new URLSearchParams();
    p.set("template", site.issueVorlage);
    p.set("title", `Anmerkung: ${seite.titel || seite.url}`);
    p.set("seite", `${site.url}${site.pathPrefix.replace(/\/$/, "")}${seite.url || ""}`);
    if (bezug) p.set("bezug", bezug);
    return `${site.repoUrl}/issues/new?${p.toString()}`;
  });
  eleventyConfig.addFilter("woerter", text => String(text || "").trim().split(/\s+/).filter(Boolean).length);
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("where", (arr, key, val) => (arr || []).filter(x => x && x[key] === val));
  eleventyConfig.addFilter("json", v => JSON.stringify(v));
  eleventyConfig.addFilter("prozent", (a, b) => (b ? Math.round((a / b) * 100) : 0));
  eleventyConfig.addFilter("alter", p => (p.bis == null ? `${p.von}+ Jahre` : `${p.von}–${p.bis} Jahre`));

  return {
    dir: { input: "site", includes: "_includes", data: "_data", output: "public" },
    pathPrefix,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"]
  };
};
