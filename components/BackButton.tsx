import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

interface BackButtonProps {
    to?: string;
}

export default function BackButton({ to }: BackButtonProps): React.ReactNode {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => to ? navigate(to) : navigate(-1)}
            className="group inline-flex items-center mb-6 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-all duration-300"
            aria-label="Voltar para a página anterior"
        >
            <ArrowLeftIcon className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="ml-2">Voltar</span>
        </button>
    );
}