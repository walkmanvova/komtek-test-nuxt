<template>
  <ConsultationForm />
</template>

<script>
import ConsultationForm from '@/components/ConsultationForm'
export default {
  components: {
    ConsultationForm
  },
  async fetch({store}) {
    if (store.getters['consultations/allConsultations'].length === 0) {
      await store.dispatch('users/requestUsers')
      await store.dispatch('consultations/requestConsultations')
    }
  },
}
</script>
