"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { Globe, Smartphone, Layers, Sparkles, BarChart3, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "High-performance websites and web applications built with modern frameworks like Next.js, React, and Vue.",
    color: "from-blue-500/20 to-cyan-500/20",
    size: "large",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    color: "from-purple-500/20 to-pink-500/20",
    size: "medium",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description: "User-centered design that balances aesthetics with functionality.",
    color: "from-orange-500/20 to-amber-500/20",
    size: "medium",
  },
  {
    icon: Sparkles,
    title: "Brand Identity",
    description: "Comprehensive branding that tells your story and connects with your audience.",
    color: "from-green-500/20 to-emerald-500/20",
    size: "small",
  },
  {
    icon: BarChart3,
    title: "Analytics & SEO",
    description: "Data-driven optimization to maximize your digital presence and reach.",
    color: "from-red-500/20 to-rose-500/20",
    size: "small",
  },
  {
    icon: MessageSquare,
    title: "Consulting",
    description: "Strategic guidance to help you navigate the digital landscape.",
    color: "from-indigo-500/20 to-violet-500/20",
    size: "small",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <Reveal>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              Services
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              What I Do
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive digital solutions tailored to your unique needs. From concept to launch,
              I handle every aspect of your project.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <StaggerContainer className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-3 lg:auto-rows-[220px]">
          {services.map((service, index) => (
            <StaggerItem
              key={service.title}
              className={`${
                index === 0
                  ? "md:col-span-2 md:row-span-2"
                  : index === 1 || index === 2
                    ? "md:row-span-1"
                    : ""
              }`}
            >
              <motion.div
                className={`group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br ${service.color} p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl md:p-8`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <service.icon className="h-6 w-6 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">{service.title}</h3>
                <p className="text-sm text-muted-foreground md:text-base">{service.description}</p>

                {/* Decorative element */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-background/20 blur-2xl transition-transform group-hover:scale-150" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
