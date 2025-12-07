<template>
    <template v-if="error">
        <ErrorCard :retry="fetchBookings">Failed to fetch bookings</ErrorCard>
    </template>
    <template v-else>
        <section class="grid grid-cols-1 gap-8">
        <template v-if="!bookingsLoading">
            <BookingItem v-for="booking in bookings" :key="booking.id" :title="booking.eventTitle" :status="booking.status" @cancelled="cancelBooking(booking.id)"/>
        </template>
        <template v-else>
            <LoadingBookingItem v-for="i in 4" :key="i"/>
        </template>
        </section>
    </template>
</template>

<script setup>
    import { onMounted } from 'vue';
    import BookingItem from './BookingItem.vue';
    import LoadingBookingItem from './LoadingBookingItem.vue';
    import ErrorCard from './ErrorCard.vue';
    import { useBookings } from '../composables/useBookings';

    const {bookings, cancelBooking, fetchBookings, error} = useBookings();

    onMounted(() =>{
        fetchBookings();
    })
</script>