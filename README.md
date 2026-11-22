# FATIMA — Real Estate Growth System (landing page)

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide.

```bash
npm install
npm run dev     # http://localhost:3002
npm run build && npm start
```

## Configuration (`.env.local`, see `.env.example`)

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (metadata, Open Graph, sitemap, robots) |
| `NEXT_PUBLIC_CONSULTATION_URL` | Lien de réservation (Calendly, Cal.com…). Vide → tous les CTA défilent vers le formulaire `#diagnostic` |
| `NEXT_PUBLIC_VSL_VIDEO_URL` | VSL : URL YouTube, Vimeo ou fichier .mp4. Vide → visuel de remplacement soigné |
| `NEXT_PUBLIC_VSL_POSTER_URL` | Miniature optionnelle de la VSL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro (format international sans +) proposé en secours si l'envoi du formulaire échoue |
| `CONSULTATION_WEBHOOK_URL` | **Serveur.** Le formulaire envoie chaque demande en JSON à ce webhook (Make, Zapier, n8n, Apps Script, CRM). Vide → l'API répond 503 et le formulaire affiche une erreur — il ne confirme jamais une demande non enregistrée |

## Où modifier quoi

- `src/config/site.ts` — couleurs, navigation, URLs, SEO.
- `src/config/content.ts` — tous les textes (FR), FAQ, offre, formulaire.
- `src/config/brand-icons.ts` — logos Meta / WhatsApp / Instagram… (Simple Icons, CC0).
- `src/components/sections/*` — une section par fichier, dans l'ordre de `src/app/page.tsx`.
- `src/components/visuals/*` — mini-interfaces et illustrations SVG/CSS.
- `src/app/api/consultation/route.ts` — point d'intégration du formulaire.

## À valider avant publication

Tarifs, budget publicitaire minimum, canaux réellement proposés, intégrations de l'agent, durée du diagnostic,
délais, conditions contractuelles, lien de réservation / WhatsApp, et références clients vérifiables
(aucun témoignage ni chiffre n'a été inventé sur la page ; les graphiques sont des illustrations sans données).
