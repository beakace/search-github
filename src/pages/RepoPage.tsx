import { useEffect, useState } from "react"
import Results from "../components/Results"
import { useParams } from "react-router-dom"

export function RepoPage() {
  const { name, owner } = useParams()

  const [contributors, setContributors] = useState([])
  const [repo, setRepo] = useState<any>()

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${name}`)
      .then((response) => response.json())
      .then(setRepo)
  }, [name, owner])

  useEffect(() => {
    if (repo) {
      fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contributors`,
      )
        .then((response) => response.json())
        .then((data) => {
          setContributors(data)
        })
    }
  }, [repo])
  return <Results selectedRepo={repo} contributors={contributors} />
}
