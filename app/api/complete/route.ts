import { NextResponse } from "next/server"
import { getXataClient } from "@/src/xata"

export const runtime = "edge"

const xata = getXataClient()

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, world!" })
}

export async function POST(request: Request) {
  const res = await request.json()
  const transcript_url = res.url
  const sentence_url = res.sentence_url
  const corelation_id = res.id
  const summary_url = res.summary_url
  const info_record = await xata.db.info
    .filter({ corelation_id: corelation_id })
    .getMany()
  const transcript_update = await xata.db.info.update(info_record[0].id, {
    transcript_url: transcript_url,
    sentence_url: sentence_url,
    transcription_status: "completed",
    summary_url: summary_url,
  })
  return NextResponse.json({ message: "Hello, world!" })
}
