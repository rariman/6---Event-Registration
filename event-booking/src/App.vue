
<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4x1 font-medium">Event Booking App</h1>
    <h2 class="text-2x1 font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8" >
      <template v-if="!eventsLoading">
        <EventCard v-for="event in events" :key="event.id" :title="event.title" :when="event.date" :description="event.description" @register="handleRegistration(event)"></EventCard>
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i"/>
      </template>
    </section>
    <h2 class="text-2x1 font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-8">
      <BookingItem v-for="booking in bookings" :key="booking.id"/>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BookingItem from './components/BookingItem.vue';
import EventCard from './components/EventCard.vue';
import LoadingEventCard from './components/LoadingEventCard.vue';

const events = ref([])
const bookings = ref([])
const eventsLoading  = ref(false)
const bookingsLoading  = ref(false)

const fetchEvents = async () => {
  eventsLoading.value = true
  try{
    const response = await fetch('http://localhost:3001/events')
    const data = await response.json()
    events.value = data
  }
  finally {
    eventsLoading.value = false
  }
}

const fetchBookings = async () => {
  bookingsLoading.value = true
  try{
    const response = await fetch('http://localhost:3001/bookings')
    const data = await response.json()
    bookings.value = data
  }
  finally {
    bookingsLoading.value = false
  }
}


const handleRegistration = async (event) =>{
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title
  }

  await fetch('http://localhost:3001/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(...newBooking)
  })
}

onMounted (() => {
  fetchEvents()
  fetchBookings()
})
</script>