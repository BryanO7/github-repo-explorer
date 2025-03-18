import { Repository } from "../types/interfaces.ts";

type RepositoryListProps = {
    repositories: Repository[];
};

const RepositoryList = ({ repositories }: RepositoryListProps) => {
    if (repositories.length === 0) {
        return <div className="empty-state">No repositories found.</div>;
    }

    return (
        <div className="repository-list">
            <h2>Found {repositories.length} repositories</h2>
            <ul className="repos-container">
                {repositories.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                            {repo.name}
                        </a>
                        {repo.language && <span>({repo.language})</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default RepositoryList;