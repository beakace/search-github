import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Results from "../components/Results"

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
    // zamiast if (repo !== null && repo !== undefined)
    console.log(repo)
    if (repo) {
      fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contributors`,
      )
        .then((response) => response.json())
        .then(setContributors)
    }
  }, [repo])

  return <Results selectedRepo={repo} contributors={contributors} />
}
