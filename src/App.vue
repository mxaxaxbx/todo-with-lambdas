<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title> Tasks </v-card-title>
    <v-card-text>
      <v-form validate-on="submit lazy" @submit.prevent="submit" v-model="valid">
        <v-container fluid >
          <v-row justify="center" >
            <!-- show posible errors -->
            <v-col cols="12" md="12">
              <v-alert type="error" v-if="error" dismissible>
                {{ error }}
              </v-alert>
            </v-col>
            <v-col cols="12" md="10">
              <v-text-field clearable variant="outlined" v-model="task" :rules="rules.task">
              </v-text-field>
            </v-col>
            <v-col cols="2" md="2">
              <v-btn icon size="small" color="blue" type="submit" :loading="loading">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { httpClient } from './http-client';

export default {
  data () {
    return {
      valid: false,
      task: '',
      loading: false,
      error: '',
      rules: {
        task: [
          v => !!v || 'Task is required',
          v => (v && v.length <= 500) || 'Task must be less than 500 characters',
        ],
      }
    }
  },

  methods: {
    async submit () {
      if (!this.valid) return;
      this.loading = true;
      try {
        await httpClient.post('', {
          task: this.task,
        });
        this.task = '';
      } catch (error) {
        console.log(error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>
