import axios from "axios"

export async function fetcher() {
  var response = await axios.get("/api")
  console.log(response.data)
  return response.data.data
}

