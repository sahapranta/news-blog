import React, { useState } from 'react';
import {
    ZoomOutIcon,
    ZoomInIcon,
    Grid3X3Icon,
    Grid2X2Icon,
    SquareIcon,
    MoveRightIcon,
    Download
} from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import HomeLayout from '@/layouts/home-layout';
import { PaperProps } from '@/types/model';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { bnNum } from '@/lib/helpers';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

const MagazineViewPage: React.FC<{ paper: PaperProps }> = ({ paper }) => {
    const [GridSize, setGridSize] = useState("3");

    const GridMap: Record<string, string> = {
        "1": 'lg:grid-cols-1',
        "2": 'lg:grid-cols-2',
        "3": 'lg:grid-cols-3'
    };

    return (
        <HomeLayout>
            <Head>
                <title>{paper.title}</title>
                <meta name="description" content={paper.description} />
                <meta property="og:title" content={paper.title} />
                <meta property="og:description" content={paper.description} />
                <meta property="og:image" content={paper.thumbnail} />
                <meta property="og:url" content={route('paper.show', { paper: paper.slug })} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={paper.title} />
                <meta name="twitter:description" content={paper.description} />
                <meta name="twitter:image" content={paper.thumbnail} />
            </Head>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center border-b-4 border-red-600 pb-4 mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {paper.title || "মাসিক হরেকৃষ্ণ সমাচার"}
                    </h1>
                    <div className="hidden md:flex gap-x-3 items-center">
                        <ToggleGroup type="single" variant="outline" value={GridSize}
                            onValueChange={(value) => value ? setGridSize(value) : null}>
                            <ToggleGroupItem value="1" className={`!outline-0 ${GridSize === "1" ? '!bg-red-100' : ''}`}>
                                <SquareIcon />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="2" className={`!outline-0 ${GridSize === "2" ? '!bg-red-100' : ''}`}>
                                <Grid2X2Icon />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="3" className={`!outline-0 ${GridSize === "3" ? '!bg-red-100' : ''}`}>
                                <Grid3X3Icon />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>

                <div className="mb-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/paper'>Papers</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href='#'>{paper.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <p className='text-gray-600 text-lg mb-8'>{paper?.description}</p>

                <div className='mb-12'>
                    <div>
                        <Link href={route('paper.download', { paper: paper.slug })} className="bg-gradient-to-tr hover:bg-gradient-to-bl from-red-100 via-rose-100 to-white text-red-600 border-red-500 px-6 py-3 rounded-lg font-semibold border transition-colors">
                            <Download className="w-4 h-4 inline mr-2" />
                            ডাউনলোড
                        </Link>
                    </div>

                    <p className='text-gray-500 text-sm mt-6'>* Click any of the image to view in full screen mode or gallery view.</p>
                </div>

                <PhotoProvider toolbarRender={({ onScale, scale }) => {
                    return (
                        <>
                            <ZoomInIcon className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white" onClick={() => onScale(scale + 1)} />
                            <ZoomOutIcon className="w-5 h-5 cursor-pointer ml-2 text-gray-300 hover:text-white" onClick={() => onScale(scale - 1)} />
                        </>
                    );
                }}>
                    <div className={`grid grid-cols-1 gap-8 ${GridMap[GridSize]}`}>
                        {paper?.media?.map((image, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
                                <div className='absolute py-1 px-2 -top-1 left-1 rounded-t-none text-xs rounded-full bg-red-500 text-white'>পৃষ্ঠা {bnNum(index + 1)}</div>
                                <div className="cursor-pointer text-center">
                                    <PhotoView src={image.url} >
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className="w-full object-cover"
                                        />
                                    </PhotoView>
                                </div>
                            </div>
                        ))}
                    </div>
                </PhotoProvider>

                <section className="pt-12 pb-4">
                    <div className="mx-auto max-w-7xl">
                        <div
                            className="lg:py-14 lg:px-20 p-10 rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-violet-600 flex items-center justify-between flex-col lg:flex-row"
                        >
                            <div className="block text-center mb-5 lg:text-left lg:mb-0">
                                <h2
                                    className="font-manrope text-4xl text-white font-semibold mb-5 lg:mb-2"
                                >
                                    সকল পত্রিকা
                                </h2>
                                <p className="text-xl text-indigo-100">
                                    মাসিক হরেকৃষ্ণ সমাচার - পারমার্থিক নবজাগরণের মাসিক বার্তাবহ
                                </p>
                            </div>
                            <Link
                                href={route('paper.index')}
                                className="flex items-center gap-2 bg-white rounded-full shadow-sm text-lg text-indigo-600 font-semibold py-4 px-8 transition-all duration-500"
                            >
                                Check Papers
                                <MoveRightIcon />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </HomeLayout>
    );
};

export default MagazineViewPage;