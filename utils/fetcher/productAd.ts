import contentful from '@/lib/contentful';

const fetcher = async (key: string) => {
  let ad = {};
  await contentful.getEntry(key.split('ads/').join('')).then(res => ad = res).catch(error => error.message);

  return ad?.fields ? ad.fields : {};
}

export default fetcher;