/**
 * পুরনো `kulliyatul-quranil-kareem-detail`, `kullia-project-summary`,
 * `kullia-main-activitie`, `kullia-recommended-department`, `characteristics-kullia`,
 * এবং `our-project`(id=2, homeCard-এর জন্য) থেকে ডেটা পড়ে নতুন `kulliya-page`
 * singleType-এ একবার লিখে দেয়। `members`(academic committee) content-type সরাসরি
 * relation হিসেবে যুক্ত হয় — এই script member entry-গুলো নিজে থেকে সিলেক্ট করে না,
 * কারণ কোন member-রা "কুল্লিয়াতুল কুরআনের একাডেমিক কমিটি"-তে পড়ে তা নির্ধারণ করতে
 * admin থেকে ম্যানুয়ালি select করাই নিরাপদ (ভুল member auto-attach হওয়ার ঝুঁকি এড়াতে)।
 *
 * চালানোর নিয়ম:
 *   STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-kulliya-page.js
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('STRAPI_URL এবং STRAPI_TOKEN env var হিসেবে দিতে হবে। উদাহরণ:');
  console.error('STRAPI_URL="https://your-server.com" STRAPI_TOKEN="xxxx" node scripts/migrate-kulliya-page.js');
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

  const [detailRes, summaryRes, activitiesRes, recDeptRes, charRes, ourProjectsRes] = await Promise.all([
    api('/kulliyatul-quranil-kareem-detail').catch(() => null),
    api('/kullia-project-summary?populate[content][populate]=items&populate=sliderImages').catch(() => null),
    api('/kullia-main-activitie?populate[Features][populate]=image').catch(() => null),
    api('/kullia-recommended-department?populate[kulliaDepartment][populate]=items&populate[progressUniversity][populate]=items').catch(() => null),
    api('/characteristics-kullia?populate[items][populate]=listItem').catch(() => null),
    api('/our-projects?populate=sliderImages').catch(() => null),
  ]);

  const detailAttrs = detailRes?.data?.attributes;
  const detail = detailAttrs
    ? { title: detailAttrs.title || '', description: detailAttrs.description || '' }
    : null;

  const summaryAttrs = summaryRes?.data?.attributes;
  const projectSummary = summaryAttrs
    ? {
        title: summaryAttrs.title || '',
        content: summaryAttrs.content
          ? { items: summaryAttrs.content.items?.map((i) => ({ title: i.title || '' })) || [] }
          : null,
        sliderImages: summaryAttrs.sliderImages?.data?.map((img) => img.id) || [],
      }
    : null;

  const activitiesAttrs = activitiesRes?.data?.attributes;
  const mainActivities = activitiesAttrs
    ? {
        arbTitle: activitiesAttrs.arbTitle || '',
        bnText: activitiesAttrs.bnText || '',
        ref: activitiesAttrs.ref || '',
        title: activitiesAttrs.title || '',
        Features:
          activitiesAttrs.Features?.map((f) => ({
            title: f.title || '',
            image: f.image?.data?.id || null,
          })) || [],
      }
    : null;

  const recDeptAttrs = recDeptRes?.data?.attributes;
  const recommendedDepartment = recDeptAttrs
    ? {
        kulliaDepartment: recDeptAttrs.kulliaDepartment
          ? {
              title: recDeptAttrs.kulliaDepartment.title || '',
              items: recDeptAttrs.kulliaDepartment.items?.map((i) => ({ title: i.title || '' })) || [],
            }
          : null,
        progressUniversity: recDeptAttrs.progressUniversity
          ? {
              title: recDeptAttrs.progressUniversity.title || '',
              items: recDeptAttrs.progressUniversity.items?.map((i) => ({ title: i.title || '' })) || [],
            }
          : null,
      }
    : null;

  const charAttrs = charRes?.data?.attributes;
  const characteristics =
    charAttrs?.items?.map((item) => ({
      title: item.title || '',
      listItem: item.listItem?.map((li) => ({ listItem: li.listItem || '' })) || [],
    })) || [];

  const project2 = (ourProjectsRes?.data || []).find((p) => p.id === 2);
  const homeCard = project2
    ? {
        title: project2.attributes.title || '',
        subtitle: project2.attributes.subtitle || '',
        message: project2.attributes.message || '',
        images: project2.attributes.sliderImages?.data?.map((img) => img.id) || [],
      }
    : null;

  const payload = {
    data: {
      homeCard,
      detail,
      projectSummary,
      mainActivities,
      recommendedDepartment,
      characteristics,
    },
  };

  console.log('নতুন kulliya-page entry লেখা হচ্ছে...');
  const result = await api('/kulliya-page', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  console.log('সম্পন্ন। নতুন kulliya-page entry id:', result?.data?.id);
  console.log('⚠️  academicCommitteeMembers এখনো খালি — Strapi admin > Kulliya Page-এ ঢুকে');
  console.log('   "একাডেমিক কমিটি" section-এ সঠিক member(রা) manually select করে দিন, তারপর Publish করুন।');
}

main().catch((err) => {
  console.error('মাইগ্রেশন ব্যর্থ হয়েছে:', err.message);
  process.exit(1);
});
