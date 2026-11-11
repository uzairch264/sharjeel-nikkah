# Nikaah of Captain Muhammad Sharjeel Altaf & Sameen Shahbaz: Digital Invitation

React + Vite one-page invitation for a single event, the Nikaah:

- **Hosts:** Mr. and Mrs. Altaf Hussain Chaudhary
- **Date:** Saturday 19 December 2026
- **Time:** 2:00 PM to 4:00 PM
- **Venue:** Badshahi Masjid, Lahore

The design follows Badshahi Masjid: red sandstone, white marble inlay, onion domes, octagonal minarets and cusped Mughal arches. All the artwork is SVG code in `src/components/Mughal.jsx`. There are no image files.

## Run it

```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/ — upload to Netlify / Vercel / Cloudflare Pages / GitHub Pages
```

## Links

Every guest sees the same invitation. Two optional additions to the link:

| URL | Effect |
|---|---|
| `/` | The invitation |
| `/?to=Khan%20Family` | Adds "For Khan Family" on the gate and "Dear Khan Family," on the first page |
| `/?lang=ur` | Opens in Urdu |
| `/?to=Khan%20Family&lang=ur` | Both |

**Link maker for the family:** open `/#links`, type a name, choose a language, copy the link and send it on WhatsApp.

## Page flow

1. **Gate.** The masjid gateway: a marble-inlaid sandstone iwan with Bismillah on the inscription band, a dome behind it and a hanging brass lamp. Carved wooden doors with brass studs fill the arch. Tap anywhere: the doors swing open, light and rose petals spill out, and the view walks through the arch. Music starts on that tap.
2. **Hero.** Badshahi Masjid by day: the prayer hall, three marble domes, the great minarets, the courtyard arcades and the pool with a reflection. Pigeons lift off the domes. Above it are the names, the date and the venue.
3. **Invitation.** A marble mihrab-shaped panel with Bismillah, Surah Ar-Rum 30:21 and the invitation text, word for word.
4. **The Ceremony.** A sandstone arched card with the date, time and venue, a map link and an add-to-calendar button, followed by a countdown in four arched niches. The countdown hides once the Nikaah has started.
5. **Dua.** The marriage dua in Arabic and English, signed by the hosts.
6. **Finale.** The masjid lit up at night under a crescent moon, with the monogram, the names, the date and the venue.

Top-right on every screen: **English / اردو** switch and a **music mute/unmute** button.

The layout adapts to phone, tablet and desktop. It was checked at 320, 390, 768, 844 (landscape) and 1440 px wide, with no sideways scrolling. On wide screens the sandstone wall, the arcades and the outer minarets continue to the sides.

## Where things are

- `src/config.js`: **all content** (names, hosts line, date and time, venue, map link, music, Urdu text). Edit this file only.
- `src/components/Mughal.jsx`: all artwork (gateway, doors, masjid scene, arched card, ornaments).
- `src/lib/arch.js`: geometry for the cusped arches, onion domes and parapet merlons.
- `src/components/`: `Gate`, `Hero`, `Invitation`, `Ceremony`, `Countdown`, `Closing`, `Finale`, `TopBar`, `MusicButton`, `LinkMaker`.
- `src/styles.css`: the whole look. The colours are at the top (`--sand`, `--marble`, `--gold`, and so on).
- `src/lib/invite.js`: link parsing, date formatting, the calendar and map links.

## Libraries

React 18, Vite 6, GSAP 3.13 + ScrollTrigger + @gsap/react (animation), Lenis (smooth scroll), canvas-confetti (the petals when the gate opens). Fonts: Cinzel, Pinyon Script, Cormorant Garamond, Amiri, Noto Nastaliq Urdu.

## Still open

- **Urdu text.** The translations are in the `ur` block of `config.js` and in `src/lib/i18n.jsx`. A native speaker should read them through.
- **Music file** (optional): put a file in `public/assets/` and set `music` in `src/config.js`. By default the built-in generated qawwali-style music plays: harmonium, tabla (keherwa) and handclaps.
