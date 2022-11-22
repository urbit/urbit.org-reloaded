export default function Meta(post, disableImage, large = false) {
  const author = post?.extra?.author || "urbit.org";
  const title = post?.title ? post.title : "";
  const description =
    post?.description || "Urbit is a new kind of computer that you can own completely in ways that matter: networking, identity, & data.";
  const image =
    post?.extra?.image ||
    post?.image ||
    "https://storage.googleapis.com/media.urbit.org/site/opengraph/urbit.png";
  return (
    <>
      <link rel="icon" type="image/png" href="/images/favicon.ico" />
      <meta
        name="twitter:card"
        content={large ? "summary_large_image" : "summary"}
        key="twitter-card"
      />
      <meta name="twitter:site" content="@urbit" key="twitter-site" />
      <meta name="twitter:creator" content="@urbit" key="twitter-creator" />
      <meta name="og:title" content={title} key="title" />
      <meta name="og:description" content={description} key="description" />
      <meta name="description" content={description} />
      <meta name="author" content={author} key="author" />
      {!disableImage && (
        <meta name="twitter:image" content={image} key="image" />
      )}
      <link
        rel="alternative"
        type="application/rss+xml"
        title="RSS"
        href="/rss.xml"
      />
    </>
  );
}
