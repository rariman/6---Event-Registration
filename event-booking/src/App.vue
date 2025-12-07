
<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4x1 font-medium">Event Booking App</h1>
    <h2 class="text-2x1 font-medium">All Events</h2>
    <EventList />
    <h2 class="text-2x1 font-medium">Your Bookings</h2>
    <BookingList />
  </main>
</template>

<script setup>
  import EventList from './components/EventList.vue';
  import BookingList from './components/BookingList.vue';
</script>