import IndexComponent from '@/components/Index';
import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import MusicHero from '@/components/shared/Hero';
import Search from '@/components/shared/Search';
import GenreFilter from '@/components/shared/genre-filter';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { getOrders } from '@/lib/actions/order.actions';
import { SearchParamProps } from '@/types/index';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const orders = await getOrders();
  /*const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const genre = (searchParams?.genre as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    genre,
    page,
    limit: 6
  })*/

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain md:h-[50vh] h-[40vh]">
        <IndexComponent searchParams={searchParams} orders={orders} />
      </section>
    </>
  )
}
