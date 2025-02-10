import {Button} from "../../components/ui/button";
import Link from "next/link";


export default function HomePage() {
  return (
      <main className={"container mx-auto flex flex-col items-center justify-center min-h-screen gap-5"}>
        <h1>Google docs clone</h1>
        <Button asChild>
          <Link href={"/sign-in"}>Get Start</Link>
        </Button>
      </main>
  )
}
