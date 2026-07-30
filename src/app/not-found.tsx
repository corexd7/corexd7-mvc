import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl text-text-muted">Page not found</p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="primary" className="w-auto px-10">
            Go Home
          </Button>
        </Link>
      </Container>
    </section>
  );
}
