export interface Category {
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  { name: "AWS", slug: "aws" },
  { name: "JavaScript", slug: "javascript" },
];

export const getCategoryBySlug = (categorySlug: string) => {
  return CATEGORIES.find((cat) => cat.slug === categorySlug)!;
};

export const getCategoryName = (categorySlug: string) => {
  return getCategoryBySlug(categorySlug).name;
};
