<?php

namespace App\Filament\Resources\Comments\Widgets;

use App\Models\Comment;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CommentOverview extends BaseWidget
{
    protected ?string $pollingInterval = null;

    protected function getStats(): array
    {
        $comments = Comment::query()
            ->selectRaw('COUNT(*) as total, SUM(is_verified) as verified, SUM(is_verified = 0) as unverified')
            ->first();

        return [
            Stat::make('Total', $comments->total)
                ->description('32k increase')
                ->icon('heroicon-o-chat-bubble-bottom-center-text')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('warning'),
            Stat::make('Verified', $comments->verified)
                ->description('32k increase')
                ->icon('heroicon-o-check-circle')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success'),
            Stat::make('Unverified', $comments->unverified)
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->icon('heroicon-o-minus-circle')
                ->color('danger'),
        ];
    }
}
