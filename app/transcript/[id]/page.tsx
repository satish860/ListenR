import {getXataClient} from "@/src/xata";


const xata = getXataClient()

export default async function IndexPage({ params }: { params: { id: string } }) {
  const record = await xata.db.info.read(params.id);
  console.log(record);
  return (
    <>
      <div className="container relative hidden h-[650px] flex-col items-center justify-center pt-2 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 dark:border-r lg:flex">
          <iframe
            title="YouTube Video"
            width="700px"
            height="600px"
            src={`https://www.youtube.com/embed/${record?.video_id}`}
            style={{ position: "absolute" }}
          ></iframe>
        </div>

        <div className=" bg-black lg:pr-10">
          <div className="relative hidden h-full flex-col p-10 dark:border-r lg:flex"></div>
        </div>
      </div>
    </>
  )
}
