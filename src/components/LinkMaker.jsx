import React, { useState } from "react";
import { ArchCard } from "./Mughal";

/** Family-only helper at /#links: builds a personalised invitation link. */
export default function LinkMaker() {
  const [guest, setGuest] = useState("");
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState("en");

  const params = [...(guest.trim() ? [`to=${encodeURIComponent(guest.trim())}`] : []), ...(lang === "ur" ? ["lang=ur"] : [])].join("&");
  const base = window.location.href.split("#")[0].split("?")[0];
  const url = params ? `${base}?${params}` : base;

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  return (
    <main className="link-maker sand">
      <ArchCard tone="marble">
        <p className="kicker">For the family</p>
        <h1 className="event-title">Link Maker</h1>
        <label className="field">
          <span>Guest / family name <em>(optional)</em></span>
          <input type="text" value={guest} onChange={(e) => setGuest(e.target.value)} placeholder="e.g. Khan Family" />
        </label>
        <div className="field">
          <span>Language</span>
          <div className="pills">
            <label><input type="radio" name="lang" checked={lang === "en"} onChange={() => setLang("en")} /><span>English</span></label>
            <label><input type="radio" name="lang" checked={lang === "ur"} onChange={() => setLang("ur")} /><span>اردو</span></label>
          </div>
        </div>
        <div className="field">
          <span>Link</span>
          <code className="link-out">{url}</code>
        </div>
        <div className="actions">
          <button className="btn btn-solid" type="button" onClick={copy}>{copied ? "Copied ✓" : "Copy link"}</button>
          <a className="btn btn-solid" href={url} target="_blank" rel="noopener noreferrer">Preview</a>
        </div>
      </ArchCard>
    </main>
  );
}
