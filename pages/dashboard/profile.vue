<template>
  <v-row align-center column justify-center>
    <v-col md6 sm8 xs12>
      <v-card>
        <v-card-text>
          <p>
            <strong>{{$t('form.name')}}:</strong>
            {{ authenticatedUser.name }}
          </p>
          <p>
            <strong>{{$t('form.email')}}:</strong>
            {{ authenticatedUser.email }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

    import {mapGetters} from 'vuex'

    export default {
        middleware: 'auth',

        computed: {
            ...mapGetters(['authenticatedUser'])
        }

    }
</script>
