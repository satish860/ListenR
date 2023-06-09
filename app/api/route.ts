import { NextRequest, NextResponse } from "next/server"
import { getXataClient } from "@/src/xata"
import { getAuth } from "@clerk/nextjs/server"

export const runtime = "edge"

interface VideoData {
  title: string
  number_of_views: string
  video_length: string
  thumbnail_url: string
  ratings: number
  youtube_url: string
  video_id: string
}

const xata = getXataClient()

const fetchData = async (youtubeUrl: string): Promise<VideoData> => {
  const url = process.env.INFO_API_URL
  const token = process.env.BEAM_API_KEY
  const requestBody = {
    url: youtubeUrl,
  }

  try {
    if (!url) {
      throw new Error("INFO_API_URL is not defined")
    }

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
      console.log("Response Headers:", response.headers)
      throw new Error("Request failed")
    }

    const yt = await response.json()
    console.log(yt)
    const videoData: VideoData = {
      title: yt.response.title,
      number_of_views: yt.response.number_of_views.toString(),
      video_length: yt.response.video_length,
      thumbnail_url: yt.response.thumbnail_url,
      ratings: yt.response.rating,
      youtube_url: youtubeUrl,
      video_id: yt.response.id,
    }
    return videoData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request)
  const res = await request.json()
  const youtubeUrl = res.url
  const corelation_id = res.id
  const isyoutube = res.isyoutube
  const file = res.file
  var record = null

  if (isyoutube) {
    const data = await fetchData(youtubeUrl)
    record = await xata.db.info.create({
      user_id: userId,
      title: data.title,
      number_of_views: data.number_of_views.toString(),
      video_length: data.video_length.toString(),
      thumbnail_url: data.thumbnail_url,
      ratings: String(data.ratings),
      corelation_id: corelation_id,
      transcription_status: "pending",
      youtube_url: data.youtube_url,
      video_id: data.video_id,
      youtube_video: isyoutube,
    })
  } else {
    record = await xata.db.info.create({
      user_id: userId,
      title: file.originalFileName,
      video_length: file.size.toString(),
      thumbnail_url:
        "https://www.pngitem.com/pimgs/m/213-2136749_sound-wave-clipart-transparent-sound-waves-clipart-png.png",
      corelation_id: corelation_id,
      transcription_status: "pending",
      youtube_url: file.fileUrl,
      youtube_video: isyoutube,
    })
  }
  return NextResponse.json({ record })
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")
  console.log("q:", q)
  if (q) {
    const records = await xata.db.info
      .filter({
        title: { $contains: q },
      })
      .getPaginated({
        pagination: {
          size: 30,
        },
      })
    return NextResponse.json({ data: records.records })
  } else {
    const records = await xata.db.info.getPaginated({
      pagination: {
        size: 30,
      },
    })
    return NextResponse.json({ data: records.records })
  }
}
