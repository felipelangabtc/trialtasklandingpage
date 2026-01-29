import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Play, User, ExternalLink } from 'lucide-react';
import { PODCAST_EPISODES } from '@/lib/podcast';

export const metadata: Metadata = {
  title: 'Microburbs Podcast - Property Data Insights with Luke Metcalfe',
  description:
    'Watch the Microburbs Podcast — conversations about property data, AI in real estate, investment strategies, and market analysis with Luke Metcalfe.',
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getYouTubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
}

export default function PodcastPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Podcast
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Microburbs Podcast
            </h1>

            <p className="text-lg text-muted-foreground">
              Conversations about property data, AI in real estate, investment
              strategies, and market analysis with Luke Metcalfe.
            </p>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PODCAST_EPISODES.map((episode) => (
              <Link key={episode.id} href={`/blog/${episode.id}`}>
                <Card className="h-full transition-all hover:shadow-lg">
                  {/* Thumbnail */}
                  {episode.youtubeId && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getYouTubeThumbnail(episode.youtubeId)}
                        alt={episode.title}
                        className="aspect-video w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg">
                          <Play className="h-6 w-6 pl-0.5" />
                        </div>
                      </div>
                    </div>
                  )}

                  <CardHeader>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge variant="outline">{episode.category}</Badge>
                    </div>
                    <CardTitle className="text-lg leading-snug hover:text-primary">
                      {episode.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {episode.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(episode.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Luke Metcalfe
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      {episode.youtubeId ? 'Watch episode' : 'Listen now'}
                      {episode.youtubeId ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
