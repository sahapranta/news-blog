import { CommentCard, CommentProps } from '@/components/CommentCard';
import { CommentCardEditable } from '@/components/CommentCardEditable';
import CommentSkeleton from '@/components/CommentSkeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/hooks/use-api';
import { useTranslation } from '@/lib/useTranslation';
import { SharedData } from '@/types';
import { ApiError } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

type CommentSectionProps = {
    id?: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
    const { t } = useTranslation();
    const [comments, setComments] = useState<CommentProps[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false); // true on first load
    const [loadingMore, setLoadingMore] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { auth } = usePage<SharedData>().props;

    const fetchComments = async (url: string, isLoadMore = false) => {
        if (isLoadMore) setLoadingMore(true);
        else setLoading(true);

        const { data } = await api.get(url);

        setComments((prev) => [...(isLoadMore ? prev : []), ...data.data]);
        setNextPageUrl(data.links.next || null);

        if (isLoadMore) setLoadingMore(false);
        else setLoading(false);
    };

    useEffect(() => {
        if (id) {
            fetchComments(route('api.comments', { article: id }));
        }
    }, [id]);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            toast.info('Your Comment is Empty');
            return;
        }

        setSubmitting(true);

        try {
            const { data } = await api.post(route('api.comments.add', { article: id }), {
                body: comment,
            });
            setComments([data.data, ...comments]);
            setComment('');
        } catch (err: unknown) {
            const error = err as ApiError;
            if (error) {
                toast.error(error.response?.status === 422 ? 'Validation Error' : 'Something Went Wrong', {
                    description: error.response?.data?.message || error.message,
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (id: string | number, newBody: string) => {
        setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, body: newBody, saving: true } : comment)));

        try {
            const { data } = await api.put(route('api.comments.update', { comment: id }), {
                body: newBody,
            });

            setComments((prev) => prev.map((comment) => (comment.id === id ? { ...data.data, saving: false } : comment)));
            toast.success('Comment Updated Successfully');
        } catch (err: unknown) {
            const error = err as ApiError;
            if (error) {
                toast.error('Something Went Wrong', {
                    description: error.message,
                });
            }
            setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, saving: false } : comment)));
        }
    };

    const handleDelete = async (id: string | number) => {
        try {
            await api.delete(route('api.comments.delete', { comment: id }));

            setComments((prev) => prev.filter((comment) => comment.id !== id));

            toast.success('Comment Deleted Successfully');
        } catch (err: unknown) {
            const error = err as ApiError;
            if (error) {
                toast.error('Something Went Wrong', {
                    description: error.message,
                });
            }
        }
    };

    return (
        <div className="mx-auto space-y-8 py-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold capitalize">{t('comments')}</h2>
                <div className="grid gap-3">
                    <Textarea
                        placeholder="Write your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="bg-white !outline-0"
                    />
                    <Button onClick={handleSubmit} disabled={submitting}>
                        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <CommentSkeleton key={i} />)
                    : comments.map((comment) => {
                          if (comment.user.id === auth?.user?.id) {
                              return (
                                  <CommentCardEditable
                                      key={comment.id}
                                      comment={comment}
                                      user={auth.user}
                                      onEdit={handleEdit}
                                      onDelete={handleDelete}
                                  />
                              );
                          } else {
                              return <CommentCard key={comment.id} comment={comment} />;
                          }
                      })}

                {loadingMore && Array.from({ length: 4 }).map((_, i) => <CommentSkeleton key={i} />)}
            </div>

            {nextPageUrl && !loading && (
                <div className="flex justify-center pt-4">
                    <Button onClick={() => fetchComments(nextPageUrl, true)} disabled={loadingMore}>
                        {loadingMore && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t('load_more')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
