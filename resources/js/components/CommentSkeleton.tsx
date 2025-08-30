import { Skeleton } from '@/components/ui/skeleton';

const CommentSkeleton = () => (
    <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-red-200" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-red-100" />
            <Skeleton className="h-4 w-[200px] bg-red-100" />
        </div>
    </div>
);

export default CommentSkeleton;
