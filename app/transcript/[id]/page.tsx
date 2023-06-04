import { getXataClient } from "@/src/xata"

import { TranscriptVideo } from "@/components/videocomponent"

const xata = getXataClient()

async function getData(url: string) {
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
      <div className="flex">
        <div className="w-1/2">
          <TranscriptVideo url={record?.youtube_url!}></TranscriptVideo>
        </div>
        
        <div className="h-[600px] w-1/2 overflow-hidden overflow-y-auto p-10 dark:border-r">
          {data.map((item: Item, index: number) => (
            <div key={index}>
              <p>
                ({item.start}-{item.end}) Speaker-{item.speaker}:{item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
