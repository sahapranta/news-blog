<?php

namespace App\Filament\Resources\Comments;

use App\Filament\Resources\Comments\Pages\ManageComments;
use App\Models\Comment;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Grouping\Group;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class CommentResource extends Resource
{
    protected static ?string $model = Comment::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Forms\Components\TextInput::make('parent_id')
                //     ->numeric(),
                // Forms\Components\TextInput::make('user_id')
                //     ->required()
                //     ->numeric(),
                // Forms\Components\TextInput::make('commentable_type')
                //     ->required(),
                // Forms\Components\TextInput::make('commentable_id')
                //     ->required()
                //     ->numeric(),
                Textarea::make('body')
                    ->required()
                    ->columnSpanFull(),
                Toggle::make('is_verified')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name'),
                TextColumn::make('commentable.title')
                    ->label('Comment')
                    ->description(fn (Comment $record) => Str::of($record->body)?->substr(0, 50).'...'),
                IconColumn::make('is_verified')
                    ->label('Verified')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->since()
                    ->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Filter::make('verified')
                    ->query(fn (Builder $query) => $query->where('is_verified', true))
                    ->label('Verified'),
                Filter::make('is_verified')
                    ->query(fn (Builder $query) => $query->where('is_verified', false))
                    ->label('Non Verified')
                    ->default(),
            ])
            ->recordActions([
                Action::make('verify')
                    ->action(fn (Comment $record) => $record->update(['is_verified' => true]))
                    ->requiresConfirmation()
                    ->color('info')
                    ->visible(fn (Comment $record) => ! $record->is_verified)
                    ->icon('heroicon-o-check'),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->groups([
                Group::make('commentable_id')
                    ->titlePrefixedWithLabel(false)
                    ->getTitleFromRecordUsing(fn ($record): string => $record->commentable->title)
                    ->getDescriptionFromRecordUsing(fn ($record): string => ucfirst($record->commentable_type)),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('verify')
                        ->action(fn ($records) => $records->each(fn (Comment $record) => $record->update(['is_verified' => true])))
                        ->requiresConfirmation()
                        ->color('info')
                        ->icon('heroicon-o-check'),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageComments::route('/'),
        ];
    }
}
