# Page-wise Restructure — Deploy ও Migration ধাপ

⚠️ **UI/design অপরিবর্তিত থাকার নীতি:** এই পুরো restructure-এর সময় ইচ্ছাকৃতভাবে ফ্রন্টএন্ড-এর
কোনো কম্পোনেন্ট, CSS, বা JSX structure বদলানো হয়নি — শুধু `getStaticProps`-এ data
fetch করার কোড বদলে নতুন singleType থেকে পড়া হচ্ছে, এবং fetcher ফাংশনগুলো পুরনো
shape-এর সাথে হুবহু মিলিয়ে ডেটা রিটার্ন করছে। তাই migration সঠিকভাবে চালানো ও data
সঠিকভাবে বসানো হলে live site দেখতে/কাজ করতে আগের মতোই থাকবে, শুধু editor এখন এক
জায়গা থেকে পুরো page-টা এডিট করতে পারবে।

## ১) Code deploy
এখন পর্যন্ত যা নতুন যোগ হয়েছে:

**Home page:**
- `src/api/home-page/**` — নতুন `home-page` singleType
- `src/components/home-page/**` — component: `project-card`, `intro-video`,
  `academic-committee`, `recent-activity`
- `scripts/migrate-home-page.js`

**Mosque Complex page:**
- `src/api/mosque-complex-page/**` — নতুন `mosque-complex-page` singleType
- `src/components/mosque-complex-page/**` — component: `detail`, `project-summary`,
  `main-activities`, `complex-info` (homeCard-এর জন্য home-page-এর project-card
  কম্পোনেন্ট reuse করা হয়েছে)
- `scripts/migrate-mosque-complex-page.js`

Server-এ যেভাবে deploy করেন সেভাবেই deploy করুন, তারপর Strapi restart করুন। Restart হলে
Strapi নিজে থেকেই নতুন টেবিলগুলো বানিয়ে নেবে — পুরনো কোনো টেবিল/ডেটা মুছে যায় না বা
বদলায় না, শুধু নতুন টেবিল যোগ হয়।

## ২) Migration script চালানো
Strapi admin-এ ঢুকে **Settings > API Tokens > Create new API Token** থেকে একটা
"Full access" টোকেন বানান (ব্যবহারের পর delete করে দেওয়া ভালো — টোকেন কখনো চ্যাটে/
কোডে/git-এ পেস্ট বা কমিট করবেন না)। তারপর:

```bash
STRAPI_URL="https://your-server-domain.com" \
STRAPI_TOKEN="আপনার-টোকেন" \
node scripts/migrate-home-page.js

STRAPI_URL="https://your-server-domain.com" \
STRAPI_TOKEN="আপনার-টোকেন" \
node scripts/migrate-mosque-complex-page.js
```

**home-page script** যা করবে: পুরনো `home`, `our-projects` (id 1/2/3 = মসজিদ/কুল্লিয়া/
দারুল হাদিস), `home-slider`, `recent-activities`, `founder-message` থেকে ডেটা পড়ে নতুন
`home-page` entry বানাবে। `introVideo`/`academicCommittee`-এর ডিফল্ট ভ্যালু বসাবে
(এগুলোর জন্য আগে কোনো content-type ছিল না, `data/block.js`-এ hardcoded ছিল)।

**mosque-complex-page script** যা করবে: পুরনো `imam-bukhari-detail`,
`mosque-project-summary`, `mosque-main-activitie`, `mosque-complex`, এবং
`our-projects`(id=1, homeCard-এর জন্য) থেকে ডেটা পড়ে নতুন `mosque-complex-page`
entry বানাবে।

## ৩) Admin panel-এ গিয়ে চোখে যাচাই
প্রতিটা নতুন singleType entry-তে ঢুকে পুরনো field-গুলোর সাথে মিলিয়ে দেখুন (title/text/
ছবি/relation ঠিক বসেছে কিনা), তারপর **Publish** করুন (draftAndPublish চালু আছে, তাই
publish না করলে frontend-এ দেখাবে না)।

## ৪) Frontend deploy
Frontend repo-র (imam-bukhari-trust-web) এই পরিবর্তনগুলো ইতিমধ্যে কোডে করা আছে —
admin-এর নতুন schema deploy+migrate হওয়ার পরে frontend deploy করলেই এটা নতুন
endpoint থেকে পড়া শুরু করবে:
- `lib/apiV/homePage.js`, `lib/apiV/mosqueComplexPage.js` (নতুন fetcher)
- `pages/index.js`, `pages/bukhari-jame-masjid.js` (নতুন fetcher ব্যবহার করে, JSX/UI অপরিবর্তিত)

Migration চালানোর পরেও frontend deploy না হওয়া পর্যন্ত সাইট আগের মতোই পুরনো endpoint
থেকে পড়তে থাকবে — কোনো ব্রেকেজ হবে না।

## ৫) Live site-এর সাথে UI মিলিয়ে যাচাই (জরুরি)
Frontend deploy হওয়ার পর প্রতিটা migrate করা page (`/`, `/bukhari-jame-masjid`)
production-এ (https://www.imambukharitrust.com/) খুলে আগের screenshot/memory-র সাথে
পিক্সেল-বাই-পিক্সেল না হলেও section-বাই-section মিলিয়ে দেখুন — section-এর ক্রম, প্রতিটা
section-এর টেক্সট/ছবি সংখ্যা, project card-এর content আগের মতোই আছে কিনা।

## ৬) সব যাচাই হওয়ার পর — admin menu থেকে পুরনো content-type hide করা
Settings > Roles > (যে role editor ব্যবহার করে) এ গিয়ে নিচের content-type গুলোর সব
permission (Create/Read/Update/Delete/Publish) uncheck করে Save করুন। Super Admin
role-এ কিছু বদলাবেন না।

**এখনই hide করা যায় (frontend-এ এখন hardcoded/unused, restructure-নিরপেক্ষ):**
- Advisory board
- Course
- Admission information
- Academic head message

**home-page migration + frontend deploy সম্পন্ন হওয়ার পরেই hide করুন:**
- Home (পুরনো), Our project, Home slider, Recent activitie

**mosque-complex-page migration + frontend deploy সম্পন্ন হওয়ার পরেই hide করুন:**
- Imam Bukhari Detail, Mosque Project Summary, Mosque Main activitie, Mosque Complex

⚠️ এই ধাপটা schema বা ডেটা মোছে না — শুধু Editor role-এর admin-menu ভিউ থেকে
লুকায়। Super Admin থেকে এখনো সব দেখা/রিকভার করা যাবে।
