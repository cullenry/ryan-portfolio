/** Structured data, escaped as the Next.js JSON-LD guide recommends. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
      type="application/ld+json"
    />
  );
}
