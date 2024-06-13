import { useCallback, useEffect, useState } from 'react';
import api from './api';
import { GridElement } from './types';
import Grid from './Grid';

const App = () => {
    const [elements, setElements] = useState<GridElement[]>([]);

    const fetchData = useCallback(async () => {
        const response = await api({});

        setElements(response);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container">
            {elements.length > 0 && <Grid elements={elements} />}
        </div>
    );
};

export default App;
