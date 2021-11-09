<template>
  <el-form :model="consultationForm" :rules="rules" @submit.native.prevent ref="consultationForm" label-width="200px">
    <el-form-item label="Дата консультации" required>
      <el-form-item prop="date">
        <el-date-picker type="date" placeholder="Выберите дату" format="dd-MM-yyyy" value-format="dd-MM-yyyy" :picker-options="{ firstDayOfWeek: 1 }" v-model="consultationForm.date"></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="Время консультаци" required>
      <el-form-item prop="time">
        <el-time-select placeholder="Выберите время" v-model="consultationForm.time" :picker-options="{start: '10:00', step: '00:30', end: '21:00'}"></el-time-select>
      </el-form-item>
    </el-form-item>
    <el-form-item label="Симптомы" prop="symptoms">
      <el-input v-model="consultationForm.symptoms"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('consultationForm')">{{ editForm ? 'Сохранить изменения' : 'Создать' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";
export default {
  data() {
    return {
      consultationForm: {
        date: '',
        time: '',
        symptoms: '',
      },
      rules: {
        date: [
          { type: 'string', required: true, message: 'Это поле обязательно для заполнения', trigger: 'change' }
        ],
        time: [
          { type: 'string', required: true, message: 'Это поле обязательно для заполнения', trigger: 'change' }
        ]
      },
      editForm: this.$route.name === 'ConsultationEdit',
      userId: ''
    }
  },
  methods: {
    ...mapMutations({addConsultation: 'consultations/addConsultation'}),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm) {
            this.$router.push({name: 'User', params: { id: this.consultationForm.userId }})
          } else {
            this.consultationForm.userId = +this.$route.params.id;
            this.addConsultation(this.consultationForm);
            this.$router.push({name: 'User', params: { id: +this.$route.params.id }});
          }
        } else {
          return false;
        }
      });
    }
  },
  computed: {
  ...mapGetters({getCurrentConsultation: 'consultations/getCurrentConsultation'}),
  },
  created() {
    if (this.editForm) {
      this.consultationForm = this.getCurrentConsultation(+this.$route.params.id);
    }
  }
}
</script>
