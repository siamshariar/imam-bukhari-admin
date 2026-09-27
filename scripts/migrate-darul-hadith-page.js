/**
 * পুরনো `darul-hadith-arabic-madrasa-detail`, `darul-hadith-summary`,
 * `darul-hadith-curriculum`, `characteristics-darul-hadith`, এবং
 * `our-project`(id=3, homeCard-এর জন্য) থেকে ডেটা পড়ে নতুন `darul-hadith-page`
 * singleType-এ একবার লিখে দেয়।
 *
 * চালানোর নিয়ম:
 *   STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-darul-hadith-page.js
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('STRAPI_URL এবং STRAPI_TOKEN env var হিসেবে দিতে হবে। উদাহরণ:');
  console.error('STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-darul-hadith-page.js');
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
  console.log('পুরনো content-type গুলো থেকে ডেটা পড়া হচ্ছে...');

  const [detailRes, summaryRes, curriculumRes, charRes, ourProjectsRes] = await Promise.all([
    api('/darul-hadith-arabic-madrasa-detail').catch(() => null),
    api('/darul-hadith-summary?populate[items][populate]=items&populate=sliderImages').catch(() => null),
    api('/darul-hadith-curriculum?populate[darulHadithCurriculum][populate]=items').catch(() => null),
    api('/characteristics-darul-hadith?populate=items').catch(() => null),
    api('/our-projects?populate=sliderImages').catch(() => null),
  ]);

  const detailAttrs = detailRes?.data?.attributes;
  const detail = detailAttrs
    ? { title: detailAttrs.title || '', description: detailAttrs.description || '' }
    : null;

  const summaryAttrs = summaryRes?.data?.attributes;
  const summary = summaryAttrs
    ? {
        title: summaryAttrs.title || '',
        items: summaryAttrs.items
          ? {
              items:
                summaryAttrs.items.items?.map((i) => ({ title: i.title || '' })) || [],
            }
          : null,
        sliderImages: summaryAttrs.sliderImages?.data?.map((img) => img.id) || [],
      }
    : null;

  const curriculumAttrs = curriculumRes?.data?.attributes?.darulHadithCurriculum;
  const curriculum = curriculumAttrs
    ? {
        darulHadithCurriculum: {
          title: curriculumAttrs.title || '',
          items: curriculumAttrs.items?.map((i) => ({ item: i.item || '' })) || [],
        },
      }
    : null;

  const charAttrs = charRes?.data?.attributes;
  const characteristics =
    charAttrs?.items?.map((item) => ({ title: item.title || '' })) || [];

  const project3 = (ourProjectsRes?.data || []).find((p) => p.id === 3);
  const homeCard = project3
    ? {
        title: project3.attributes.title || '',
        subtitle: project3.attributes.subtitle || '',
        message: project3.attributes.message || '',
        images: project3.attributes.sliderImages?.data?.map((img) => img.id) || [],
      }
    : null;

  const payload = {
    data: {
      homeCard,
      detail,
      summary,
      curriculum,
      characteristics,
    },
  };

  console.log('নতুন darul-hadith-page entry লেখা হচ্ছে...');
  const result = await api('/darul-hadith-page', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  console.log('সম্পন্ন। নতুন darul-hadith-page entry id:', result?.data?.id);
  console.log('Strapi admin > Darul Hadith Page-এ ঢুকে ডেটা যাচাই করে Publish করুন।');
}

main().catch((err) => {
  console.error('মাইগ্রেশন ব্যর্থ হয়েছে:', err.message);
  process.exit(1);
});
