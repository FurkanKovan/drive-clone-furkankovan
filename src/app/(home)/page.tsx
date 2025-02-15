import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <span className="m-5 p-5">
        <h1 className="mb-6 bg-gradient-to-r from-teal-800 to-neutral-200 bg-clip-text text-5xl font-bold leading-[1.2] text-transparent md:text-6xl">
          Drive Clone by{" "}
          <a
            href="https://github.com/FurkanKovan"
            target="_blank"
            className="inline-block decoration-destructive-foreground hover:bg-gradient-to-r hover:from-teal-300 hover:to-neutral-300 hover:bg-clip-text hover:italic hover:underline"
          >
            FurkanKovan
          </a>
        </h1>
      </span>
      <p className="mx-auto mb-8 max-w-md text-xl text-neutral-200 md:text-xl">
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
      <footer className="mx-auto mt-48 max-w-screen-md text-sm text-neutral-500">
        <p className="mx-auto mb-4 max-w-screen-md px-4 text-center text-xs text-red-200">
          Disclaimer! This website is only a demo and not intended for any
          personal usage. Please only upload files for testing purposes and make
          sure to delete them afterwards. Do not upload any sensitive files. All
          uploaded files are publicly accessible via{" "}
          <a
            href="https://uploadthing.com/"
            className="font-bold text-red-500 hover:text-red-100"
          >
            UploadThing
          </a>{" "}
          file url. Note that if server storage limit is reached from our side,
          no upload will be made.
        </p>
        © {new Date().getFullYear()} FurkanKovan Drive. All rights reserved.
      </footer>
    </>
  );
}
