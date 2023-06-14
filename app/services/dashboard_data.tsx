import axios from "axios"

export async function fetcher(url: string, queryParams: string) {
  if (queryParams) {
    url += `?q=${queryParams}`
  }
  console.log(url)
  var response = await axios.get(url)
  console.log(response.data)
  return response.data.data
}

export async function query(url: string, queryParams: string): Promise<any> {
  if (queryParams) {
    url += `?q=${queryParams}`
  }
  console.log(url)
  var response = await axios.get(url)
  console.log(response.data)
  return response.data.data
}

export async function updateUser(url: any, { arg }: { arg: string }) {
  console.log(arg)
  if (arg) {
    url += `?q=${arg}`
  }
  console.log(url)
  var response = await axios.get(url)
  console.log(response.data)
  return response.data.data
}
