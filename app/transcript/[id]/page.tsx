import { getXataClient } from "@/src/xata"

import { TranscriptVideo } from "@/components/videocomponent"

const xata = getXataClient()

async function getData(url: string) {
  console.log(url)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

interface Item {
  text: string
  speaker: number
  start: number
  end: number
}

export default async function IndexPage({
  params,
}: {
  params: { id: string }
}) {
  const record = await xata.db.info.read(params.id)
  const sen_url = record?.sentence_url
  let data = []

  if (sen_url) {
    data = await getData(sen_url)
  }

  return (
    <>
      <TranscriptVideo url={record?.video_id!}></TranscriptVideo>

      <div className="h-[650px] flex-col overflow-hidden overflow-y-auto p-10 dark:border-r lg:flex">
        {data.map((item: Item, index: number) => (
          <div key={index}>
            <p>
              ({item.start}-{item.end}) Speaker-{item.speaker}:{item.text}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
