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
      <v-divider></v-divider>
      <!-- tasks subtitle -->
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-list two-line>
              <div> tasks </div>
              <v-list-item v-for="task in tasks" :key="task.id">
                <!-- checkbox -->
                <v-list-item-action>
                  <v-checkbox
                    v-model="task.done"
                    color="green"
                    @change="updateTask(task)"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> {{ task.task }} </v-list-item-title>
                  <v-list-item-subtitle> {{ task.created }} </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon color="red" @click="deleteTask(task)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
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
      },
      tasks: [],
    }
  },

  created () {
    this.getTasks();
  },

  methods: {
    async submit () {
      if (!this.valid) return;
      this.loading = true;
      try {
        await httpClient.post('', {
          task: this.task,
        });
        await this.getTasks();
        this.task = '';
      } catch (error) {
        console.log(error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async getTasks () {
      try {
        const { data } = await httpClient.get('');
        this.tasks = data.body;
      } catch (error) {
        this.error = error.message;
        console.log(error);
      } finally {
        window.scrollTo(0, 0);
      }
    },

    async updateTask (task) {
      try {
        await httpClient.put(`/${task.id}`, {
          ...task,
        });
        await this.getTasks();
      } catch (error) {
        this.error = error.message;
        // go back to previous state
        task.done = !task.done;
        // go to up to page
        window.scrollTo(0, 0);
        console.log(error);
      }
    },

    async deleteTask (task) {
      try {
        await httpClient.delete(`/${task.id}`);
        await this.getTasks();
      } catch (error) {
        this.error = error.message;
        // go to up to page
        window.scrollTo(0, 0);
        console.log(error);
      }
    },
  }
}
</script>
