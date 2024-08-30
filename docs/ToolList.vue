<template>
  <div class="container">
    <div class="filters">
      <select v-model="typeFilter">
        <option value="">All Types</option>
        <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <select v-model="pricingFilter">
        <option value="">All Pricing</option>
        <option v-for="pricing in uniquePricing" :key="pricing" :value="pricing">{{ pricing }}</option>
      </select>
      <select v-model="tagFilter">
        <option value="">All Tags</option>
        <option v-for="tag in uniqueTags" :key="tag" :value="tag">#{{ tag }}</option>
      </select>
    </div>
    <div class="tool-grid">
      <div v-for="tool in filteredTools" :key="tool.id" class="tool-card">
        <div class="tool-header">
          <img :src="getLogoUrl(tool.website)" :alt="tool.name + ' logo'" class="tool-logo">
          <div class="tool-title">
            <h3>{{ tool.name }}</h3>
          </div>
        </div>
        <p class="tool-pricing">{{ tool.pricing }}</p>
        <p class="tool-description">{{ tool.description }}</p>
        <div class="tool-tags">
          <span v-for="tag in tool.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
        <div class="tool-footer">
          <a :href="tool.website" target="_blank" rel="noopener noreferrer" class="visit-btn">Visit <span class="arrow">↗</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const tools = ref([])
    const typeFilter = ref('')
    const pricingFilter = ref('')
    const tagFilter = ref('')

    onMounted(async () => {
      try {
        const response = await fetch('/tools.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        tools.value = data
        console.log('Tools data fetched:', tools.value)
      } catch (error) {
        console.error('Failed to fetch tools:', error)
      }
    })

    const uniqueTypes = computed(() => [...new Set(tools.value.map(tool => tool.type))])
    const uniquePricing = computed(() => [...new Set(tools.value.map(tool => tool.pricing))])
    const uniqueTags = computed(() => [...new Set(tools.value.flatMap(tool => tool.tags))])

    const filteredTools = computed(() => {
      return tools.value.filter(tool => {
        const matchesType = !typeFilter.value || tool.type === typeFilter.value
        const matchesPricing = !pricingFilter.value || tool.pricing === pricingFilter.value
        const matchesTag = !tagFilter.value || tool.tags.includes(tagFilter.value)
        return matchesType && matchesPricing && matchesTag
      })
    })

    const getLogoUrl = (website) => {
      const domain = new URL(website).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    }

    return {
      filteredTools,
      typeFilter,
      pricingFilter,
      tagFilter,
      uniqueTypes,
      uniquePricing,
      uniqueTags,
      getLogoUrl
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
 
}

select {
  padding: 10px;
  flex: 1;
  min-width: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: transparent;
}

select option{
  color: #333;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.tool-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tool-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.tool-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.tool-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-right: 12px;
}

.tool-title h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.tool-pricing {
  font-weight: bold;
  margin-bottom: 8px;
  color: #007bff;
}

.tool-description {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 12px;
  color: #555;
}

.tool-tags {
  margin-bottom: 12px;
}

.tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  margin-right: 6px;
  margin-bottom: 6px;
}

.tool-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.visit-btn {
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.visit-btn:hover {
  background-color: #0056b3;
}

.arrow {
  font-size: 12px;
  margin-left: 4px;
}

@media (max-width: 1024px) {
  .tool-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }

  .tool-card {
    padding: 12px;
  }

  .tool-logo {
    width: 40px;
    height: 40px;
  }

  .tool-title h3 {
    font-size: 16px;
  }

  .tool-description {
    font-size: 12px;
  }
}
</style>