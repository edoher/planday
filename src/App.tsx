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
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const fetchData = useCallback(async () => {
        const { data, count } = await api({ page: page, per_page: perPage });

        setElements(data);
        setElementCount(count);
    }, [page, perPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /**
     * Logic for estimating number of pages
     */
    const pages = elementCount > 0 ? Math.floor(elementCount / perPage) : 1;

    return (
        <div className="container">
            <div className="pagination">
                <div>
                    <label htmlFor="pageSelect">Page</label>
                    <select
                        id="pageSelect"
                        value={page}
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => setPage(Number(event.target.value))}
                    >
                        {(() => {
                            const options = [];
                            for (let i = 1; i <= pages; i++) {
                                options.push(<option key={i}>{i}</option>);
                            }
                            return options;
                        })()}
                    </select>
                </div>

                <div>
                    <label htmlFor="perPageSelect">Elements per page</label>
                    <select
                        id="perPageSelect"
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
