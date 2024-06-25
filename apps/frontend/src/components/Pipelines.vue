<template>

  <button @click="getData">Get Pipelines</button>

  <input @input="findLeads">
  <button @click="logPipelines">Log Pipelines</button>
  <div v-if="state.pipelines">
    <h1>Воронки</h1>
    <div v-for="pipeline in state.pipelines" :key="pipeline.id">
      <div>
        <a-collapse v-model:activeKey="pipeline.id">
          <a-collapse-panel :key="pipeline.id" :header="pipeline.name">
            <h2>Сделки:</h2>
            <div v-for="lead in pipeline.leads" :key="lead.id">
              <a-collapse v-model:activeKey="lead.id">
                <a-collapse-panel :key="lead.id" :header="lead.name">
                  <a-row>
                    <a-col span="4">
                      <p>Название сделки: </p>
                      <p>{{ lead.name }}</p>
                    </a-col>
                    <a-col span="4">
                      <p>Статус сделки: </p>
                      <p :style="{backgroundColor: lead.status.color }">{{ lead.status.name }}</p>
                    </a-col>
                    <a-col span="4">
                      <p>Дата создания сделки: </p>
                      <p>{{ new Date(lead.created_at).toLocaleDateString('ru-RU') }}</p>
                    </a-col>
                    <a-col span="4">
                      <p>Ответственный пользователь:</p>
                      <p>{{ lead.responsibleUser.name }}
                        <a :href="`mailto:${lead.responsibleUser.email}`"><span role="img" aria-label="mail"
                                                                                class="anticon anticon-mail"><svg
                            focusable="false" class="" data-icon="mail" width="1em" height="1em" fill="currentColor"
                            aria-hidden="true" viewBox="64 64 896 896"><path
                            d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg></span></a>
                      </p>
                    </a-col>
                  </a-row>
                  <div v-if="lead.contacts.length">
                    <h3>Контакты:</h3>
                    <div v-for="contact in lead.contacts" :key="contact.id">
                      <a-collapse v-model:activeKey="contact.id">
                        <a-collapse-panel :key="contact.id" :header="contact.name">
                          <div v-if="contact.phones">
                            <p>Номера телефонов: </p>
                            <div v-for="phone in contact.phones" :key="phone.value">
                              <a :href="`tel:${phone.value}`"><span role="img" aria-label="phone"
                                                                    class="anticon anticon-phone"><svg focusable="false"
                                                                                                       class=""
                                                                                                       data-icon="phone"
                                                                                                       width="1em"
                                                                                                       height="1em"
                                                                                                       fill="currentColor"
                                                                                                       aria-hidden="true"
                                                                                                       viewBox="64 64 896 896"><path
                                  d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 01-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 00-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 00285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"></path></svg></span>{{ phone.value }}</a>
                            </div>
                          </div>
                          <div v-if="contact.emails">
                            <p>Адреса электронной почты: </p>
                            <div v-for="email in contact.emails" :key="email.value">
                              <a :href="`mailto:${email.value}`"><span role="img" aria-label="mail"
                                                                       class="anticon anticon-mail"><svg
                                  focusable="false" class="" data-icon="mail" width="1em" height="1em"
                                  fill="currentColor"
                                  aria-hidden="true" viewBox="64 64 896 896"><path
                                  d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg></span>{{
                                  email.value
                                }}</a>
                            </div>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                  </div>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
  <div v-else>Нет сделок, удовлетворяющих запросу.</div>
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
        getData(event.target.value)
      }
    }

    function logPipelines() {
      console.log(state.pipelines)
    }

    return {
      state, text, activeKey, getData, findLeads, logPipelines
    }
  },

}
</script>