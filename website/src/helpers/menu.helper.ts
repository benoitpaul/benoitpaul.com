interface MenuItem {
  label: string;
  href: string;
}

export const MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/cv/" },
  { label: "Blog", href: "/blog/" },
];
