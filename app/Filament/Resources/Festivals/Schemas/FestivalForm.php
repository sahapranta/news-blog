<?php

namespace App\Filament\Resources\Festivals\Schemas;

use App\Models\Article;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class FestivalForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make([
                    'md' => 5,
                ])
                    ->schema([
                        Section::make()
                            ->schema([
                                TextInput::make('title')
                                    ->live()
                                    ->maxLength(255)
                                    ->debounce(700)
                                    ->afterStateUpdated(fn (Get $get, Set $set, $state) => $get('slug') ?: $set('slug', Str::slug($state)))
                                    ->required(),
                                TextInput::make('slug')
                                    ->maxLength(255)
                                    ->required(),
                                Textarea::make('description')
                                    ->rows(2)
                                    ->columnSpanFull()
                                    ->maxLength(255),
                                Select::make('url')
                                    ->label('Article Link')
                                    ->options(
                                        fn ($state): array => Article::limit(6)
                                            ->when($state, fn ($q) => $q->where('slug', 'like', "%{$state}%"))
                                            ->orWhere('is_verified', true)
                                            ->pluck('title', 'slug')
                                            ->toArray()
                                    )
                                    ->getSearchResultsUsing(
                                        fn (string $search): array => Article::limit(6)
                                            ->where('title', 'like', "%{$search}%")
                                            ->verified()
                                            ->pluck('title', 'slug')
                                            ->all()
                                    )
                                    ->hidden(fn (Get $get) => $get('is_external'))
                                    ->searchable(),
                                Toggle::make('is_external')
                                    ->label('External')
                                    ->live()
                                    ->inline(false)
                                    ->default(false)
                                    ->columnSpanFull()
                                    ->required(),
                                TextInput::make('url')
                                    ->label('Link')
                                    ->url()
                                    ->visible(fn (Get $get) => $get('is_external'))
                                    ->maxLength(255),
                            ])
                            ->columnSpan(3),
                        Section::make()
                            ->schema([
                                Toggle::make('is_active')
                                    ->inline(false)
                                    ->default(true)
                                    ->label('Active')
                                    ->disabledOn('create')
                                    ->required(),
                                Group::make([
                                    DatePicker::make('start_date'),
                                    DatePicker::make('end_date'),
                                ])->columns(2),
                                TextInput::make('category')
                                    ->maxLength(255),
                                TextInput::make('location')
                                    ->maxLength(255),
                                TextInput::make('time')
                                    ->maxLength(255),
                            ])
                            ->columnSpan(2),
                    ])->columnSpanFull(),
            ]);
    }
}
