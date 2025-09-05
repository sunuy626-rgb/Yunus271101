
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="shrink-0 text-center py-2 px-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                ByYunus &copy; {currentYear}
            </p>
        </footer>
    );
};

export default Footer;
