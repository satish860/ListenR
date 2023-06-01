

export default function IndexPage({ params} : {params: {id: string}}) {

  return <h1>{params.id}</h1>
}
