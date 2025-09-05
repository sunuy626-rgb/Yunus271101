
import React, { useState, useCallback, useMemo } from 'react';
import PasswordGate from './components/PasswordGate';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './hooks/useTheme';

const APP_PASSWORD = process.env.APP_PASSWORD || 'Yunusganteng123';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = useCallback((password: string) => {
        if (password === APP_PASSWORD) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    const appContent = useMemo(() => {
        if (isAuthenticated) {
            return <Dashboard />;
        }
        return <PasswordGate onLogin={handleLogin} />;
    }, [isAuthenticated, handleLogin]);

    return (
        <ThemeProvider>
            <div className="min-h-screen text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-950">
                {appContent}
            </div>
        </ThemeProvider>
    );
};

export default App;
