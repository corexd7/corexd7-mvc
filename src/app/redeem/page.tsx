import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import RewardForm from "@/components/forms/RewardForm";

export const metadata: Metadata = {
  title: "Redeem Your Reward",
  description: "Redeem your Core Labs product reward",
};

export default function RedeemPage() {
  return (
    <section className="flex min-h-[calc(100vh-72px-200px)] items-center py-16 sm:py-20 lg:py-24">
      <Container className="max-w-xl">
        <RewardForm />
      </Container>
    </section>
  );
}
