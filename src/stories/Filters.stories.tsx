import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Filters from '../components/Filters';
import { fn } from '@storybook/test';

// testing data
const testRepositories = [
    { id: 1, name: 'react-project', language: 'Javascript' },
    { id: 2, name: 'api-server', language: 'Typescript' },
    { id: 3, name: 'legacy-system', language: 'ruby' },
    { id: 4, name: 'javaproject', language: 'Java' },
    { id: 5, name: 'mobile-app', language: 'kotlin' },
    { id: 6, name: 'ui-components', language: 'C++' },
];

const meta: Meta<typeof Filters> = {
    component: Filters,
    args: {
        nameFilter: '',
        setNameFilter: fn(),
        languageFilter: '',
        setLanguageFilter: fn(),
        uniqueLanguages: ['java','typescript','swift'],
    }
};

export default meta;
type Story = StoryObj<typeof Filters>;

// basic story
export const Default: Story = {};

// story that filters the data
export const WithFilteredResults = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');

    // Extracting the unique Languages of our data
    const uniqueLanguages = Array.from(
        new Set(testRepositories.map(repo => repo.language))
    );

    // filtering the data
    const filteredRepositories = testRepositories.filter(repo => {
        const nameMatches = repo.name.toLowerCase().includes(nameFilter.toLowerCase());
        const languageMatches = !languageFilter || repo.language === languageFilter;
        return nameMatches && languageMatches;
    });

    return (
        <div>
            <h2>Repository Filter</h2>

            <Filters
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
                languageFilter={languageFilter}
                setLanguageFilter={setLanguageFilter}
                uniqueLanguages={uniqueLanguages}
            />

            <div>
                <h3>Filtered repositories ({filteredRepositories.length})</h3>
                    <ul>
                    {filteredRepositories.map(repo => (
                      <li  key={repo.id}>
                            {repo.name}  {repo.language}
                      </li>
                    ))}
                    </ul>
            </div>
        </div>
    );
};

WithFilteredResults.storyName = 'Testing the filters';