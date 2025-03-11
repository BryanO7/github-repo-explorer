// Interface for a GitHub repository

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

export interface RepositoryOwner{
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    html_url: string;

    name?: string | null | undefined;
    email?: string | null | undefined;
}

export interface SearchFilters{
    nameFilter: string | null;
    languageFilter: string | null;
}