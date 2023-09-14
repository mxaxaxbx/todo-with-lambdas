<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title> Tasks </v-card-title>
    <v-card-text>
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-container fluid >
          <v-row justify="center" >
            <v-col cols="12" md="10">
              <v-text-field clearable variant="outlined">
              </v-text-field>
            </v-col>
            <v-col cols="2" md="2">
              <v-btn icon size="small" color="blue" type="submit">
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
  export default {
    data () {
      return {
        valid: false,
      }
    },
  }
</script>
