import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, world!" })
}

export async function POST(request: Request) {
  const res = await request.json()
  const youtubeUrl = res.url
  const corelation_id = res.id
  const requestBody = {
    url: youtubeUrl,
    record_id: corelation_id,
  }
  const url = "https://apps.beam.cloud/d33pb"
  const token = process.env.INFO_API_KEY
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate",
      Authorization: `Basic ${token}`,
      Connection: "keep-alive",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    throw new Error("Request failed")
  }
  return NextResponse.json({ message: "Hello, world!" })
}
