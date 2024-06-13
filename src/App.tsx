import { useCallback, useEffect, useState } from 'react';
import api from './api';
import { GridElement } from './types';
import Grid from './Grid';

const App = () => {
    const [elements, setElements] = useState<GridElement[]>([]);
    const [elementCount, setElementCount] = useState(0);
    /**
     * Query options
     */
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const fetchData = useCallback(async () => {
        const { data, count } = await api({
            search: search,
            page: page,
            per_page: perPage,
        });

        setElements(data);
        setElementCount(count);
    }, [search, page, perPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /**
     * Logic for estimating number of pages
     * and creating array with page number option
     */
    const pages = elementCount > 0 ? Math.floor(elementCount / perPage) : 1;
    const pagesOptionsArray = [];

    for (let i = 1; i <= pages; i++) {
        pagesOptionsArray.push(i);
    }

    return (
        <div className="container">
            <div className="pagination-and-search flex justify-center gap-6 p-6">
                <div>
                    <label htmlFor="searchBox">Search</label>
                    <input
                        id="searchBox"
                        className="border ml-2"
                        tabIndex={0}
                        value={search}
                        type="text"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setSearch(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="pageSelect">Page</label>
                    <select
                        id="pageSelect"
                        tabIndex={0}
                        value={page}
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => setPage(Number(event.target.value))}
                    >
                        {pagesOptionsArray.map((pagesOption) => (
                            <option key={`page-option-${pagesOption}`}>
                                {pagesOption}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="perPageSelect">Elements per page</label>
                    <select
                        id="perPageSelect"
                        tabIndex={0}
                        value={perPage}
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => setPerPage(Number(event.target.value))}
                    >
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                    </select>
                </div>
            </div>

            {elements.length > 0 && <Grid elements={elements} />}
        </div>
    );
};

export default App;
