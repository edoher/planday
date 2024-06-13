import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import api from './api';

vi.mock('./api');

describe('App', () => {
    it('renders the App component', async () => {
        vi.mocked(api).mockResolvedValue({
            data: [
                {
                    title: 'We believe',
                    description: 'We believe',
                    imagePath: 'sample',
                },
            ],
            count: 1,
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.queryByText('We believe')).not.toBeUndefined(),
                screen.debug(); // prints out the jsx in the App component unto the command line
        });
    });
});
