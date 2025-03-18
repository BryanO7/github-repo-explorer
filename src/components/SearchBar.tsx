import { useState } from "react";

type SearchBarProps = {
    onSearch: (username: string) => void;
}

/**
 * Search Bar component for searching GitHub users
 *
 * @param {object} props  - component props <br/>
 * @param {(Username: string) => void} props.onSearch - callback function triggered when search is submitted <br/>
 */

function SearchBar({ onSearch }: SearchBarProps) {
    const [username, setUsername] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()){
            onSearch(username.trim());
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter a GitHub username"
                />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;