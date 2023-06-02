import { getXataClient } from "@/src/xata"

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
      <div className="h-[650px] items-center justify-center pt-2 grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative h-full flex-col p-10">
          <iframe
            title="YouTube Video"
            width="700px"
            height="600px"
            src={`https://www.youtube.com/embed/${record?.video_id}`}
          ></iframe>
        </div>
        <div className="h-[650px] flex-col p-10 dark:border-r overflow-hidden overflow-y-auto lg:flex">
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
