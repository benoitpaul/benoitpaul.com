import { Category } from "@helpers/category.helper";
import Link from "next/link";

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <section>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/blog/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
