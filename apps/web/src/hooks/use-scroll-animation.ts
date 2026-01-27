"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface UseScrollAnimationOptions {
  offset?: [string, string];
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { offset = ["start end", "end start"] } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  return { ref, scrollYProgress };
}

export function useParallax(value: MotionValue<number>, distance: number): MotionValue<number> {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export function useFadeIn(scrollYProgress: MotionValue<number>): MotionValue<number> {
  return useTransform(scrollYProgress, [0, 0.3], [0, 1]);
}

export function useSlideUp(
  scrollYProgress: MotionValue<number>,
  distance: number = 50
): MotionValue<number> {
  return useTransform(scrollYProgress, [0, 0.5], [distance, 0]);
}
