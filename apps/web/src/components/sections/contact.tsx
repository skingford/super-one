"use client";

import { Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowUpRight, MapPin, Phone } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@superone.dev",
    href: "mailto:hello@superone.dev",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-secondary/30">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column - Info */}
          <div>
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
                Contact
              </p>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Let&apos;s Work
                <br />
                Together
              </h2>
              <p className="mb-10 max-w-md text-lg text-muted-foreground">
                Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we
                can bring your ideas to life.
              </p>
            </Reveal>

            {/* Contact Methods */}
            <Reveal delay={0.2}>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    className="group flex items-center gap-4 transition-colors hover:text-primary"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm transition-colors group-hover:bg-primary/10">
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{method.title}</div>
                      <div className="font-medium">{method.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column - Form */}
          <Reveal delay={0.3} direction="left">
            <div className="rounded-3xl border border-border/50 bg-background p-8 md:p-10">
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="h-12 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="h-12 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="h-12 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-border bg-secondary/50 p-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-20 text-center">
            <p className="mb-4 text-muted-foreground">Prefer to schedule a call?</p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-lg font-medium text-primary transition-colors hover:text-primary/80"
              whileHover={{ x: 5 }}
            >
              Book a consultation
              <ArrowUpRight className="h-5 w-5" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
