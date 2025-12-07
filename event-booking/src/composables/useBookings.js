import { ref } from 'vue';

const bookings = ref([])
const bookingsLoading  = ref(false)
const error = ref(null)

const fetchBookings = async () => {
  bookingsLoading.value = true
  error.value = null
  try{
    const response = await fetch('http://localhost:3001/bookings')
    const data = await response.json()
    bookings.value = data
  }
  catch (e) {
    error.value = e
  }
  finally {
    bookingsLoading.value = false
  }
}

const findBookingById = (bookingId) => {
  return bookings.value.find((booking) => booking.id === bookingId)
}

const handleRegistration = async (event) => {

  if (bookings.value.some((booking) => (booking.eventId === event.id) && (booking.userId === 1))) {
    alert('You have already registered for this event')
    return
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending'
  }

  bookings.value.push(newBooking);

  try{
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...newBooking, status:'confirmed'})
    })

    if (response.ok) {
      const index = findBookingById(newBooking.id)
      bookings.value[index] = await response.json()
    }
    else {
      throw(new Error('Failed to confirm booking'))
    }
  }
  catch (e) {
    console.error('Failed to register for event: ', e) 
    bookings.value = bookings.value.filter((booking) => booking.id !== newBooking.id)  
  }
}

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId)
  const originalBooking = bookings.value[index]
  bookings.value.splice(index, 1)
  error.value = null

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, { method : 'DELETE' } )

    if (!response.ok) {
      throw(new Error('Failed to cancel booking'))
    }
  }
  catch (e) {
    error.value = e
    console.error('Failed to cancel booking: ', e) 
    bookings.value.splice(index, 0, originalBooking)
  }
}

export function useBookings() {
    return {
        bookings,
        bookingsLoading,
        error,
        fetchBookings,
        handleRegistration,
        cancelBooking
    }
}