<section class="text-gray-600 body-font">
    <div class="container px-5 py-6 mx-auto">
        <div class="text-center mb-6">
            @if ($title)
                <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                    {{ $title }}
                </h1>
            @endif
            @if ($description)
                <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">{{ $description }}</p>
            @endif
        </div>
        @if ($items)
            @php
                $column = match ($column_count) {
                    1, '1' => '',
                    2, '2' => 'sm:w-1/2',
                    3, '3' => 'sm:w-1/3',
                    4, '4' => 'sm:w-1/4',
                    5, '5' => 'sm:w-1/5',
                    6, '6' => 'sm:w-1/6',
                    7, '7' => 'sm:w-1/7',
                    8, '8' => 'sm:w-1/8',
                    default => '',
                };
            @endphp
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                @foreach ($items as $item)
                    <div @class(['p-2 w-full', $column])>
                        <div class="bg-red-50 rounded-md flex py-2 px-4 h-full items-center">
                            <div class="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                            <span class="title-font font-medium">{{ $item }}</span>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
        @if ($button_link)
            <div class="flex justify-center">
                <a href="{{ $button_link }}" target="_blank" rel="noopener noreferrer"
                    class="flex mx-auto mt-6 no-underline text-white bg-red-500 border-0 py-2 px-8 focus:outline-0 hover:bg-red-600 rounded">
                    {{ $button_text }}
                </a>
            </div>
        @endif
    </div>
</section>
