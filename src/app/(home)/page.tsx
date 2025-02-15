import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <span className="p-5 m-5 leading-[1.2] scale-[1.05]">
        <h1 className="mb-6 bg-gradient-to-r from-teal-800 to-neutral-200 bg-clip-text text-5xl font-bold text-transparent md:text-6xl leading-[1.2] scale-[1.05]">
          Drive Clone by{" "}
          <a
            href="https://github.com/FurkanKovan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:italic decoration-destructive-foreground hover:underline hover:bg-gradient-to-r hover:from-teal-300 hover:to-neutral-300 hover:bg-clip-text inline-block"
          >
            FurkanKovan
          </a>
        </h1>
      </span>
      <p className="mx-auto mb-8 max-w-md text-xl text-neutral-200 md:text-2xl">
        Not so secure, not so fast, but maybe a bit easy file storage for the
        modern web
      </p>
      <form
        action={async () => {
          "use server";

          const session = await auth();

          if (!session.userId) {
            return redirect("/sign-in");
          }

          return redirect("/drive");
        }}
      >
        <Button
          size="lg"
          type="submit"
          className="border border-neutral-700 bg-neutral-800 text-teal-500 transition-colors hover:bg-neutral-700"
        >
          Get Started
        </Button>
      </form>
      <footer className="mt-32 text-sm text-neutral-500">
        © {new Date().getFullYear()} FurkanKovan Drive. All rights reserved.
      </footer>
    </>
  );
}
