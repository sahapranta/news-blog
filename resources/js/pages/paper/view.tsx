import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import HomeLayout from '@/layouts/home-layout';
import { bnNum } from '@/lib/helpers';
import { PaperProps } from '@/types/model';
import { Head, Link } from '@inertiajs/react';
import { Download, Grid2X2Icon, Grid3X3Icon, MoveRightIcon, SquareIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { route } from 'ziggy-js';

const MagazineViewPage: React.FC<{ paper: PaperProps }> = ({ paper }) => {
    const [GridSize, setGridSize] = useState('3');

    const GridMap: Record<string, string> = {
        '1': 'lg:grid-cols-1',
        '2': 'lg:grid-cols-2',
        '3': 'lg:grid-cols-3',
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
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between border-b-4 border-red-600 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">{paper.title || 'মাসিক হরেকৃষ্ণ সমাচার'}</h1>
                    <div className="hidden items-center gap-x-3 md:flex">
                        <ToggleGroup type="single" variant="outline" value={GridSize} onValueChange={(value) => (value ? setGridSize(value) : null)}>
                            <ToggleGroupItem value="1" className={`!outline-0 ${GridSize === '1' ? '!bg-red-100' : ''}`}>
                                <SquareIcon />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="2" className={`!outline-0 ${GridSize === '2' ? '!bg-red-100' : ''}`}>
                                <Grid2X2Icon />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="3" className={`!outline-0 ${GridSize === '3' ? '!bg-red-100' : ''}`}>
                                <Grid3X3Icon />
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>

                <div className="mb-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/paper">Papers</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">{paper.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <p className="mb-8 text-lg text-gray-600">{paper?.description}</p>

                <div className="mb-12">
                    <div>
                        <Link
                            href={route('paper.download', { paper: paper.slug })}
                            className="rounded-lg border border-red-500 bg-gradient-to-tr from-red-100 via-rose-100 to-white px-6 py-3 font-semibold text-red-600 transition-colors hover:bg-gradient-to-bl"
                        >
                            <Download className="mr-2 inline h-4 w-4" />
                            ডাউনলোড
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">* Click any of the image to view in full screen mode or gallery view.</p>
                </div>

                <PhotoProvider
                    toolbarRender={({ onScale, scale }) => {
                        return (
                            <>
                                <ZoomInIcon className="h-5 w-5 cursor-pointer text-gray-300 hover:text-white" onClick={() => onScale(scale + 1)} />
                                <ZoomOutIcon
                                    className="ml-2 h-5 w-5 cursor-pointer text-gray-300 hover:text-white"
                                    onClick={() => onScale(scale - 1)}
                                />
                            </>
                        );
                    }}
                >
                    <div className={`grid grid-cols-1 gap-8 ${GridMap[GridSize]}`}>
                        {paper?.media?.map((image, index) => (
                            <div key={index} className="relative rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
                                <div className="absolute -top-1 left-1 rounded-full rounded-t-none bg-red-500 px-2 py-1 text-xs text-white">
                                    পৃষ্ঠা {bnNum(index + 1)}
                                </div>
                                <div className="cursor-pointer text-center">
                                    <PhotoView src={image.url}>
                                        <img src={image.url} alt={image.name} className="w-full object-cover" />
                                    </PhotoView>
                                </div>
                            </div>
                        ))}
                    </div>
                </PhotoProvider>

                <section className="pt-12 pb-4">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-violet-600 p-10 lg:flex-row lg:px-20 lg:py-14">
                            <div className="mb-5 block text-center lg:mb-0 lg:text-left">
                                <h2 className="font-manrope mb-5 text-4xl font-semibold text-white lg:mb-2">সকল পত্রিকা</h2>
                                <p className="text-xl text-indigo-100">মাসিক হরেকৃষ্ণ সমাচার - পারমার্থিক নবজাগরণের মাসিক বার্তাবহ</p>
                            </div>
                            <Link
                                href={route('paper.index')}
                                className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-sm transition-all duration-500"
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
