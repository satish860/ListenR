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
      <TranscriptVideo url={record?.youtube_url!} data={data}/>
    </>
  )
}
