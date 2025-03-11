import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import SearchBar from "./components/SearchBar.tsx";
function App() {
  const [search, setSearch] = useState('')


  const handleSearch = (username: string) => {
      console.log(`Searching for GitHub user: ${username}`);

  }
  return (
    <div className="App">
        <Header />
        <SearchBar onSearch={handleSearch} />

      <div>


      </div>
    </div>

  )
}

export default App
