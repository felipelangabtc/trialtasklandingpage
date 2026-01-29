import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  PODCAST_EPISODES,
  getEpisodeById,
  getAllEpisodeIds,
} from '@/lib/podcast';
import { ArrowLeft, Calendar, User, ExternalLink } from 'lucide-react';

interface EpisodePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllEpisodeIds().map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const episode = getEpisodeById(params.slug);

  if (!episode) {
    return {
      title: 'Episode Not Found',
    };
  }

  return {
    title: `${episode.title} - Microburbs Podcast`,
    description: episode.description,
    openGraph: {
      title: episode.title,
      description: episode.description,
      type: 'article',
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function EpisodePage({ params }: EpisodePageProps) {
  const episode = getEpisodeById(params.slug);

  if (!episode) {
    notFound();
  }

  // Find adjacent episodes for navigation
  const currentIndex = PODCAST_EPISODES.findIndex(
    (ep) => ep.id === params.slug
  );
  const prevEpisode =
    currentIndex > 0 ? PODCAST_EPISODES[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < PODCAST_EPISODES.length - 1
      ? PODCAST_EPISODES[currentIndex + 1]
      : null;

  return (
    <div className="flex flex-col">
      <article className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Back button */}
            <Button variant="ghost" className="mb-8" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All episodes
              </Link>
            </Button>

            {/* Category */}
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="outline">{episode.category}</Badge>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {episode.title}
            </h1>

            {/* Metadata */}
            <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(episode.date)}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Luke Metcalfe
              </span>
              {episode.guest && (
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Guest: {episode.guest}
                </span>
              )}
            </div>

            {/* Video / Audio embed */}
            {episode.youtubeId ? (
              <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                    title={episode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            ) : episode.externalUrl ? (
              <div className="mb-8 rounded-xl border bg-muted/30 p-8 text-center">
                <p className="mb-4 text-muted-foreground">
                  This episode is hosted on an external platform.
                </p>
                <Button asChild>
                  <a
                    href={episode.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Listen on external platform
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ) : null}

            {/* Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{episode.description}</p>
            </div>

            {/* Navigation between episodes */}
            <div className="mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2">
              {nextEpisode && (
                <Link
                  href={`/blog/${nextEpisode.id}`}
                  className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <p className="mb-1 text-xs text-muted-foreground">
                    Older episode
                  </p>
                  <p className="text-sm font-medium group-hover:text-primary">
                    {nextEpisode.title}
                  </p>
                </Link>
              )}
              {prevEpisode && (
                <Link
                  href={`/blog/${prevEpisode.id}`}
                  className="group rounded-lg border p-4 text-right transition-colors hover:bg-muted/50 sm:col-start-2"
                >
                  <p className="mb-1 text-xs text-muted-foreground">
                    Newer episode
                  </p>
                  <p className="text-sm font-medium group-hover:text-primary">
                    {prevEpisode.title}
                  </p>
                </Link>
              )}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl border bg-muted/30 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold">
                Ready to try Microburbs?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Start your 14-day free trial and access 2+ billion data points
                with 5,000+ heatmap indicators.
              </p>
              <Button size="lg" asChild>
                <Link href="/#lead-form">Start free trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
