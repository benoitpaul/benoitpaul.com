export interface Category {
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  { name: "AWS", slug: "aws" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Next.js", slug: "nextjs" },
  { name: "React Native", slug: "react-native" },
  { name: "Stripe", slug: "stripe" },
];

export const getCategoryBySlug = (categorySlug: string) => {
  return CATEGORIES.find((cat) => cat.slug === categorySlug)!;
};

export const getCategoryName = (categorySlug: string) => {
  return getCategoryBySlug(categorySlug).name;
};
