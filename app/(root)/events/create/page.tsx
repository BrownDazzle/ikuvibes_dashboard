import MusicForm from "@/components/shared/MusicUploader"


const CreateEvent = () => {



  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <MusicForm />
        {/*<EventForm userId={''} type="Create" />*/}
      </div>
    </>
  )
}

export default CreateEvent