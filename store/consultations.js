import axios from "axios";
export default {
  state() {
    return {
      consultations: [],
      consultationsLoaded: false
    }
  },
  actions: {
    async requestConsultations(ctx) {
      try {
        const response = await axios.get('https://my-json-server.typicode.com/walkmanvova/komtek-test/consultations');
        const result = await response.data;
        ctx.commit('updateConsultations', result)
        ctx.commit('consultationsLoadedChange')
      } catch (error) {
        console.log('error:', error)
      }
    }
  },
  mutations: {
    updateConsultations(state, consultations) {
      state.consultations = consultations
    },
    consultationsLoadedChange(state) {
      state.consultationsLoaded = true
    },
    deleteConsultation(state, consultationId) {
      state.consultations = state.consultations.filter(consultation => consultation.id !== consultationId)
    },
    addConsultation(state, newConsultation) {
      newConsultation.id = Math.max(...state.consultations.map(i => i.id)) + 1;
      state.consultations.push(newConsultation)
    }
  },
  getters: {
    allConsultations(state) {
      return state.consultations
    },
    consultationsLoaded(state) {
      return state.consultationsLoaded
    },
    getCurrentConsultation: state => consultationId => {
      return state.consultations.find(item => item.id === consultationId)
    },
    getUserConsultations: state => userId => {
      return state.consultations.filter(consultation => consultation.userId === userId)
    }
  }
}
