"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { Code2, Palette, Rocket, Users } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "100+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "5", label: "Industry Awards" },
];

const skills = [
  {
    icon: Code2,
    title: "Development",
    description: "Building scalable applications with modern technologies and best practices.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Crafting intuitive interfaces that delight users and drive engagement.",
  },
  {
    icon: Rocket,
    title: "Strategy",
    description: "Developing digital strategies that align with your business goals.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with stakeholders to ensure project success.",
  },
];

export function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              About Me
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Passionate about creating impactful digital experiences
            </h2>
            <p className="text-lg text-muted-foreground">
              With over a decade of experience in digital product design and development, I
              specialize in transforming complex ideas into elegant, user-centered solutions. My
              approach combines strategic thinking with meticulous attention to detail.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <StaggerContainer className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Skills Grid */}
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <StaggerItem key={skill.title}>
              <div className="group rounded-2xl border border-border/50 bg-background/50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-background hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <skill.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{skill.title}</h3>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
