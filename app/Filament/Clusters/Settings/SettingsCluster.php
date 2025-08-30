<?php

namespace App\Filament\Clusters\Settings;

use Filament\Clusters\Cluster;

class SettingsCluster extends Cluster
{
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-squares-2x2';

    protected static string | \UnitEnum | null $navigationGroup = 'Settings';
    
    protected static ?string $navigationLabel = 'Frontend Setup';
}
