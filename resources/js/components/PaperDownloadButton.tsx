import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Download } from 'lucide-react';
import React from 'react';
import { route } from 'ziggy-js';

interface DownloadButtonProps {
    pdfUrl?: string | null;
    slug: string;
    text?: string;
    disabled?: boolean;
    disabledTooltip?: string;
}

const PaperDownloadButton: React.FC<DownloadButtonProps> = ({
    pdfUrl,
    slug,
    text = 'ডাউনলোড',
    disabledTooltip = 'Sorry! This issue is not available.',
}) => {
    if (pdfUrl) {
        return (
            <Link
                href={route('paper.download', { paper: slug })}
                download
                className="flex flex-1 items-center justify-center rounded border border-red-600 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
                <Download className="mr-1 h-3 w-3" />
                {text}
            </Link>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger
                disabled
                className="flex flex-1 cursor-not-allowed items-center justify-center rounded border border-red-400 bg-white px-3 py-2 text-sm font-medium text-red-400"
            >
                <Download className="mr-1 h-3 w-3" />
                {text}
            </TooltipTrigger>
            <TooltipContent>
                <p>{disabledTooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default PaperDownloadButton;
