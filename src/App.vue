<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title> Tasks </v-card-title>
    <v-card-text>
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-container fluid >
          <v-row justify="center" >
            <!-- show posible errors -->
            <v-col cols="12" md="12">
              <v-alert type="error" v-if="error" dismissible>
                {{ error }}
              </v-alert>
            </v-col>
            <v-col cols="12" md="10">
              <v-text-field clearable variant="outlined" v-model="task">
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
    }
  },

  methods: {
    async submit () {
      this.loading = true;
      try {
        const res = await httpClient.post('', {
          task: this.task,
        });
        this.task = '';
        console.log('res',res);
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
