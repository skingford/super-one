"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce solution with seamless checkout and inventory management.",
    image: "/images/project-1.jpg",
    color: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    href: "#",
  },
  {
    title: "Finance Dashboard",
    category: "UI/UX Design",
    description: "Intuitive financial dashboard for tracking investments and analytics.",
    image: "/images/project-2.jpg",
    color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    href: "#",
  },
  {
    title: "Health & Wellness App",
    category: "Mobile App",
    description: "A comprehensive wellness app for tracking fitness, nutrition, and mental health.",
    image: "/images/project-3.jpg",
    color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
    href: "#",
  },
  {
    title: "SaaS Platform",
    category: "Full Stack",
    description: "Scalable SaaS solution for enterprise collaboration and project management.",
    image: "/images/project-4.jpg",
    color: "bg-gradient-to-br from-orange-500/10 to-amber-500/10",
    href: "#",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
                Portfolio
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Selected Work
              </h2>
            </div>
            <p className="max-w-md text-lg text-muted-foreground">
              A curated selection of projects that showcase my approach to design and development.
            </p>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <motion.a
                href={project.href}
                className={`group block overflow-hidden rounded-3xl border border-border/50 ${project.color} transition-all duration-300 hover:border-primary/30 hover:shadow-xl`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground/30">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-primary/90 opacity-0 transition-opacity group-hover:opacity-100"
                    initial={false}
                  >
                    <span className="flex items-center gap-2 text-lg font-medium text-primary-foreground">
                      View Project
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="mb-2 text-sm font-medium text-primary">{project.category}</p>
                  <h3 className="mb-3 text-2xl font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Button */}
        <Reveal delay={0.4}>
          <div className="mt-12 text-center">
            <motion.button
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-8 text-sm font-medium transition-all hover:bg-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Projects
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
