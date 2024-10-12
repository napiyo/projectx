import { Button } from "@/components/ui/moving-border";
import Link from "next/link";



export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-pretty">
        <Link href="/flowbuilder" >
        <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Borders are cool
      </Button>
    </div>
        </Link>
        </h1>
    </main>
  );
}
