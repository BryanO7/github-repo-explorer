# GitHub Repositories With Search Functionality

This project is a simple yet functional application that allows users to search for GitHub repositories by entering a username. The repositories are displayed in a list, and users can filter them by name and/or programming language.

## Features

* Search for repositories by GitHub username.
    
* Filter repositories by name and programming language.
    
* Responsive user interface following good UX principles.
    
* Uses the official GitHub API to fetch repository data.
    
* Developed with React and TypeScript.
    
* Components documented and tested using Storybook.

# Technologies Used

* React + [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Octokit](https://github.com/octokit)
* GitHub REST API v3
* Storybook
# Installation and Usage

##  Prerequisites
    Node.js (v16 or higher recommended)

## Setup

### 1. Clone the repository:
    git clone https://github.com/BryanO7/github-repo-explorer.git

### 2. Navigate to the project directory:
    cd your-download-folder/github-repo-explorer
### 3. Install dependencies:
    npm install
### 4. Start the development server:
    npm run dev

## Storybook Documentation
To view component documentation in Storybook:

    npm run storybook

This will open a UI to explore components in isolation.


## Future Improvements

* Implement unit and integration tests.

* Deploy the application online.

* Use GitHub GraphQL API v4 for optimized queries.

* Enhance UI with animations and better accessibility support.

* Implement authentication with a GitHub API token to increase request limits (currently limited to 50 requests per hour).