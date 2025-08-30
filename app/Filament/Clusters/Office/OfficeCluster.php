<?php

namespace App\Filament\Clusters\Office;

use BackedEnum;
use Filament\Clusters\Cluster;
use Filament\Support\Icons\Heroicon;

class OfficeCluster extends Cluster
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSquares2x2;

    protected static string | \UnitEnum | null $navigationGroup = 'Settings';
}
