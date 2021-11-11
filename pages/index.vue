<template>
  <div>
    <div v-if="allUsers.length === 0" class="info-text info-text__center">Пациентов нет</div>
    <table v-else class="table">
      <tr>
        <th>ФИО</th>
        <th>СНИЛС</th>
        <th>
            <el-input
              v-model="search"
              size="mini"
              placeholder="Поиск по имени или СНИЛС"/>
        </th>
      </tr>
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{ formatter(user) }}</td>
        <td>{{ user.snils }}</td>
        <td>
          <template>
            <el-button
              size="mini"
              type="primary"
              @click="$router.push({ name: 'user-id', params: { id: user.id } })">Просмотр</el-button>
            <el-button
              size="mini"
              @click="$router.push({ name: 'edit-id', params: { id: user.id } })">Редактировать</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteUser(user.id)">Удалить</el-button>
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from "vuex";
export default {
  async fetch({store}) {
    if (store.getters['users/allUsers'].length === 0) {
      await store.dispatch('users/requestUsers')
      await store.dispatch('consultations/requestConsultations')
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions({requestUsers: 'users/requestUsers'}),
    ...mapMutations({deleteUser: 'users/deleteUser'}),
    formatter(row, col, value, index) {
      return `${row.lastName} ${row.firstName} ${row.middleName}`
    }
  },
  computed: {
    ...mapGetters({allUsers: 'users/allUsers'}),
    filteredUsers() { // Получаем массив пациентов отфильтрованный в соответствии с поисковым запросом
      return this.allUsers.filter(data => !this.search || (`${data.snils} ${data.firstName} ${data.lastName} ${data.middleName}`).toLowerCase().includes(this.search.toLowerCase()))
    }
  }
}
</script>
