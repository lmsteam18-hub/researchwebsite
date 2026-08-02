import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { OrderForm } from "@/components/order/order-form";

export const metadata: Metadata = {
  title: "Place an order",
  description:
    "Upload your project, choose a service and academic level, and get an instant, transparent quote. Secure payment with Paystack, Flutterwave, Stripe and more.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const defaults = {
    service: params.service,
    academicLevel: params.level,
    deadline: params.deadline,
    pages: params.pages ? Number(params.pages) : undefined,
  };

  return (
    <>
      <PageHeader
        eyebrow="Start your project"
        title={<>Upload your project & <span className="text-gradient">get a quote</span></>}
        description="Complete the form below. Your live estimate updates as you go — you only pay when you're ready."
      />
      <Container className="pb-24">
        <OrderForm defaults={defaults} />
      </Container>
    </>
  );
}
