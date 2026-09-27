/**
 * kulliya-page-এর recommendedDepartment.kulliaDepartment (২৪টা row) এবং
 * .progressUniversity (১২টা row) — এই ৩৬টা row admin-এ তৈরি হয়ে আছে কিন্তু
 * প্রতিটার `item` টেক্সট ফিল্ড খালি (null)। এই script data/block.js-এর পুরনো
 * hardcoded তালিকা দিয়ে সেগুলো ভরে দেয়, প্রতিটা row-এর id ঠিক রেখে (নতুন row
 * তৈরি করে না, existing row আপডেট করে)।
 *
 * চালানোর নিয়ম:
 *   STRAPI_URL="https://api.exilecloud.xyz" STRAPI_TOKEN="xxxx" node scripts/fill-kulliya-recommended-department.js
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('STRAPI_URL এবং STRAPI_TOKEN env var হিসেবে দিতে হবে। উদাহরণ:');
  console.error('STRAPI_URL="https://api.exilecloud.xyz" STRAPI_TOKEN="xxxx" node scripts/fill-kulliya-recommended-department.js');
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

// data/block.js-এর titleListBlockData1.lists (২৪টা) ও titleListBlockData2.lists (১২টা)
const departmentNames = [
  "আল-কুরআন অ্যান্ড ইসলামিক স্টাডিজ",
  "আল-হাদীস অ্যান্ড ইসলামিক স্টাডিজ",
  "আরবী ভাষা ও সাহিত্য",
  "ফিকহ ও উসূলুল ফিকহ",
  "ইসলাম অ্যান্ড ওরিয়েন্টালিজম",
  "শারী’আহ অ্যান্ড ল",
  "শারী’আহ অ্যান্ড  ইকোনমিক্স",
  "শারী’আহ অ্যান্ড ম্যানেজমেন্ট",
  "শারী’আহ অ্যান্ড ইসলামিক ফিন্যান্স",
  "দা’ওয়াহ অ্যান্ড আইটি",
  "দা’ওয়াহ অ্যান্ড সিএসই",
  "একাডেমী অব ইসলামিক স্টাডিজ",
  "দা’ওয়াহ অ্যান্ড হিউম্যান ডেভেলপমেন্ট",
  "দা’ওয়াহ অ্যান্ড ইসলামিক কালচার",
  "আকীদা অ্যান্ড ইসলামিক",
  "সিরাহ অ্যান্ড ইসলামিক হিস্ট্রি",
  "এডুকেশন",
  "ডিপার্টমেন্ট অব ট্রান্সলেশন অ্যান্ড মডার্ন ল্যাংগুয়েজ",
  "বিশ্ব ধর্মসমুহ (World Religions)",
  "আল-ফিরাক ওয়াল মাযাহিবুল ইসলামিয়া",
  "হালাল ইন্ডাস্ট্রি ম্যানেজমেন্ট",
  "ট্যুরিজ্‌ম",
  "ইসলামিক সাইকোলজি",
  "সোসলজি অ্যান্ড এনথ্রোপোলজি ইন ইসলাম",
];

const universityNames = [
  "১) মদীনা ইসলামী বিশ্ববিদ্যালয়, মদীনা।",
  "২) উম্মুল কুরা বিশ্ববিদ্যালয়, মক্কা।",
  "৩) কিং সউদ বিশ্ববিদ্যালয়, রিয়াদ।",
  "৪) ইমাম মুহাম্মদ বিন সউদ ইসলামী বিশ্ববিদ্যালয়, রিয়াদ।",
  "৫) কিং আবদুল আযীয বিশ্ববিদ্যালয়, জেদ্দা।",
  "৬) আল-আযহার বিশ্ববিদ্যালয়, মিশর।",
  "৭) ‘আইন শামস বিশ্ববিদ্যালয়, মিশর।",
  "৮) ইউনিভার্সিটি অব মালয়, মালয়েশিয়া।",
  "৯) ইন্টারন্যাশনাল ইসলামিক ইউনিভার্সিটি, মালয়েশিয়া।",
  "১০) ইউনিভার্সিটি অব আলজিয়ার্স, আলজেরিয়া।",
  "১১) মুহাম্মাদ আল-খামিস ইউনিভার্সিটি, মরক্কো।",
  "১২) ইউনিভার্সিটি অব কুয়েত, কুয়েত",
];

async function main() {
  console.log('বর্তমান kulliya-page recommendedDepartment পড়া হচ্ছে...');
  const current = await api(
    '/kulliya-page?populate[recommendedDepartment][populate][kulliaDepartment][populate]=items&populate[recommendedDepartment][populate][progressUniversity][populate]=items'
  );

  const rd = current?.data?.attributes?.recommendedDepartment;
  if (!rd?.kulliaDepartment?.items || !rd?.progressUniversity?.items) {
    console.error('recommendedDepartment.kulliaDepartment বা progressUniversity পাওয়া যায়নি। থামছি।');
    process.exit(1);
  }

  const deptItems = rd.kulliaDepartment.items;
  const uniItems = rd.progressUniversity.items;

  if (deptItems.length !== departmentNames.length) {
    console.error(`সতর্কতা: admin-এ ${deptItems.length}টা department row আছে, কিন্তু নামের তালিকায় ${departmentNames.length}টা। ক্রম মিলবে না, থামছি।`);
    process.exit(1);
  }
  if (uniItems.length !== universityNames.length) {
    console.error(`সতর্কতা: admin-এ ${uniItems.length}টা university row আছে, কিন্তু নামের তালিকায় ${universityNames.length}টা। ক্রম মিলবে না, থামছি।`);
    process.exit(1);
  }

  // প্রতিটা row-এর id বজায় রেখে, শুধু item টেক্সট বসিয়ে দিচ্ছি
  const updatedDeptItems = deptItems.map((row, index) => ({
    id: row.id,
    item: departmentNames[index],
  }));
  const updatedUniItems = uniItems.map((row, index) => ({
    id: row.id,
    item: universityNames[index],
  }));

  const payload = {
    data: {
      recommendedDepartment: {
        kulliaDepartment: {
          title: rd.kulliaDepartment.title,
          items: updatedDeptItems,
        },
        progressUniversity: {
          title: rd.progressUniversity.title,
          items: updatedUniItems,
        },
      },
    },
  };

  console.log('৩৬টা row-এ নাম বসানো হচ্ছে...');
  const result = await api('/kulliya-page', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  console.log('সম্পন্ন। kulliya-page entry id:', result?.data?.id);
  console.log('Strapi admin > Kulliya Page-এ ঢুকে দুটো তালিকা যাচাই করে Publish করুন।');
}

main().catch((err) => {
  console.error('ব্যর্থ হয়েছে:', err.message);
  process.exit(1);
});
