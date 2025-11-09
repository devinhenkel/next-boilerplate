import Link from "next/link";
import {
  ArrowRight,
  Github,
  Layers3,
  Palette,
  Plug,
  Sparkles,
} from "lucide-react";

import { ChatDemo } from "@/components/chat-demo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const featureItems = [
  {
    title: "Production ready",
    description:
      "Next.js 16 App Router with React 19, TypeScript, ESLint, and Tailwind CSS v4 out of the box.",
    icon: Sparkles,
  },
  {
    title: "Beautiful primitives",
    description:
      "Composable shadcn/ui components, configured with the zinc theme for instant polish.",
    icon: Palette,
  },
  {
    title: "Headless friendly",
    description:
      "Opt in to registry components as you need them, or extend the base tokens with your design system.",
    icon: Layers3,
  },
  {
    title: "Ready to integrate",
    description:
      "Lightweight setup that pairs easily with APIs, CMSs, and data fetching strategies.",
    icon: Plug,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 font-sans sm:gap-20 md:px-10 lg:px-12">
        <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="flex flex-col gap-5">
            <Badge
              variant="outline"
              className="w-fit gap-2 text-xs uppercase tracking-wide"
            >
              <Sparkles className="size-3.5" />
              Next.js Boilerplate
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Launch your next idea faster.
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Opinionated defaults, modern tooling, and accessible UI primitives
              so you can focus on shipping features, not wiring up plumbing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <Button asChild size="lg">
                <Link href="https://ui.shadcn.com/docs/installation/next">
                  Browse the component registry
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="https://github.com/shadcn/ui">
                  <Github className="size-4" />
                  View shadcn/ui on GitHub
                </Link>
              </Button>
            </div>
          </div>
          <Badge className="gap-2 self-center sm:self-start">
            <span className="size-2 rounded-full bg-emerald-500" />
            Tailwind v4 ready
          </Badge>
        </header>

        <main className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <section className="flex flex-col gap-10">
            <Card className="border-dashed bg-muted/40">
              <CardHeader>
                <CardTitle>Rapid page scaffolding</CardTitle>
                <CardDescription>
                  Mix and match shadcn/ui primitives to build rich forms,
                  dashboards, and marketing pages in minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" placeholder="Ada Lovelace" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project">Project focus</Label>
                  <Input id="project" placeholder="Composable UI experiments" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Drop in shadcn components and tailor them with Tailwind tokens."
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                <Button>Save draft</Button>
                <Button variant="outline">Preview</Button>
                <Badge variant="outline" className="ml-auto">
                  Accessible by default
                </Badge>
              </CardFooter>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2">
              {featureItems.slice(0, 2).map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title}>
                    <CardHeader className="gap-3">
                      <Badge variant="outline" className="size-10 rounded-full">
                        <Icon className="size-5" />
                      </Badge>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <ChatDemo />

            <Card>
              <CardHeader>
                <CardTitle>What&rsquo;s included</CardTitle>
                <CardDescription>
                  Everything you need to ship quickly with confidence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <ul className="grid gap-3">
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Next.js 16
                    </Badge>
                    App Router, Route Handlers, metadata helpers, and TypeScript
                    support baked in.
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Tailwind v4
                    </Badge>
                    Modern utility classes, CSS variables, and shadcn tokens
                    wired up for rapid styling.
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      ESLint
                    </Badge>
                    Linting configured for React 19, TypeScript, and Next.js best
                    practices.
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      UI kit
                    </Badge>
                    Buttons, form controls, layout primitives, and badges from
                    the shadcn registry.
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="https://nextjs.org/docs">
                    Read Next.js docs
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://tailwindcss.com/docs">
                    Tailwind CSS docs
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2">
              {featureItems.slice(2).map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="bg-muted/40">
                    <CardHeader className="gap-3">
                      <Badge variant="outline" className="size-10 rounded-full">
                        <Icon className="size-5" />
                      </Badge>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
