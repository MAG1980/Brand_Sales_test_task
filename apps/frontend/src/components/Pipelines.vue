<template>
   <input @input="findLeads">
  <button @click="logPipelines">Log Pipelines</button>
</template>

<script>
export default {
  name: 'Pipelines-component',
  data() {
    return {
      pipelines: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(query='') {
      console.log(query)
      const apiDomain = import.meta.env.VITE_API_DOMAIN
      const url = query ==='' ? `${apiDomain}/api/leads` : `${apiDomain}/api/leads?query=${query}`;
      try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        console.log(data.pipelines)
        this.pipelines = data.pipelines
      } catch (error) {
        console.error(error);
      }
    },

    findLeads(event) {
      if(event.target.value.length >2) {
        this.getData(event.target.value)
      }
    },

    logPipelines() {
      console.log(this.pipelines)
    }

  }
}
</script>