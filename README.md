# Your portfolio — setup guide

No login, no database, no signup — you edit `data.js` directly and push to GitHub
whenever you want to update something. Simple and fully free.

## What you have

```
index.html                 → the site
styles.css                  → all design/theme styling (colors, fonts, layout)
app.js                        → renders the site from data.js
chatbot.js                     → the floating assistant
sky.js                           → animated night-stars / morning-clouds background
data.js                            → ALL your content lives here — this is the only file
                                      you normally need to touch
assets/certificates/                → put your certificate images here
assets/projects/                      → put your project screenshots here
```

---

## 1. How to update your content

Open `data.js`. Everything on the site — your name, roles, summary, education,
experience, projects, achievements, certificates, contact links — is one plain
JavaScript object. To change anything:

1. Edit the relevant field in `data.js` (see examples below).
2. Save the file.
3. Commit and push to GitHub (`git add . && git commit -m "update portfolio" && git
   push`) — GitHub Pages rebuilds automatically within a minute or two.

**Add a new project** — copy one block inside the `projects: [ ... ]` array and
change the values:
```js
{
  title: "Your New Project",
  status: "DEPLOYED",
  description: "One or two sentences about what it does and why it matters.",
  metrics: ["Metric 1", "Metric 2"],
  tech: ["Python", "FastAPI"],
  link: "https://github.com/PAVANTECH-06/your-repo",
  image: "assets/projects/your-project.jpg",
},
```

**Add a certificate** — same idea, inside `certificates: [ ... ]`:
```js
{ title: "Certificate Name", issuer: "Issuing body", year: "2026", image: "assets/certificates/your-cert.jpg" },
```

**Update education** — fill in the two `EDIT_ME` placeholders under `education: [
... ]` for your Intermediate (12th) and SSC (10th) details — school/college name and
your percentage or CGPA.

**Update your WhatsApp number** — the `whatsapp` field under `profile` should be
your number with country code and no symbols, e.g. `"919347846836"` for
`+91 93478 46836`.

---

## 2. Add certificate & project images

1. Drop image files into `assets/certificates/` and `assets/projects/`.
2. In `data.js`, set the `image` field to the relative path, e.g.
   `assets/certificates/aws-cloud-practitioner.jpg`.
3. Commit and push — done.

You can also just paste any public image URL instead of a local file — both work.

---

## 3. Deploy to your domain via GitHub Pages

Since your domain already points at a GitHub Pages repo:

1. Replace the contents of that repo with all the files in this project (same repo
   name/branch you already use for Pages).
2. Commit and push.
3. Your custom domain keeps working automatically — only the files changed, not the
   Pages/DNS configuration.
4. Give it 1–2 minutes, then hard-refresh your domain.

---

## 4. Customizing the look

- Colors and the day/night sky gradients are CSS variables at the top of
  `styles.css`, under `:root` (night) and `html[data-theme="day"]` (morning) — safe
  to tweak hex values there.
- Certificates scroll horizontally with the arrow buttons (`#certPrev` /
  `#certNext` in `index.html`, styled via `.cert-carousel` in `styles.css`) — add as
  many certificates as you want, they'll just keep scrolling.

## 5. The chatbot

`chatbot.js` is free and rule-based — no API key, no running cost. It answers from
whatever is currently in `data.js`, so once you edit and push, the chatbot's answers
update automatically too.
