import { PaginationNav } from '@/components/PaginationNav';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import HomeLayout from '@/layouts/home-layout';
import { bnNum } from '@/lib/helpers';
import { PaginatedResponse } from '@/types';
import { Link } from '@inertiajs/react';
import { AlarmClockCheckIcon, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import React, { useState } from 'react';

interface FestivalProps {
    id: string;
    title: string;
    short_description: string;
    category: string;
    slug: string;
    description?: string;
    start_date: string;
    end_date: string;
    location: string;
    time: string;
    url: string;
    is_external: boolean;
    image?: string;
    is_active?: boolean;
}

const EventsPage: React.FC<{ festivals: PaginatedResponse<FestivalProps> }> = ({ festivals }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const getEventsForDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        return festivals.data.filter((event) => {
            return event.start_date === dateString;
        });
    };

    const monthNames = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

    const dayNames = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const events = getEventsForDate(date);
            const hasEvents = events.length > 0;
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

            days.push(
                <button
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
                        isSelected ? 'bg-red-600 text-white' : hasEvents ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'hover:bg-gray-100'
                    }`}
                >
                    {hasEvents ? (
                        <HoverCard>
                            <HoverCardTrigger>
                                {bnNum(day)}
                                <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-red-600"></div>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">{events[0]?.title}</h4>
                                    <p className="text-sm">{events[0]?.location}</p>
                                    <div className="text-xs text-muted-foreground">{events[0]?.time}</div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    ) : (
                        bnNum(day)
                    )}
                </button>,
            );
        }

        return days;
    };

    const upcomingEvents = festivals.data
        .filter((event) => new Date(event.start_date) >= new Date())
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .slice(0, 5);

    const Heading = (
        <div className="mb-8">
            <h1 className="mb-6 border-b-4 border-red-600 pb-4 text-3xl font-bold text-gray-900">
                {/* ইভেন্ট ক্যালেন্ডার */}
                উৎসব ক্যালেন্ডার
            </h1>
            <p className="text-lg text-gray-600">আসন্ন গুরুত্বপূর্ণ উৎসব, সম্মেলন এবং অনুষ্ঠানের তালিকা</p>
        </div>
    );
    return (
        <HomeLayout hasSidebar heading={Heading}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Calendar */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {monthNames[currentDate.getMonth()]} {bnNum(currentDate.getFullYear())}
                        </h2>
                        <div className="flex space-x-2">
                            <button onClick={() => navigateMonth('prev')} className="rounded-lg p-2 hover:bg-gray-100">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button onClick={() => navigateMonth('next')} className="rounded-lg p-2 hover:bg-gray-100">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-7 gap-1">
                        {dayNames.map((day) => (
                            <div key={day} className="flex h-10 items-center justify-center text-sm font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                </div>

                {/* Event Details */}
                <div className="rounded-lg bg-white px-3 py-6 shadow-sm">
                    <h3 className="mb-4 pl-3 text-lg font-semibold text-gray-900">
                        {selectedDate ? `${bnNum(selectedDate.getDate())} ${monthNames[selectedDate.getMonth()]} এর উৎসব` : 'আসন্ন উৎসব'}
                    </h3>

                    <div className="max-h-80 space-y-4 overflow-y-auto px-3">
                        {(selectedDate ? getEventsForDate(selectedDate) : upcomingEvents).map((event) => (
                            <div key={event.id} className="rounded-lg border border-gray-200 p-4">
                                {event.url ? (
                                    <Link
                                        href={event.is_external ? event.url : route('article.show', { article: event.url })}
                                        target={event.is_external ? '_blank' : '_self'}
                                        rel={event.is_external ? 'nofollow noopener noreferrer external' : ''}
                                        className="mb-2 flex items-start justify-between"
                                    >
                                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                                        {event.category && <Badge>{event.category}</Badge>}
                                    </Link>
                                ) : (
                                    <>
                                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                                        {event.category && <Badge>{event.category}</Badge>}
                                    </>
                                )}

                                <p className="mb-3 text-sm text-gray-600">{event.description}</p>

                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {new Date(event.start_date).toLocaleDateString('bn-BD')}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center">
                                        <AlarmClockCheckIcon className="mr-2 h-4 w-4" />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* All Events List */}
            <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-xl font-semibold text-gray-900">সকল উৎসব</h3>
                <div className="space-y-4">
                    {festivals.data.map((event) => (
                        <div
                            key={event.id}
                            className="flex items-start justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                        >
                            <div>
                                {event.url ? (
                                    <Link
                                        href={event.is_external ? event.url : route('article.show', { article: event.url })}
                                        target={event.is_external ? '_blank' : '_self'}
                                        rel={event.is_external ? 'nofollow noopener noreferrer external' : ''}
                                    >
                                        <h4 className="mb-1 font-medium text-gray-900">{event.title}</h4>
                                    </Link>
                                ) : (
                                    <h4 className="mb-1 font-medium text-gray-900">{event.title}</h4>
                                )}
                                <p className="mb-2 w-[30ch] truncate text-sm text-gray-600 md:w-[80ch]">{event.description}</p>
                                <div className="flex flex-col space-y-2 text-sm text-gray-500 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                                    {event.start_date && (
                                        <span className="flex items-center">
                                            <Calendar className="mr-1 h-4 w-4" />
                                            {new Date(event.start_date).toLocaleDateString('bn-BD')}
                                        </span>
                                    )}
                                    {event.time && (
                                        <span className="flex items-center">
                                            <Clock className="mr-1 h-4 w-4" />
                                            {event.time}
                                        </span>
                                    )}
                                    {event.location && (
                                        <span className="flex items-center">
                                            <AlarmClockCheckIcon className="mr-1 h-4 w-4" />
                                            {event.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {event.category && (
                                <div className="text-right">
                                    <Badge>{event.category}</Badge>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    {festivals.last_page > 1 && (
                        <PaginationNav
                            currentPage={festivals.current_page}
                            lastPage={festivals.last_page}
                            prevPageUrl={festivals.prev_page_url}
                            nextPageUrl={festivals.next_page_url}
                            links={festivals.links}
                        />
                    )}
                </div>
            </div>
        </HomeLayout>
    );
};

export default EventsPage;
