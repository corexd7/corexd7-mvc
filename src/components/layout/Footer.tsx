import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import { navigationItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-dark">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-dark">
              Authenticate
            </h3>
            <p className="text-sm leading-relaxed text-text-muted">
              Verify the authenticity of your Core Labs products using your unique product code.
            </p>
            <Link
              href="/authenticate"
              className="btn-outline mt-4 inline-flex"
            >
              Verify Product
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-text-light">
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
