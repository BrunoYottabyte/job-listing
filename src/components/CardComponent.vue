<template>
    <main class="w-[70vw] sm:w-[90vw] h-[140px] shadow-lg bg-white rounded-md px-10 md:h-auto md:py-8 md:pt-10 relative flex items-center ">
        <span v-if="props.card.featured" class="bg-primary-dark-cyan-100 absolute w-1 h-full left-0 top-0 md:rounded-l-full"></span>
        <div class="flex justify-between flex-1 gap-4 md:flex-col">
            <div class="flex gap-8 items-center relative">
                <img class="h-max md:absolute md:h-[60px] md:-top-[70px]" :src="require(`../assets/images/${props.card.logo}`)" :alt="`${props.card.logo}`">
                <div class="flex flex-col md:gap-2 justify-around">
                    <div>
                        <span class="text-primary-dark-cyan-100 text-lg font-bold">{{props.card.company}}</span>
                        <div class="inline ml-4">
                            <span class="bg-primary-dark-cyan-100 text-white px-2 py-1 rounded-full text-sm md:text-base" v-if="props.card.new">NEW!</span>
                            <span
                                class="ml-2 bg-neutral-very-dark-cyan-100 text-white px-2 py-1 rounded-full text-sm md:text-base" v-if="props.card.featured">FEATURED</span>
                        </div>
                    </div>
                    <h1 class="font-bold text-xl">{{props.card.position}}</h1>
                    <div class="flex gap-4 items-center">
                        <span class="text-neutral-400">{{props.card.postedAt}}</span>
                        <span class="w-1 h-1 rounded-full bg-neutral-400"></span>
                        <span class="text-neutral-400">{{props.card.contract}}</span>
                        <span class="w-1 h-1 rounded-full bg-neutral-400"></span>
                        <span class="text-neutral-400">{{props.card.location}}</span>
                    </div>
                </div>
            </div>

            <div class="md:pt-4  flex items-center gap-4 flex-wrap justify-end md:justify-start relative">
                <span class="md:block hidden h-[0.05rem] w-full absolute top-0 left-0 bg-neutral-300"></span>
                <BadgeComponent 
                    :class="` ${languages.includes(badge) ? 'bg-primary-dark-cyan-100 text-white'  : ''}
                    hover:bg-primary-dark-cyan-100 hover:text-white duration-300 cursor-pointer`" 
                    v-for="badge in props.card.languages" 
                    :key="badge"  
                    :badge="badge"
                    @click="$emit('emitChildren', badge)"
                 />

                 <BadgeComponent 
                    :class="`${languages.includes(badge) ? 'bg-primary-dark-cyan-100 text-white'  : ''}
                    hover:bg-primary-dark-cyan-100 hover:text-white duration-300 cursor-pointer`" 
                    v-for="badge in props.card.tools" 
                    :key="badge"  
                    :badge="badge"
                    @click="$emit('emitChildren', badge)"
                 />

            </div>
        </div>

    </main>
</template>

<script setup>
    
import { defineProps, onBeforeMount } from 'vue'
import BadgeComponent from './BadgeComponent.vue'

const props = defineProps({
    card: Array,
    languages: Array
});

onBeforeMount(() => {
   

})


</script>