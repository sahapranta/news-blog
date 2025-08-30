import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, AlarmClockCheckIcon } from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { PaginatedResponse } from '@/types';
import { PaginationNav } from '@/components/PaginationNav';
import { Link } from '@inertiajs/react';
import { bnNum } from '@/lib/helpers';

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
        setCurrentDate(prev => {
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

        return festivals.data.filter(event => {
            return event.start_date === dateString;
        });
    };


    const monthNames = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

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
            const events = getEventsForDate(date)
            const hasEvents = events.length > 0;
            const isSelected = selectedDate &&
                date.toDateString() === selectedDate.toDateString();

            days.push(
                <button
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${isSelected
                        ? 'bg-red-600 text-white'
                        : hasEvents ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'hover:bg-gray-100'
                        }`}
                >
                    {hasEvents ?
                        <HoverCard>
                            <HoverCardTrigger>
                                {bnNum(day)}
                                <div className="w-1 h-1 bg-red-600 rounded-full mx-auto mt-1"></div>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">{events[0]?.title}</h4>
                                    <p className="text-sm">
                                        {events[0]?.location}
                                    </p>
                                    <div className="text-muted-foreground text-xs">
                                        {events[0]?.time}
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        : bnNum(day)}
                </button>
            );
        }

        return days;
    };

    const upcomingEvents = festivals.data
        .filter(event => new Date(event.start_date) >= new Date())
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .slice(0, 5);

    const Heading = (<div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-red-600 pb-4 mb-6">
            {/* ইভেন্ট ক্যালেন্ডার */}
            উৎসব ক্যালেন্ডার
        </h1>
        <p className="text-gray-600 text-lg">
            আসন্ন গুরুত্বপূর্ণ উৎসব, সম্মেলন এবং অনুষ্ঠানের তালিকা
        </p>
    </div>);
    return (
        <HomeLayout hasSidebar heading={Heading}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {monthNames[currentDate.getMonth()]} {bnNum(currentDate.getFullYear())}
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => navigateMonth('prev')}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigateMonth('next')}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {dayNames.map(day => (
                            <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {renderCalendar()}
                    </div>
                </div>

                {/* Event Details */}
                <div className="bg-white rounded-lg shadow-sm px-3 py-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pl-3">
                        {selectedDate ? `${bnNum(selectedDate.getDate())} ${monthNames[selectedDate.getMonth()]} এর উৎসব` : 'আসন্ন উৎসব'}
                    </h3>

                    <div className="space-y-4 px-3 overflow-y-auto max-h-80">
                        {(selectedDate ? getEventsForDate(selectedDate) : upcomingEvents).map(event => (
                            <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                                {event.url ?
                                    <Link
                                        href={event.is_external ? event.url : route('article.show', { article: event.url })}
                                        target={event.is_external ? '_blank' : '_self'}
                                        rel={event.is_external ? 'nofollow noopener noreferrer external' : ''}
                                        className="flex items-start justify-between mb-2">
                                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                                        {event.category && <Badge>{event.category}</Badge>}
                                    </Link> : <>
                                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                                        {event.category && <Badge>{event.category}</Badge>}
                                    </>
                                }

                                <p className="text-sm text-gray-600 mb-3">{event.description}</p>

                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(event.start_date).toLocaleDateString('bn-BD')}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center">
                                        <AlarmClockCheckIcon className="w-4 h-4 mr-2" />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* All Events List */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">সকল উৎসব</h3>
                <div className="space-y-4">
                    {festivals.data.map(event => (
                        <div key={event.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                                {event.url ?
                                    <Link
                                        href={event.is_external ? event.url : route('article.show', { article: event.url })}
                                        target={event.is_external ? '_blank' : '_self'}
                                        rel={event.is_external ? 'nofollow noopener noreferrer external' : ''}>
                                        <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                                    </Link> :
                                    <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                                }
                                <p className="text-sm text-gray-600 mb-2 w-[30ch] md:w-[80ch] truncate">{event.description}</p>
                                <div className="flex md:flex-row flex-col md:items-center md:space-x-4 space-y-2 md:space-y-0 text-sm text-gray-500">
                                    {event.start_date &&
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {new Date(event.start_date).toLocaleDateString('bn-BD')}
                                        </span>
                                    }
                                    {event.time &&
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {event.time}
                                        </span>
                                    }
                                    {event.location &&
                                        <span className="flex items-center">
                                            <AlarmClockCheckIcon className="w-4 h-4 mr-1" />
                                            {event.location}
                                        </span>
                                    }
                                </div>
                            </div>
                            {event.category &&
                                <div className="text-right">
                                    <Badge>{event.category}</Badge>
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <div className='mt-6'>
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