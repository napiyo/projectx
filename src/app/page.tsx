import Link from "next/link";




export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <h1 className="text-pretty">
        <Link href="/flowbuilder" >Flow builder
        </Link>
        </h1>
    </main>
  );
}
