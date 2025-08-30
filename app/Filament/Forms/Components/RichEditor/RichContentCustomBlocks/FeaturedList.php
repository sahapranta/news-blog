<?php

namespace App\Filament\Forms\Components\RichEditor\RichContentCustomBlocks;

use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor\RichContentCustomBlock;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;

class FeaturedList extends RichContentCustomBlock
{
    public static function getId(): string
    {
        return 'featured_list';
    }

    public static function getLabel(): string
    {
        return 'Featured List';
    }

    public static function configureEditorAction(Action $action): Action
    {
        return $action
            ->modalDescription('Configure the featured list')
            ->schema([
                TextInput::make('title')
                    ->label('Title')
                    ->required(),
                TextInput::make('description')
                    ->label('Description')
                    ->nullable(),
                Group::make([
                    TextInput::make('button_text')
                        ->label('Button text')
                        ->default('Learn More')
                        ->required()
                        ->columnSpan(1),
                    TextInput::make('button_link')
                        ->label('Button link')
                        ->url()
                        ->default('#')
                        ->required()
                        ->columnSpan(2),
                ])->columns(3),
                Group::make([
                    Select::make('column_count')
                        ->options([
                            1 => '1 column',
                            2 => '2 column',
                            3 => '3 column',
                            4 => '4 column',
                            5 => '5 column',
                            6 => '6 column',
                            7 => '7 column',
                            8 => '8 column',
                        ])
                        ->label('Column count')
                        ->default(3),
                ])->columns(3),
                Repeater::make('items')
                    ->label('Items')
                    ->required()
                    ->simple(
                        TextInput::make('title')
                            ->label('Title')
                            ->required(),
                    ),
            ]);
    }

    public static function toPreviewHtml(array $config): string
    {
        return view('filament.forms.components.rich-editor.rich-content-custom-blocks.featured-list.preview', [
            'title' => data_get($config, 'title', ''),
            'description' => data_get($config, 'description', ''),
            'button_text' => data_get($config, 'button_text', ''),
            'button_link' => data_get($config, 'button_link', ''),
            'column_count' => data_get($config, 'column_count', 3),
            'items' => data_get($config, 'items', []),
        ])->render();
    }

    public static function toHtml(array $config, array $data): string
    {
        return view('filament.forms.components.rich-editor.rich-content-custom-blocks.featured-list.index', [
            'title' => data_get($config, 'title', ''),
            'description' => data_get($config, 'description', ''),
            'button_text' => data_get($config, 'button_text', ''),
            'button_link' => data_get($config, 'button_link', ''),
            'column_count' => data_get($config, 'column_count', 3),
            'items' => data_get($config, 'items', []),
        ])->render();
    }
}
