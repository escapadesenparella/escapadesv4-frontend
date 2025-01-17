import Head from "next/head";

const ArticleRichSnippet = ({
  headline,
  summary,
  image,
  author,
  publicationDate,
  modificationDate,
}) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${headline}",
  "description": "${summary}",
  "image": "${image}",  
  "author": {
    "@type": "Person",
    "name": "${author}"
  },  
  "publisher": {
    "@type": "Organization",
    "name": "Escapadesenparella.cat",
    "logo": {
      "@type": "ImageObject",
      "url": "https://res.cloudinary.com/juligoodie/image/upload/v1619634337/getaways-guru/static-files/logo-escapadesenparella-v4_hf0pr0.svg"
    }
  },
  "datePublished": "${publicationDate}",
  "dateModified": "${modificationDate}"
}`,
        }}
      />
    </Head>
  );
};

export default ArticleRichSnippet;
