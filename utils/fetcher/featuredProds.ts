import contentful from '@/lib/contentful';

const fetcher = async (key: string) => {
  let items = [];
  await contentful.getEntries({
    content_type: 'featuredProducts'
  }).then(res => { items = res.items }).catch(error => error.message);

  return items;
}

export default fetcher;