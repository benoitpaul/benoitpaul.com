interface MenuItem {
  label: string;
  href: string;
}

export const MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog/" },
  { label: "Resume", href: "/cv/" },
];
