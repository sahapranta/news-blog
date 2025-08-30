import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { api } from '@/hooks/use-api';
import HomeLayout from '@/layouts/home-layout';
import { PaperProps } from '@/types/model';
import { Head } from '@inertiajs/react';
import { CirclePlayIcon, FileDown, HardDriveDownloadIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const PaperDownloadPage: React.FC<{ paper: PaperProps }> = ({ paper }) => {
    const [loading, setLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');
    // const [directDownload, setDirectDownload] = useState(false)

    const getLink = async () => {
        try {
            const { data }: { data: { url: string } } = await api.post(
                route('api.paper.download.link', {
                    paper: paper.slug,
                }),
            );
            setDownloadUrl(data.url);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!downloadUrl) {
            toast.error('Something went wrong, please try again later.');
            return;
        }
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${paper.title}.pdf`;
        link.click();
    };

    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Head>
                    <title>{`Download - ${paper.title}`}</title>
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
                <div className="mb-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('paper.index')}>Papers</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('paper.show', { paper: paper.slug })}>{paper.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Download</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="relative isolate overflow-hidden bg-white">
                    <div className="px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Preparing download...</h2>

                            <div className="mx-auto mt-6 mb-2 flex max-w-sm items-center justify-center rounded-xl border p-2 shadow-inner">
                                <FileDown />
                                <span className="ml-2 font-mono text-lg text-pretty text-gray-600"> {paper.title}.pdf</span>
                            </div>

                            {!downloadUrl && !loading ? (
                                <Button className="my-4 rounded-xl bg-red-600 px-8 text-white hover:bg-red-700" onClick={getLink}>
                                    <CirclePlayIcon />
                                    Generate Link
                                </Button>
                            ) : (
                                <div className="mt-4 flex flex-col items-center space-y-4 text-center">
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-10 w-10 animate-spin text-red-500" />
                                            <p className="text-gray-600">Please wait while we prepare your file</p>
                                        </>
                                    ) : (
                                        <>
                                            <FileDown className="h-12 w-12 text-red-500" />
                                            <p className="text-gray-700">Your file is ready!</p>
                                            <Button className="rounded-xl bg-red-600 px-8 text-white hover:bg-red-700" onClick={handleDownload}>
                                                <HardDriveDownloadIcon />
                                                Download PDF
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
};

export default PaperDownloadPage;
