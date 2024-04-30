import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This function is mainly only used by the shadcn components. It helps to merge tailwind classes into one nice react compatible string
 * @param  {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
