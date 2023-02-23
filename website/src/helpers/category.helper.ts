export interface Category {
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  { name: "AWS", slug: "aws" },
  { name: "JavaScript", slug: "javascript" },
  { name: "React", slug: "react" },
  { name: "React Native", slug: "react-native" },
];

export const getCategoryBySlug = (categorySlug: string) => {
  return CATEGORIES.find((cat) => cat.slug === categorySlug)!;
};

export const getCategoryName = (categorySlug: string) => {
  return getCategoryBySlug(categorySlug).name;
};
