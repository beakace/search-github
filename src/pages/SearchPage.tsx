import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { BasicList } from "../components/BasicList"
import SearchBar from "../components/SearchBar"

export function SearchPage() {
  const [repoData, setRepoData] = useState([])
  const [loading, setLoading] = useState(false)

  return loading ? (
    <div className="loader-container">
      <ClipLoader color={"#fff"} size={60} />
    </div>
  ) : (
    <>
      <SearchBar setRepoData={setRepoData} setLoading={setLoading} />
      <BasicList repoData={repoData} />
    </>
  )
}
