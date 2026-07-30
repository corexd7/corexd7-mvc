import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import AuthenticationForm from "@/components/forms/AuthenticationForm";

export const metadata: Metadata = {
  title: "Authenticate",
  description: "Verify the authenticity of your Core Labs product",
};

export default function AuthenticatePage() {
  return (
    <section className="flex min-h-[calc(100vh-72px-200px)] items-center py-16 sm:py-20 lg:py-24">
      <Container className="max-w-xl">
        <AuthenticationForm />
      </Container>
    </section>
  );
}
