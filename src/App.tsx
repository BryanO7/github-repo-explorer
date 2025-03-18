import { useState } from 'react';
import {fetchUserRepositories} from './services/githubApi';
import {Repository, RepositoryOwner} from './types/interfaces.ts';
import './styles/App.css';
import Header from './components/Header';
import SearchBar from "./components/SearchBar.tsx";
import Filters from './components/Filters.tsx';
import RepositoryList from "./components/RepositoryList.tsx";
import UserProfile from "./components/UserProfile.tsx";
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


                {userProfile && <UserProfile owner={userProfile} />}


                <Filters
                    nameFilter={nameFilter}
                    setNameFilter={setNameFilter}
                    languageFilter={languageFilter}
                    setLanguageFilter={setLanguageFilter}
                    uniqueLanguages={getUniqueLanguages()}
                />


                {/*calling the repositoryList component */}
               <RepositoryList repositories={filteredRepositories} />


            </div>
        )}
    </div>

  )
}

export default App
