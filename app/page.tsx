import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          ListenR: Accurate Audio-to-Text Conversion Made Simple
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Harness the Power of Advanced AI Models to Convert Audio into Text with ListenR
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.start}
          className={buttonVariants({ size: "lg" })}
        >
          Start For Free
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Star on Github
        </Link>
      </div>
    </section>
  )
}
