import HomeLayout from '@/layouts/home-layout';

const BlankPage = () => {
    return (
        <HomeLayout>
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    {/* <h1 className="text-2xl font-bold text-gray-800">This is a blank page</h1> */}
                    <img src="/images/bkash-system.webp" alt="User" className="" />
                </div>
                <div className="mt-6 text-center text-gray-600">
                    <p>You can use this page to start building your own page.</p>
                </div>
            </main>
        </HomeLayout>
    );
};
export default BlankPage;
