<template>
  <div v-for="pipeline in state.pipelines" :key="pipeline.id">
    <h2>Pipeline: {{ pipeline.name }}</h2>
    <div v-for="lead in pipeline.leads" :key="lead.id">
      <p>Название сделки: {{ lead.name }}</p>
      <p :style="{backgroundColor: lead.status.color }">Статус сделки: {{ lead.status.name }}</p>
      <p>Дата создания сделки: {{ lead.created_at }}</p>
      <div v-for="contact in lead.contacts" :key="contact.id">
        <h3>Контакт:</h3>
        <p>Имя: {{ contact.name }}</p>
        <p>Номера телефонов: </p>
        <div v-for="phone in contact.phones" :key="phone.value">
          <p>{{ phone.value }}</p>
        </div>
        <p>Адреса электронной почты: </p>
        <div v-for="email in contact.emails" :key="email.value">
          <p>{{ email.value }}</p>
        </div>
      </div>
    </div>
  </div>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>

  <button @click="getData">Get Pipelines</button>

  <input @input="findLeads">
  <button @click="logPipelines">Log Pipelines</button>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { PipelineEntity } from '@backend/lead/entities/pipeline.entity';

export default {
  name: 'Pipelines-component',
  setup() {
    const state = reactive({
      pipelines: [PipelineEntity],
      error: null,
      isLoading: false
    })
    const activeKey = ref(['1']);
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`

    watch(activeKey, val => {
      console.log(val);
    });

    onMounted(async () => {
      await getData('')
      console.log('mounted!')
    });

    async function getData(query = '') {
      console.log(query)
      const apiDomain = import.meta.env.VITE_API_DOMAIN
      const url = query === '' ? `${ apiDomain }/api/leads` : `${ apiDomain }/api/leads?query=${ query }`;
      try {
        state.isLoading = true
        const response = await fetch(`${ url }`);
        const data = await response.json();
        console.log(data.pipelines)
        state.pipelines = data.pipelines
      } catch ( error ) {
        console.error(error);
      } finally {
        state.isLoading = false
      }
    }

    function findLeads(event) {
      if ( event.target.value.length > 2 ) {
        this.getData(event.target.value)
      }
    }

    function logPipelines() {
      console.log(this.pipelines)
    }

    return {
      state, text, activeKey, getData, findLeads, logPipelines
    }
  },

}
</script>