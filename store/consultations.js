import axios from "axios";
export default {
  state() {
    return {
      consultations: []
    }
  },
  actions: {
    async requestConsultations(ctx) {
      try {
        const response = await axios.get('https://my-json-server.typicode.com/walkmanvova/komtek-test/consultations');
        const result = await response.data;
        ctx.commit('updateConsultations', result)
      } catch (error) {
        console.log('error:', error)
      }
    }
  },
  mutations: {
    updateConsultations(state, consultations) {
      state.consultations = consultations
    },
    deleteConsultation(state, consultationId) {
      state.consultations = state.consultations.filter(consultation => consultation.id !== consultationId)
    },
    addConsultation(state, newConsultation) {
      newConsultation.id = Math.max(...state.consultations.map(i => i.id)) + 1;
      state.consultations.push(newConsultation)
    },
    editConsultation(state, editableConsultation) {
      state.consultations.forEach(function(consultation, i, arr) {
        if(consultation.id === editableConsultation.id) {
          state.consultations[i] = editableConsultation
        }
      })
    }
  },
  getters: {
    allConsultations(state) {
      return state.consultations
    },
    getCurrentConsultation: state => consultationId => {
      return state.consultations.find(item => item.id === consultationId)
    },
    getUserConsultations: state => userId => {
      return state.consultations.filter(consultation => consultation.userId === userId)
    }
  }
}
