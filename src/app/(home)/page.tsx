import { Button } from "../../components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center gap-5"
      }
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Image
        src={"/doc.svg"}
        alt={"Google-Docs-icon"}
        width={100}
        height={100}
      />
      <h1 className={"text-4xl font-bold"}>Google Docs Clone</h1>
      <Button asChild size={"lg"}>
        <Link href={"/sign-in"}>Get Start</Link>
      </Button>
    </main>
  );
}
