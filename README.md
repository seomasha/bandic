# Poliklinika Bandić — website redesign

A modern, multilingual (EN / BS / DE) marketing site for Poliklinika Bandić
(Dental Ortodont Centar dr Bandić), Sarajevo — built around the clinic's
dental tourism offering.

Stack: React 19 + Vite + Tailwind CSS v4 + react-router-dom + react-i18next +
framer-motion.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Structure

- `src/i18n/locales/{en,bs,de}.json` — all site copy, per language. Prices,
  names and structured data live here too (as `returnObjects` arrays), so
  content edits mostly happen in these three files.
- `src/pages/` — one file per route (`Home`, `DentalTourism`, `Services`,
  `Team`, `Prices`, `Contact`).
- `src/components/` — shared UI (`Navbar`, `Footer`, `Reveal` scroll
  animation wrapper, `FileDropzone`, `Accordion`, etc).

## Content sourcing & honesty notes

Every price, doctor name/title, address, phone number and working-hours
figure on this site was pulled from Poliklinika Bandić's own published price
list and team page (via public search results, since the live site could not
be fetched directly from this environment). Nothing was invented. Two
deliberate exceptions to be aware of:

- **Patient testimonials were intentionally left out.** No verified
  quotes were available, so rather than inventing names/quotes the site
  instead links to the clinic's real Facebook page and cites the public
  "top 5 rated" fact.
- **Western Europe comparison prices** (dental tourism price-comparison
  table) are indicative market averages compiled from public industry
  sources for Germany/Austria/UK — not a specific competitor's price list.
  This is disclosed in the footnote under the table.

## Before going live — things a human still needs to do

1. **Real logo & photos.** The current logo is a CSS/SVG placeholder in the
   clinic's gold, and doctor "photos" are generated initials. Swap in the
   real logo file and real clinic/team photography — this matters most for
   a dental-tourism audience deciding whether to book a flight.
2. **Forms currently use `mailto:`.** The contact form and the dental
   tourism quote form (including file uploads) open the visitor's email
   client instead of submitting to a backend — there is no server in this
   project. This works, but file attachments must be added manually by the
   visitor in their email client. For a smoother experience, wire the forms
   to a form backend that supports attachments (e.g. Web3Forms or
   Formspree — both have a free tier and need only an access key, no
   server to run).
3. **Full price list.** The price list page shows a curated selection from
   the categories that had published prices; confirm it's complete/current
   and add missing categories (e.g. full prosthetics range) once you have
   the clinic's latest master price list.
4. **Google Maps embed** on the Contact page uses the address directly; no
   API key required, but worth double-checking the pin lands on the right
   building once deployed.
5. **Verify all translated copy** (BS is likely closest to a native voice
   check; EN and DE should also be reviewed by a fluent speaker before
   launch).
