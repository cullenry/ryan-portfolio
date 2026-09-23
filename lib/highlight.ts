export type TextPart = {
  text: string;
  /** Index of the matched phrase, when this part is a highlight. */
  highlight?: number;
};

/** Splits `text` around the given phrases so they can be styled separately. */
export function splitHighlights(text: string, phrases: readonly string[]): TextPart[] {
  const matches = phrases
    .map((phrase, index) => ({ phrase, index, at: text.indexOf(phrase) }))
    .filter((match) => match.at !== -1)
    .sort((a, b) => a.at - b.at);

  const parts: TextPart[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.at < cursor) {
      continue;
    }

    parts.push({ text: text.slice(cursor, match.at) });
    parts.push({ text: match.phrase, highlight: match.index });
    cursor = match.at + match.phrase.length;
  }

  parts.push({ text: text.slice(cursor) });

  return parts.filter((part) => part.text);
}
