import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import { BasicList } from "../components/BasicList"
import SearchBar from "../components/SearchBar"
import { useSearchParams } from "react-router-dom"

export function SearchPage() {
  const [repoData, setRepoData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("query")

  useEffect(() => {
    if (searchQuery) {
      setLoading(true)

      fetch(`https://api.github.com/search/repositories?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setRepoData(data.items)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [searchQuery])

  return loading ? (
    <div className="loader-container">
      <div className="spinner">
        <ClipLoader color={"gray"} size={90} />
      </div>
    </div>
  ) : (
    <>
      <div className="search-page">
        <SearchBar
          setRepoData={setRepoData}
          setLoading={setLoading}
          searchParams={searchParams}
          searchQuery={searchQuery}
          setSearchParams={setSearchParams}
        />
        {repoData && <BasicList repoData={repoData} />}
      </div>
    </>
  )
}
