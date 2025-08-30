import React from "react";
import { Download } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

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
    text = "ডাউনলোড",
    disabledTooltip = "Sorry! This issue is not available."
}) => {
    if (pdfUrl) {
        return (
            <Link
                href={route('paper.download', { paper: slug })}
                download
                className="flex-1 border border-red-600 text-red-600 py-2 px-3 rounded text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center"
            >
                <Download className="w-3 h-3 mr-1" />
                {text}
            </Link>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger
                disabled
                className="flex-1 border border-red-400 text-red-400 py-2 px-3 rounded text-sm font-medium bg-white cursor-not-allowed flex items-center justify-center"
            >
                <Download className="w-3 h-3 mr-1" />
                {text}
            </TooltipTrigger>
            <TooltipContent>
                <p>{disabledTooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default PaperDownloadButton;
