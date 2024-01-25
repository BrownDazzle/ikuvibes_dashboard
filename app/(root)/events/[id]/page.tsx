import AudioPlayer from '@/components/shared/AudioPlayer';
import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import DownloadButton from '@/components/ui/download-button';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types/index'
import { PauseCircleIcon, PlayCircleIcon } from 'lucide-react';
import Image from 'next/image';

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);
  const apiKey = process.env.YOUTUBE_API_KEY;
  const query = event?.title;

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
      <section className="wrapper flex justify-centers bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl py-5">
          {event.category.name === "Music" && (
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={800}
              height={800}
              className="h-full min-h-[300px] max-h-[500px] object-cover object-center rounded-lg"
            />
          )}
          {event.category.name === "Video" && (
            <video src={event.videoUrl} controls className="h-full min-h-[300px] max-h-[500px] object-cover object-center rounded-md" />
          )}

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 ">
                <div className=" flex gap-3">
                  <p className="bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-full my-5">
                    {event.category.name}
                  </p>
                  <p className="bg-slate-500 text-white text-5 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-full my-5">
                    {event.genre.name}
                  </p>
                </div>
                <h2 className='h2-bold'>{event.title}</h2>
                <div className="w-full flex flex-row justify-between mt-5">
                  <p className="p-medium-12 p-medium-15 text-grey-500">
                    Release Date: {formatDateTime(event.createdAt).dateTime}
                  </p>
                  <p className="p-medium-14 p-medium-18 text-grey-500">12.5k Views</p>
                </div>
                {/*<p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span>

  </p>*/} {event.category.name === "Music" && (
                  <audio src={event.audioUrl} controls />
                )}

              </div>
            </div>
            {/* <AudioPlayer audioFile={event as any} />*/}
            <div className="flex flex-col gap-2">
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <DownloadButton />
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related {event.category.name === "Video" ? `${event.category.name}s` : event.category.name}</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default EventDetails