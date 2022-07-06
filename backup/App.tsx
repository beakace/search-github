// import React, { useState, useEffect } from "react"
// import "./App.css"
// import VirtualizedList from "./VirtualizedList"
// import SearchBar from "./SearchBar"

// function App() {
//   const [repoData, setRepoData] = useState([])
//   const [query, setQuery] = useState("")

//   useEffect(() => {
//     if (query.length) {
//       fetch(`https://api.github.com/search/repositories?q=${query}`)
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Success:", data)
//           setRepoData(data.items)
//         })
//     } else {
//       setRepoData([])
//     }
//   }, [query])

//   //zmiana zeby setQuery byl na button i onClick

//   return (
//     <div className="App">
//       <SearchBar query={query} setQuery={setQuery} />
//       <VirtualizedList />
//       {repoData.map(({ name, id }) => (
//         <p key={id}>
//           {" "}
//           {name} {id}{" "}
//         </p>
//       ))}
//     </div>
//   )
// }

// export default App
