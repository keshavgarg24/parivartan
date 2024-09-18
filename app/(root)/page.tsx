import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
<section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 flex items-center justify-center">
  <div className="wrapper grid grid-cols-1 gap-5 text-center">
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="text-lg md:text-xl font-normal mb-2">
        DSW, CGC Landran presents
      </div>
      <div className="text-6xl md:text-9xl font-extrabold mb-2">
        "PARIVARTAN"
      </div>
      <p className="text-base md:text-lg font-normal text-gray-600 mb-4">
        This platform features various events, and you can register for those events easily. 
        Explore the events and take part in the ones that interest you!
      </p>
      <Button size="lg" asChild className="button w-full sm:w-fit">
        <Link href="#events">
          Explore Now
        </Link>
      </Button>
    </div>
  </div>
</section>




      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Find the Events that you may like</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  )
}