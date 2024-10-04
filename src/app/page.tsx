import Link from "next/link";



export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-pretty">
        <Link href="/flowbuilder" >
        Home page
        </Link>
        </h1>
    </main>
  );
}
