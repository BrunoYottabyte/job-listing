<template>
      <span class="bg-neutral-cyan-background-100 text-primary-dark-cyan-100 px-2 py-1 rounded-md ">{{props.badge}}</span>
</template>

<script setup>
    
      import { defineProps } from 'vue'
      
      const props = defineProps({
          badge: Array
      });
</script>