# Muhammad Farhan — Digital Wedding Invitation

React + Vite one-page invitation. Embroidered ivory-and-sage design, a linen-door opening, and the URL decides which events a guest sees.

## Run it

```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/ — upload to Netlify / Vercel / Cloudflare Pages / GitHub Pages
```

## URL rules

Each event has a **code** (set in `src/config.js`): **Mehndi = `0317`**, **Barat = `812`**, **Walima = `1554`**. Event names in the URL do not work, only codes.

| URL | Guest sees |
|---|---|
| `/` | Announcement only: *Muhammad Farhan weds Daughter of M. Akhtar Mughal* |
| `/?0317` | Mehndi only |
| `/?812` | Barat only |
| `/?1554` | Walima only |
| `/?0317&812` | Mehndi + Barat |
| `/?0317&1554` | Mehndi + Walima |
| `/?0317&812&1554` | All three |

- Also accepted: `?events=0317,812` and `?e=0317-812`.
- Events always appear in ceremony order, whatever order the codes are in.
- Add `&to=Khan%20Family` to personalise the intro label and greeting, and `&lang=ur` to open in Urdu.
- **Link maker for the family:** open `/#links`, tick events, type a name, copy the link, and send it on WhatsApp.

## Page flow

Design: embroidered ivory linen, sage ivy, pearl wisteria, white orchids and roses, drawn entirely in SVG code (`src/components/Embroidery.jsx`), no image files.

1. **Intro**: two linen door panels tied with a frayed chiffon bow. Tap anywhere: the bow lets go, the doors swing open and a few pearls burst. Music starts on that tap.
2. **Hero**: stone arch over a lake and mountains, with the names inside ("We are getting married"), the date range and city, and a *Scroll down* button.
3. **Verse and families**: two rose-wrapped columns around Bismillah and Surah Ar-Rum 30:21, then the hosts line and the two families.
4. **The Celebrations**: one card per invited event with an embroidered garland, date, programme times, venue, a map link and an add-to-calendar button.
5. **Countdown** to the first upcoming invited event.
6. **Closing**: dua, "Looking forward" and the R.S.V.P list.
7. **Finale**: monogram, names, date range and city, and the urns of white roses.

Top-right on every screen: **English / اردو** switch (also `?lang=ur` in the link) and a **music mute/unmute** button. Music is a soft generated piece started by the intro tap; to use your own track, set `music` in `src/config.js`.

Layout adapts to phone, tablet and desktop. The intro and hero are phone-shaped scenes that scale with the screen height; on wide screens the flora continues into the empty sides, on short landscape phones the hero scrolls instead of shrinking. Events sit side by side on wide screens. Checked from 320 px wide up to 1920 px with no sideways scrolling.

Announcement mode (no events in the URL) shows only the hero, closing and finale: no verse, events, countdown or RSVP list.

## Where things are

- `src/config.js`: **all content** (names, dates, programme times, venues, RSVP contacts, music). Edit this only.
- `src/lib/invite.js`: URL parsing, date formatting, calendar and map links.
- `src/components/`: `GiftIntro` (doors and bow), `Hero`, `Verse`, `Celebrations`, `Countdown`, `Closing`, `Finale`, `Urn`, `Embroidery` (all the artwork), `MusicButton`, `LinkMaker`.
- `src/styles.css`: the whole look.
- `public/assets/music.mp3`: add your own file. The music button hides itself if it's missing.

## Libraries

React 18, Vite 6, GSAP 3.13 + ScrollTrigger + @gsap/react (animation), Lenis (smooth scroll), canvas-confetti (the pearl burst when the doors open). Fonts: Pinyon Script, Cormorant Garamond, Jost, Amiri, Noto Nastaliq Urdu.

## Content still needed

- **Map links** for Chak No. 54/4-R (Mehndi and Barat) and Al-Faisal Marquee (optional). They currently search by venue name and address.
- **RSVP phone numbers.** The card lists only names; add `phone` to entries in `rsvpContacts` to make them tap-to-call. Zeeshan Ahmed (0304-8481466) is done; the other RSVP names and the Walima venue number 0302-4364966 have no number yet.
- **Music file** (optional): put it in `public/assets/` and set `music` in `src/config.js`. By default (`music: ""`) the built-in soft generated music plays.
- **Urdu text.** Translations are in the `ur` block of `config.js` and `src/lib/i18n.jsx`; worth a read-through by a native speaker.
- **Event end times** are estimates (used only for the add-to-calendar button).
