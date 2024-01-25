import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { Heart } from 'lucide-react'

type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {

  //const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-auto w-full max-w-[600px] flex-row overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <Link
        href={`/events/${event._id}`}
        className=" bg-gray-50  text-grey-500 w-200 h-full">
        <Image src={event.imageUrl} alt="edit" width={160} height={160} />
      </Link>
      {/* IS EVENT CREATOR ... */}
      <div className='flex flex-col w-full'>
        {!hidePrice && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
            <Link href={`/events/${event._id}/update`}>
              <Heart width={20} height={20} />
              {/*<Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />*/}
            </Link>
          </div>
        )}
        <div
          className="flex min-h-auto flex-col gap-2 p-5 md:gap-3"
        >
          {!hidePrice && <div className="flex gap-2">
            <p className="p-bold-14 w-min rounded-full bg-black px-4 py-1 text-white line-clamp-1">
              {event.category.name}
            </p>
            <p className="p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-green-60 line-clamp-1">
              {event.genre.name}
            </p>
          </div>}
          <Link href={`/events/${event._id}`}>
            <p className="p-medium-15 md:p-medium-18 line-clamp-2 flex-1 text-black">{event.title}</p>
          </Link>

          <div className="w-full flex flex-row justify-between">
            <p className="p-medium-12 p-medium-15 text-grey-500">
              Release Date: {formatDateTime(event.createdAt).dateTime}
            </p>
            <p className="p-medium-12 p-medium-15 text-grey-500">12.5k Views</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card