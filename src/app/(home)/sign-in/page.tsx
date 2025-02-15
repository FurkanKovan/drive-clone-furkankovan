import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <span className="m-4 p-4 border rounded-md border-neutral-700 bg-neutral-800 text-teal-500 transition-colors hover:bg-neutral-700 font-semibold">
        <SignInButton forceRedirectUrl={"/drive"} />
      </span>
      <footer className="mt-64 text-sm text-neutral-500">
        © {new Date().getFullYear()} FurkanKovan Drive. All rights reserved.
      </footer>
    </>
  );
}
