import { useState } from 'react';
import { fetchUserRepositories } from './services/githubApi';
import { Repository } from './types/interfaces.ts';
import './styles/App.css';
import Header from './components/Header';
import SearchBar from "./components/SearchBar.tsx";
function App() {

  const [nameFilter, setNameFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
      setIsLoading(true);
      setError(null);

      try {

          const data = await fetchUserRepositories(username);
          setRepositories(data);
      } catch(err){
          console.error('Error fetchign repositories:',err)
          setError('Failed to fetch repositories.')
          setRepositories([])
      } finally {
          setIsLoading(false);
      }
  };

  const getUniqueLanguages = () =>{
      const languages = repositories
          .map(repo => repo.language)
          .filter((language): language is string =>language !== null && language !== undefined);

      return [...new Set(languages)];

  }
    const filteredRepositories = repositories.filter(repo => {
        // Filter by name (case insensitive)
        const nameMatches = repo.name.toLowerCase().includes(nameFilter.toLowerCase());

        // Filter by language (if a language filter is selected)
        const languageMatches = !languageFilter || repo.language === languageFilter;

        return nameMatches && languageMatches;
    });

  return (
    <div className="App">
        <Header />
        <SearchBar onSearch={handleSearch} />

        {/* Show loading indicator */}
        {isLoading && <p>Loading repositories...</p>}

        {/* Show error message if there is one */}
        {error && <p className="error">{error}</p>}

        {/* Display repositories if available */}
        {repositories.length > 0 && (
            <div>
                <div className="filters">
                    <div>
                        <label htmlFor="name-filter">Filter by name: </label>
                        <input
                            id="name-filter"
                            type="text"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            placeholder="Repository name"
                        />
                    </div>

                    <div>
                        <label htmlFor="language-filter">Filter by language: </label>
                        {/* Creates a dropdown with all unique languages found in the repository  */}
                        <select
                            id="language-filter"
                            value={languageFilter}
                            onChange={(e) => setLanguageFilter(e.target.value)}
                        >
                            <option value="">All Languages</option>
                            {getUniqueLanguages().map(language => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h2>Found {filteredRepositories.length} repositories</h2>
                <ul>
                    {filteredRepositories.map(repo => (
                        <li key={repo.id}>
                            {repo.name} {repo.language && <span>({repo.language})</span>}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>

  )
}

export default App
