const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const SchemaMarkup = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "PlayWords",
        url: BASE_URL,
        publisher: {
            "@type": "Organization",
            name: "PlayWords",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/images/logo.png`,
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
