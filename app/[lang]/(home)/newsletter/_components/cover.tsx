import type { NewsletterPost } from '@/lib/newsletter-types';
import { coverURL } from '@/lib/newsletter';

type CoverProps = { post: Pick<NewsletterPost, 'cover' | 'coverDark' | 'coverAlt'>; sizes: string; priority?: boolean; lazy?: boolean };

function srcSet(cover: string) {
  return `${coverURL(cover.replace('.webp', '-640.webp'))} 640w, ${coverURL(cover)} 1600w`;
}

// Renders the light cover and, when the article has one, the dark-theme cover; CSS shows the one matching the theme.
export function NewsletterCover({ post, sizes, priority = false, lazy = false }: CoverProps) {
  const shared = { sizes, width: 1600, height: 900, loading: lazy ? 'lazy' as const : 'eager' as const, fetchPriority: priority ? 'high' as const : 'auto' as const, decoding: 'async' as const };
  return <>
    {/* Pre-encoded variants are served by the same-origin, allowlisted media route. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img {...shared} className={post.coverDark ? 'nl-cover-light' : undefined} src={coverURL(post.cover)} srcSet={srcSet(post.cover)} alt={post.coverAlt} />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {post.coverDark && <img {...shared} className="nl-cover-dark" src={coverURL(post.coverDark)} srcSet={srcSet(post.coverDark)} alt={post.coverAlt} />}
  </>;
}
