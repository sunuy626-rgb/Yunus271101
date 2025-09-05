
import React, { useState, FormEvent } from 'react';

interface PasswordGateProps {
    onLogin: (password: string) => boolean;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            const success = onLogin(password);
            if (!success) {
                setError('Invalid password. Please try again.');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Logo Architect</h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Access to the generator is restricted.</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="password-input" className="sr-only">Password</label>
                            <input
                                id="password-input"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Access Password"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 dark:focus:ring-offset-gray-900 transition-colors"
                        >
                            {isLoading ? 'Verifying...' : 'Enter'}
                        </button>
                    </div>
                </form>
                 <p className="text-center text-xs text-gray-500 dark:text-gray-600 mt-4">
                    ByYunus
                </p>
            </div>
        </div>
    );
};

export default PasswordGate;
