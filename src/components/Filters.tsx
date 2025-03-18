

type FiltersProps = {
    nameFilter: string;
    setNameFilter: (value: string) => void;
    languageFilter: string;
    setLanguageFilter: (value: string) => void;
    uniqueLanguages: string[];
};



/**
 * Filters component for filtering repositories by name and programming language
 *
 * @param {object} props - Component props <br/>
 * @param {string} props.nameFilter - Current value of the name filter input<br/>
 * @param {(value: string) => void} props.setNameFilter - Function to update the name filter value <br/>
 * @param {string} props.languageFilter - Currently selected language filter value <br/>
 * @param {(value: string) => void} props.setLanguageFilter - Function to update the language filter selection <br/>
 * @param {string[]} props.uniqueLanguages - Array of available programming languages to filter by <br/>
 */
function Filters({
                     nameFilter,
                     setNameFilter,
                     languageFilter,
                     setLanguageFilter,
                     uniqueLanguages
                 }: FiltersProps) {
    return (
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
                <select
                    id="language-filter"
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                >
                    <option value="">All Languages</option>
                    {uniqueLanguages.map(language => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Filters;
