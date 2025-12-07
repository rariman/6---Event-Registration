<template>
    <template v-if="error">
        <SectionCard>
            <div class="space-y-4 items-center flex flex-col">
                <div class="text-red-500">Could not load events at the moment. Please try again.</div>
                <div>
                    <RoundButton @click="fetchEvents">Retry now</RoundButton>
                </div>
            </div>
        </SectionCard>
    </template>
    <template v-else>
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-8" >
            <template v-if="!eventsLoading">
                <template v-if="events.length">
                    <EventCard v-for="event in events" 
                                :key="event.id" 
                                :title="event.title" 
                                :when="event.date" 
                                :description="event.description" 
                                @register="$emit('register', event)"></EventCard>
                </template>
                <template v-else>
                    <div class="col-span-2 text-center">
                        <p>No events yet.</p>
                    </div>
                </template>
            </template>
            <template v-else>
                <LoadingEventCard v-for="i in 4" :key="i"/>
            </template>
        </section>
    </template>
</template>

<script setup>
    import EventCard from './EventCard.vue';
    import LoadingEventCard from './LoadingEventCard.vue';    
    import { ref, onMounted } from 'vue';
import SectionCard from './SectionCard.vue';
import RoundButton from './RoundButton.vue';

    defineEmits(['register'])

    const events = ref([])
    const eventsLoading  = ref(false)
    const error = ref(null)

    const fetchEvents = async () => {
        eventsLoading.value = true
        error.value = null
        try {
            const response = await fetch('http://localhost:3001/events')
            const data = await response.json()
            events.value = data
        }
        catch (err) {
            error.value = err
        }
        finally {
            eventsLoading.value = false
        }
    }

    onMounted (() => {
        fetchEvents()
    })
    
</script>