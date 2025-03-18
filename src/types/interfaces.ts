// Interface for a GitHub repo

export interface Repository {
    id: number;
    name: string;
    description?: string | null;
    html_url: string;
    language?: string | null | undefined;
    stargazers_count?: number;
    forks_count?: number;
    updated_at?: string | null | undefined;
    owner: RepositoryOwner;
    node_id: string
}
//Interface for the owner of a repo
export interface RepositoryOwner{
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    html_url: string;

    name?: string | null | undefined;
    email?: string | null | undefined;
}

