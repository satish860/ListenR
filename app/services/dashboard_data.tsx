import axios from "axios"

export async function fetcher(url: string, queryParams: string) {
  if (queryParams) {
    url += `?q=${queryParams}`
  }
  var response = await axios.get(url)
  console.log(response.data)
  return response.data.data
}

export async function updateUser(url: any, { arg }: { arg: string }) {
  if (arg) {
    url += `?q=${arg}`
  }
  var response = await axios.get(url)
  console.log(response.data)
  return response.data.data
}
