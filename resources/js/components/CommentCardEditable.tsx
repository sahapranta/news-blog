import { CommentProps, getFirstCharacter } from '@/components/CommentCard';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useClickAwayAndEscape } from '@/hooks/use-click-away-esc';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { PenBox, Trash2, XOctagon } from 'lucide-react';
import React, { useRef, useState } from 'react';

type CommentCardProps = {
    comment: CommentProps;
    user: User | null;
    onEdit: (id: string, newBody: string) => void;
    onDelete: (id: string) => void;
};

export const CommentCardEditable: React.FC<CommentCardProps> = ({ comment, user, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBody, setEditedBody] = useState(comment.body);
    const editRef = useRef<HTMLDivElement>(null);

    const handleSave = () => {
        if (editedBody.trim()) {
            onEdit(comment.id, editedBody);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        onDelete(comment.id);
    };

    const handleCancel = () => {
        setEditedBody(comment.body);
        setIsEditing(false);
    };

    useClickAwayAndEscape(editRef, () => {
        if (isEditing) {
            handleCancel();
        }
    });

    return (
        <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 shadow-xs ring-1 ring-gray-300">
                <AvatarImage src={comment.user.avatar || '/images/placeholder-user.jpg'} alt={comment.user.name} />
                <AvatarFallback className="bg-white select-none">{getFirstCharacter(comment.user.name)}</AvatarFallback>
            </Avatar>
            <div className="grid w-full gap-1.5" ref={editRef}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="font-medium">{comment.user.name}</div>
                        <div className="text-xs text-muted-foreground">{comment.created_at}</div>
                    </div>
                    {user && user.id === comment.user.id && !isEditing && (
                        <div className="flex items-center gap-2">
                            <button className="rounded-full text-gray-500 hover:text-blue-600" onClick={() => setIsEditing(true)}>
                                <PenBox className="w-4" />
                            </button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="rounded-full text-red-500 hover:text-red-700">
                                        <Trash2 className="w-4" />
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="!w-xs !rounded-2xl">
                                    <AlertDialogHeader className="space-y-3 pb-2 text-center">
                                        <AlertDialogTitle className="!text-lg !font-semibold">Delete Comment</AlertDialogTitle>
                                        <AlertDialogDescription className="text-sm text-gray-600">
                                            Are you sure you want to delete this comment?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="!justify-center">
                                        <AlertDialogCancel className="w-32 rounded-xl border-0 bg-gray-200 py-3 font-medium text-gray-900 hover:bg-gray-300">
                                            <XOctagon className="mr-2 h-4 w-4" />
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            className="w-32 rounded-xl bg-red-500 py-3 font-medium text-white hover:bg-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </div>
                {isEditing ? (
                    <div className="grid gap-2">
                        <Textarea
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            className="bg-white text-sm !outline-0"
                            placeholder="Write your comment..."
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleSave} size="sm" variant="outline" disabled={editedBody.trim() === ''} className="bg-white">
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditedBody(comment.body);
                                    setIsEditing(false);
                                }}
                                size="sm"
                                variant="outline"
                                className="bg-primary text-xs text-white hover:bg-primary/90 hover:text-white"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={cn('prose max-w-none text-sm text-muted-foreground', comment.saving && 'animate-pulse opacity-60')}
                        dangerouslySetInnerHTML={{ __html: comment.body }}
                    />
                )}
            </div>
        </div>
    );
};
