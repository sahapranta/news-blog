import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BadgeCheck } from 'lucide-react';
import React from 'react';

export type CommentProps = {
    id: string;
    body: string;
    user: {
        id: number;
        name: string;
        avatar: string;
    };
    created_at: string;
    saving?: boolean;
};

export const getFirstCharacter = (str: string): string => {
    const parts = str.trim().split(' ');
    return parts
        .slice(0, 2)
        .map((w) => w.charAt(0).toUpperCase())
        .join('');
};

type CommentCardProps = {
    comment: CommentProps;
};

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    const isAdmin = comment.user.name.includes('Pranta');
    return (
        <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 shadow-xs ring-1 ring-gray-300">
                <AvatarImage src={comment.user.avatar || '/images/placeholder-user.jpg'} alt={comment.user.name} />
                <AvatarFallback className="bg-white select-none">{getFirstCharacter(comment.user.name)}</AvatarFallback>
            </Avatar>
            <div className="grid w-full gap-1.5">
                <div className="flex items-center gap-2">
                    <div className="flex items-start">
                        <div className="font-medium">{comment.user.name}</div>
                        {!isAdmin && (
                            <Tooltip>
                                <TooltipTrigger className="!outline-0">
                                    <BadgeCheck className="-mt-0.5 h-5 text-white" fill="oklch(0.696 0.17 162.48)" />
                                </TooltipTrigger>
                                <TooltipContent color="bg-emerald-500 fill-emerald-500">
                                    <p className="text-sm">Verified User</p>
                                </TooltipContent>
                            </Tooltip>
                        )}

                        {isAdmin && (
                            <Tooltip>
                                <TooltipTrigger className="!outline-0">
                                    <BadgeCheck className="-mt-0.5 h-5 text-white" fill="oklch(0.645 0.246 16.439)" />
                                </TooltipTrigger>
                                <TooltipContent color="bg-rose-500 fill-rose-500">
                                    <p className="text-sm">Admin User</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground">{comment.created_at}</div>
                </div>

                <div className="prose max-w-none text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: comment.body }} />
            </div>
        </div>
    );
};
