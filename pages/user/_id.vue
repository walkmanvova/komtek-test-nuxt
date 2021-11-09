<template>
  <div>
    <el-descriptions title="Данные пациента">
      <el-descriptions-item label="ФИО">{{currentUser.lastName}} {{currentUser.firstName}} {{currentUser.middleName}}</el-descriptions-item>
      <el-descriptions-item label="Дата рождения">{{currentUser.dateBirth}}</el-descriptions-item>
      <el-descriptions-item label="Пол">{{currentUser.gender}}</el-descriptions-item>
      <el-descriptions-item label="СНИЛС">{{currentUser.snils}}</el-descriptions-item>
    </el-descriptions>
    <el-row :gutter="20">
      <el-col :span="12">Консультации:</el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button
          size="mini"
          type="success"
          @click="$router.push({ name: 'ConsultationAdd', params: { id: currentUser.id } })">Добавить консультацию</el-button>
      </el-col>
    </el-row>
    <table class="table">
      <tr>
        <th>Дата</th>
        <th>Время</th>
        <th>Симптомы</th>
        <th></th>
      </tr>
      <tr v-for="consultation in currentUserConsultations" :key="consultation.id">
        <td>{{ consultation.date }}</td>
        <td>{{ consultation.time }}</td>
        <td>{{ consultation.symptoms }}</td>
        <td>
          <el-button
            size="mini"
            @click="$router.push({ name: 'consultation-edit-id', params: { id: consultation.id } })">Редактировать</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteConsultation(consultation.id)">Удалить</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";
export default {
  async fetch({store}) {
    if (store.getters['users/allUsers'].length === 0) {
      await store.dispatch('users/requestUsers')
      await store.dispatch('consultations/requestConsultations')
    }
  },
  methods: {
    ...mapMutations({deleteConsultation: 'consultations/deleteConsultation'})
  },
  computed: {
    ...mapGetters({getCurrentUser: 'users/getCurrentUser', getUserConsultations: 'consultations/getUserConsultations'}),
    currentUser() {
      return this.getCurrentUser(+this.$route.params.id)
    },
    currentUserConsultations() {
      return this.getUserConsultations(+this.currentUser.id)
    }
  }
}
</script>
