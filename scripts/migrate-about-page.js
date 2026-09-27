/**
 * পুরনো `about-content`, `characteristic`, `infrastructure-model` থেকে ডেটা পড়ে
 * নতুন `about-page` singleType-এ একবার লিখে দেয়, এবং mosque-complex-page/
 * kulliya-page/darul-hadith-page-এর সাথে relation যুক্ত করে (project card preview-এর
 * জন্য, তাদের homeCard থেকে টানা হবে)।
 *
 * ⚠️ গুরুত্বপূর্ণ ক্রম: এই script অবশ্যই সবার শেষে চালাতে হবে — নিচের ক্রমে আগে চালান:
 *   1. node scripts/migrate-mosque-complex-page.js
 *   2. node scripts/migrate-kulliya-page.js
 *   3. node scripts/migrate-darul-hadith-page.js
 *   4. node scripts/migrate-home-page.js
 *   5. node scripts/migrate-about-page.js   (এইটা)
 * কারণ এই script mosque-complex-page/kulliya-page/darul-hadith-page-এর entry id
 * relation হিসেবে বসায় — সেই entry গুলো আগে থেকে তৈরি না থাকলে relation ভুল/খালি হবে।
 *
 * চালানোর নিয়ম:
 *   STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-about-page.js
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('STRAPI_URL এবং STRAPI_TOKEN env var হিসেবে দিতে হবে। উদাহরণ:');
  console.error('STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-about-page.js');
  process.exit(1);
}

const api = async (path, options = {}) => {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${options.method || 'GET'} ${path} -> ${res.status}: ${body}`);
  }
  return res.json();
};

async function main() {
  console.log('পুরনো content-type ও নতুন page entry গুলো থেকে ডেটা পড়া হচ্ছে...');

  const [aboutContentRes, charRes, infraRes, mosqueRes, kulliyaRes, darulHadithRes] = await Promise.all([
    api('/about-content?populate=image').catch(() => null),
    api('/characteristic?populate[items][populate]=listItem').catch(() => null),
    api('/infrastructure-model?populate=sliderImages').catch(() => null),
    api('/mosque-complex-page').catch(() => null),
    api('/kulliya-page').catch(() => null),
    api('/darul-hadith-page').catch(() => null),
  ]);

  if (!mosqueRes?.data?.id || !kulliyaRes?.data?.id || !darulHadithRes?.data?.id) {
    console.error(
      'mosque-complex-page / kulliya-page / darul-hadith-page এখনো তৈরি হয়নি।'
    );
    console.error('আগে migrate-mosque-complex-page.js, migrate-kulliya-page.js,');
    console.error('migrate-darul-hadith-page.js চালিয়ে নিন, তারপর এই script আবার চালান।');
    process.exit(1);
  }

  const aboutAttrs = aboutContentRes?.data?.attributes;
  const aboutImage = aboutAttrs?.image?.data?.id || null;
  const aboutContentBlocks = aboutAttrs?.content || [];

  const charAttrs = charRes?.data?.attributes;
  const characteristics =
    charAttrs?.items?.map((item) => ({
      title: item.title || '',
      listItem: item.listItem?.map((li) => ({ listItem: li.listItem || '' })) || [],
    })) || [];

  const infraAttrs = infraRes?.data?.attributes;
  const infrastructureModel = infraAttrs
    ? {
        title: infraAttrs.title || '',
        sliderImages: infraAttrs.sliderImages?.data?.map((img) => img.id) || [],
      }
    : null;

  const payload = {
    data: {
      aboutImage,
      aboutContentBlocks,
      projectsSectionTitle: 'আমাদের প্রকল্পসমূহ',
      mosqueComplexPage: mosqueRes.data.id,
      kulliyaPage: kulliyaRes.data.id,
      darulHadithPage: darulHadithRes.data.id,
      characteristics,
      infrastructureModel,
    },
  };

  console.log('নতুন about-page entry লেখা হচ্ছে...');
  const result = await api('/about-page', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  console.log('সম্পন্ন। নতুন about-page entry id:', result?.data?.id);
  console.log('Strapi admin > About Page-এ ঢুকে ডেটা ও relation ৩টা (mosque/kulliya/darul-hadith) যাচাই করে Publish করুন।');
}

main().catch((err) => {
  console.error('মাইগ্রেশন ব্যর্থ হয়েছে:', err.message);
  process.exit(1);
});
