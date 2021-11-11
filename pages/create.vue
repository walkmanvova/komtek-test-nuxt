<template>
  <UserForm />
</template>

<script>
import UserForm from '@/components/UserForm'
export default {
  components: {
    UserForm
  },
  async fetch({store}) {
    if (store.getters['users/allUsers'].length === 0) {
      await store.dispatch('users/requestUsers')
      await store.dispatch('consultations/requestConsultations')
    }
  }
}
</script>

