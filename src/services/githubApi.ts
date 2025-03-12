import { Octokit } from "octokit";
import { Repository } from '../types/interfaces.ts';

const octokit = new Octokit();


/*  Create an async function to fetch repositories for a given username
    this returns a Promise that resolves to an array of Repository object
 */
export async function fetchUserRepositories(username: string): Promise<Repository[]> {

    try {
        // Make the API request using Octokit
        const response = await octokit.request('GET /users/{username}/repos', {
            username: username,
            per_page: 100,
            sort: 'updated'
        });

        // Returning the data from the respone, Octokit automatically parses the JSON response
        return response.data;

    } catch (error) {
        // Logging the error and throwing it so it can be handled
        console.error('Error fetching user repositories', error);

        throw error;

    }


}

export async function fetchUserProfile(username: string) {
    try {
        const response = await octokit.request('GET /users/{username}', {
            username: username,
        });

    return response.data;

}catch (error){
    console.error('Error fetching user profile',error);

    throw error;
}
}