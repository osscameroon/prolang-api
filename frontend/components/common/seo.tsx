import { NextSeo, DefaultSeo } from 'next-seo';

type SeoProps = {
  path?: string;
  title: string;
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const GlobalSeo = () => {
  const description = 'The WEB API to browse programming languages.';
  const title = 'Prolang';

  return (
    <DefaultSeo
      title={title}
      description={description}
      canonical={baseUrl}
      additionalMetaTags={[
        { content: 'Eric Cabrel TIOGO', property: 'author' },
        {
          content:
            'programming,languages,api,rest,graphql,developer,api rest,graphql playground,api documentation,open-source,open source,web,language,community,programming history, language history',
          property: 'keywords',
        },
      ]}
      openGraph={{
        description,
        images: [
          {
            alt: 'Homepage image alt',
            height: 575,
            url: `${baseUrl}/assets/img/og.png`,
            width: 1245,
          },
        ],
        locale: 'en-US',
        site_name: 'Prolang',
        title,
        url: baseUrl,
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@osscameroon',
        site: '@osscameroon',
      }}
    />
  );
};

const PageSeo = ({ path, title }: SeoProps) => {
  const url = path ? `${baseUrl}${path}` : baseUrl;

  return <NextSeo title={title} canonical={url} />;
};

export { GlobalSeo, PageSeo };
