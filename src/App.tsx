import { useState } from 'react';
import {fetchUserRepositories} from './services/githubApi';
import {Repository, RepositoryOwner} from './types/interfaces.ts';
import './styles/App.css';
import Header from './components/Header';
import SearchBar from "./components/SearchBar.tsx";
function App() {

  const [nameFilter, setNameFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<RepositoryOwner | null>(null);



  const handleSearch = async (username: string) => {

      setIsLoading(true);
      setError(null);

      try {

          const data = await fetchUserRepositories(username);
          setRepositories(data);

          if (data.length > 0){
              setUserProfile(data[0].owner)
          }

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

                <div className="user-profile">
                    <img
                        src={userProfile?.avatar_url}
                        alt="GitHub avatar"
                        className="avatar"
                    />
                    <div>
                        <h2>{userProfile?.login}</h2>

                    </div>
                </div>


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

                    {filteredRepositories.map(repo => (
                        <li key={repo.id}>
                            <a href={repo.html_url} target="_blank" rel="noreferrer">
                                {repo.name}
                            </a>
                            {repo.language && <span>({repo.language})</span>}

                        </li>
                    ))}

            </div>
        )}
    </div>

  )
}

export default App
