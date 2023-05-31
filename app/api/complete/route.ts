import { NextResponse } from "next/server"
import {getXataClient} from "@/src/xata";

const xata = getXataClient()

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, world!" })
}

export async function POST(request: Request) {
    const res = await request.json()
    const transcript_url = res.url
    const corelation_id = res.id
    const info_record = await xata.db.info.filter({corelation_id: corelation_id}).getMany();
    const transcript_update = await xata.db.info.update(info_record[0].id,{transcript_url: transcript_url, transcription_status: "completed"});
    return NextResponse.json({ message: "Hello, world!" })
}