<template>
  <el-form :model="userForm" :rules="rules" @submit.native.prevent ref="userForm" label-width="200px">
    <el-form-item label="Фамилия" prop="lastName">
      <el-input v-model="userForm.lastName"></el-input>
    </el-form-item>
    <el-form-item label="Имя" prop="firstName">
      <el-input v-model="userForm.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Отчество" prop="middleName">
      <el-input v-model="userForm.middleName"></el-input>
    </el-form-item>
    <el-form-item label="Дата рождения" required>
      <el-form-item prop="dateBirth">
        <el-date-picker type="date" placeholder="Выберите дату" format="dd-MM-yyyy" value-format="dd-MM-yyyy" :picker-options="{ firstDayOfWeek: 1 }" v-model="userForm.dateBirth"></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="Пол" prop="gender">
      <el-radio-group v-model="userForm.gender">
        <el-radio label="мужской"></el-radio>
        <el-radio label="женский"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="СНИЛС" prop="snils">
      <el-input v-model="userForm.snils"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('userForm')">{{ editForm ? 'Сохранить изменения' : 'Создать' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  data() {
    let checkSnils = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Это поле обязательно для заполнения'));
      } else if (value.length !== 11 || /[^0-9]/.test(value)) {
        callback(new Error('СНИЛС должен состоять из 11 цифр'));
      } else {
        callback();
      }
    }
    return {
      userForm: {
        firstName: '',
        lastName: '',
        middleName: '',
        dateBirth: '',
        gender: '',
        snils: ''
      },
      rules: {
        firstName: [
          { required: true, message: 'Это поле обязательно для заполнения', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Это поле обязательно для заполнения', trigger: 'blur' }
        ],
        dateBirth: [
          { type: 'string', required: true, message: 'Это поле обязательно для заполнения', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Пожалуйста укажите пол', trigger: 'change' }
        ],
        snils: [
          { validator: checkSnils, trigger: 'blur' }
        ]
      },
      editForm: this.$route.name === 'edit-id'
    };
  },
  methods: {
    ...mapMutations({addUser: 'users/addUser', editUser: 'users/editUser'}),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm) {
            this.editUser(this.userForm)
          } else {
            this.addUser(this.userForm);
          }
          this.$router.push({name: 'index'})
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    ...mapGetters({getCurrentUser: 'users/getCurrentUser'}),
  },
  created() {
    if (this.editForm) {
      this.userForm = {...this.getCurrentUser(+this.$route.params.id)} //Клонируем обьект
    }
  }
}
</script>
