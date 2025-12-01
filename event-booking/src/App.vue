
<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4x1 font-medium">Event Booking App</h1>
    <h2 class="text-2x1 font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8">
      <EventCard v-for="i in 8" :key="i" title="Vue Conference" when="2024-05-01" description="Conference about Vue" @register="console.log('Registered!')"></EventCard>
    </section>
    <h2 class="text-2x1 font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-8">
      <BookingItem v-for="i in 3" :key="i"/>
    </section>
  </main>
</template>

<script setup>
import BookingItem from './components/BookingItem.vue';
import EventCard from './components/EventCard.vue';
 
</script>