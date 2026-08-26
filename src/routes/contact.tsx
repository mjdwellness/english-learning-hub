import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — English Books" },
      {
        name: "description",
        content: "Questions about a book, a bundle, or the Yorlingo app? Send us a message.",
      },
      { property: "og:title", content: "Contact — English Books" },
      { property: "og:description", content: "Get in touch with the English Books team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="container-page section-y">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">Contact</h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            We usually reply within one business day.
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-sky text-navy">
                <Mail className="size-5" />
              </span>
              <a href="mailto:hello@englishbooks.com" className="font-semibold text-navy">
                hello@englishbooks.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-sky text-navy">
                <MessageCircle className="size-5" />
              </span>
              <span className="text-muted-foreground">Support for orders, downloads and Yorlingo</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            toast.success("Message sent — we'll be in touch soon");
          }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required className="mt-1.5 h-11" />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" required className="mt-1.5 h-11" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required className="mt-1.5 h-11" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={6} className="mt-1.5" />
            </div>
          </div>
          <Button type="submit" variant="navy" size="xl" className="mt-6 w-full sm:w-auto">
            Send message
          </Button>
        </form>
      </div>
    </section>
  );
}
