<template>
    <div>
      <p>Tools Listed Here: {{ toolCount }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    name: 'ToolCount',
    setup() {
      const toolCount = ref(0)
  
      onMounted(async () => {
        try {
          const response = await fetch('/tools.json')
          const tools = await response.json()
          toolCount.value = tools.length
        } catch (error) {
          console.error('Error fetching tools:', error)
        }
      })
  
      return { toolCount }
    }
  }
  </script>