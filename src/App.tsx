import { useCallback, useEffect } from 'react';
import api from './api';

const App = () => {
    const fetchData = useCallback(async () => {
        const response = await api({});

        console.log(response);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container">
            <h1 className="text-3xl font-bold">Hello world!</h1>
        </div>
    );
};

export default App;
