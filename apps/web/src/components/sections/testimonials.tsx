"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Working with Super One was an incredible experience. The attention to detail and creative problem-solving exceeded all our expectations.",
    author: "Sarah Chen",
    role: "CEO, TechStart",
    avatar: "SC",
  },
  {
    quote:
      "The most professional and talented individual I've had the pleasure of working with. Our project was delivered on time and beyond what we imagined.",
    author: "Michael Roberts",
    role: "Founder, Innovate Labs",
    avatar: "MR",
  },
  {
    quote:
      "Exceptional work from start to finish. The strategic insights and technical expertise helped us achieve remarkable results.",
    author: "Emily Watson",
    role: "Director, Creative Agency",
    avatar: "EW",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <Reveal>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              Testimonials
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              What Clients Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Don&apos;t just take my word for it. Here&apos;s what some of my clients have to say
              about our collaboration.
            </p>
          </div>
        </Reveal>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.author}>
              <motion.div
                className="group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-background p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Quote Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Quote className="h-5 w-5 text-primary" />
                </div>

                {/* Quote */}
                <p className="mb-8 text-lg leading-relaxed text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-transform group-hover:scale-150" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
