# UoG Public Health Academy — Cloudflare + Supabase ማገናኛ መመሪያ

ይህ ፋይል የCloudflare Workers እና Supabase ማዋቀሪያ ነው። **እስካሁን ከእርስዎ Cloudflare/Supabase አካውንቶች ጋር አልተገናኘም፤ የእነሱ የግል መረጃ ሳይኖረኝ ማገናኘት አልችልም።**

## 1) Supabase database ማዘጋጀት

1. Supabase ፕሮጀክትዎን ይክፈቱ።
2. በግራ በኩል **SQL Editor → New query** ይምረጡ።
3. በዚህ ፕሮጀክት ውስጥ `supabase/schema.sql` ያለውን ሙሉ ኮድ ይክፈቱ፣ ኮፒ አድርገው SQL Editor ውስጥ ይለጥፉና **Run** ይጫኑ። ከዚህ በፊት ያልተጠቀመበት አዲስ ፕሮጀክት መሆኑን ያረጋግጡ።
4. **Project Settings → API / Connect** ውስጥ Project URL እና Publishable key (ወይም የቆየ anon key) ያግኙ።
5. **Authentication → URL Configuration** ውስጥ የCloudflare ድረ-ገጽ አድራሻ ከተፈጠረ በኋላ እንደ Site URL እና redirect URL ያክሉ።

## 2) Cloudflare ላይ ፕሮጀክቱን ማስገባት

ይህ Next.js መተግበሪያ ነው፤ ሙሉ authentication/database ባህሪ እንዲሰራ **Cloudflare Workers** በOpenNext አስማሚ መጠቀም ይመከራል። ቀላል static Cloudflare Pages upload ብቻ ሙሉ Next.js ሰርቨር ባህሪዎችን አያስኬድም።

1. ZIP ፋይሉን ወደ ኮምፒውተርዎ አውርደው **Extract All** ያድርጉ።
2. ፕሮጀክቱን GitHub repository ውስጥ ይጫኑ። (Cloudflare ከGitHub ማገናኘት ይችላል።)
3. Cloudflare Dashboard → **Workers & Pages → Create → Connect to Git** ይምረጡና repository ያገናኙ። ከተጠየቀ OpenNext/Next.js ማዋቀሪያውን ይቀበሉ።
4. የWorker **Settings → Variables and Secrets** ውስጥ እነዚህን ሁለት ያክሉ፦
   - `NEXT_PUBLIC_SUPABASE_URL` = Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Supabase Publishable key (ወይም anon public key)
5. እነዚህ ለ**Production** እና Preview environments እንደሚያስፈልጉ ያስቀምጡ፣ ከዚያ deploy ያድርጉ።

### በኮምፒውተር ላይ CLI መጠቀም ከቻሉ

Node.js 20.9+ እና Git ያስፈልጋሉ። ፕሮጀክቱ ውስጥ terminal ከከፈቱ በኋላ:

```bash
npm install
npx wrangler login
npm run preview:cloudflare
```

Preview ከተሳካ እና environment variables ከተዘጋጁ በኋላ:

```bash
npm run deploy:cloudflare
```

## 3) አስፈላጊ የደህንነት ማስጠንቀቂያ

- **Service role / secret key ፈጽሞ አታስገቡ።** የሚጠቀሙት public publishable/anon key ብቻ ነው።
- የCloudflare እና Supabase password ወይም private key በቻት አትላኩ።
- በSupabase SQL Editor የ`schema.sql` ሙሉ ኮድ መስራቱን ያረጋግጡ።
- የመጀመሪያ Admin ለመፍጠር README.md ውስጥ “Create the first admin safely” የሚለውን ይከተሉ።
- Deploy ከተሳካ በኋላ registration, admin approval, profile photo, resource upload/download እና chat በተለያዩ ሂሳቦች ይፈትሹ።

## 4) ስለ ፕሮጀክቱ

Developer: Senay Addisu Belew · Telegram: https://t.me/besilencewell
