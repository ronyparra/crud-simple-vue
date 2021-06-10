<template>
  <v-dialog v-model="dialog" max-width="70%" :fullscreen="isMobile">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="pink"
        rounded
        class="mb-2 text-capitalize"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small class="mr-2">fa-save</v-icon>
        Registrar
      </v-btn>
    </template>
    <v-card class="rounded-xl fill-height">
      <v-row class="ma-0 rounded-xl fill-height justify-center ">
        <v-col
          v-if="!isMobile"
          cols="12"
          sm="4"
          class="bg rounded-l-xl  d-flex flex-column justify-center align-center"
        >
          <v-img
            max-width="70%"
            max-height="50%"
            :src="require('../assets/notelist.svg')"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8">
          <v-container>
            <v-form ref="form">
              <v-row dense>
                <v-col cols="12" class="my-3">
                  <div class="title text-h5">
                    Registrar nuevo usuario
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <TextField v-model="form.name" :rules="rulesName"
                    >Nombre</TextField
                  >
                </v-col>
                <v-col cols="12" sm="6">
                  <Autocomplete
                    v-model="form.country"
                    returnObject
                    :rules="rulesCountry"
                    :items="getCountry"
                    item-text="name"
                    item-value="id"
                    >Pais</Autocomplete
                  >
                </v-col>
                <v-col cols="12" sm="6">
                  <Autocomplete
                    v-model="form.city"
                    :rules="rules"
                    returnObject
                    :items="listCity"
                    item-text="name"
                    item-value="idCity"
                    >Ciudad</Autocomplete
                  >
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="d-flex flex-row justify-center align-center"
                >
                  <TextField
                    style="width: 100%"
                    :prefix="phoneCode"
                    v-model="form.phone"
                    :readonly="phoneCode === null"
                    type="number"
                    :rules="rulesPhone"
                    >Telefono</TextField
                  >

                  <v-icon
                    :color="isValidNumberPhone ? 'green' : 'red'"
                    class="ml-3 mr-1 mt-n2"
                    >{{
                      isValidNumberPhone ? "fas fa-check" : "fas fa-times"
                    }}</v-icon
                  >
                </v-col>
                <v-col cols="12">
                  <TextField v-model="form.email" :rules="rulesMail"
                    >Correo</TextField
                  >
                </v-col>
              </v-row>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" @click="dialog = false" text rounded
                >Cancelar</v-btn
              >
              <v-btn rounded color="pink" dark @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-container>
        </v-col>
      </v-row>
      <Message v-model="message">Operacion exitosa!</Message>
    </v-card>
  </v-dialog>
</template>
<script>
import TextField from "../components/TextField.vue";
import Autocomplete from "../components/Autocomplete.vue";
import Message from "../components/Message.vue";
import { mapActions, mapGetters } from "vuex";
import { isValidNumber } from "libphonenumber-js";
export default {
  components: {
    TextField,
    Message,
    Autocomplete,
  },
  data: () => ({
    rules: [(v) => !!v || "Obligatorio"],
    rulesCountry: [(v) => !!v.id || "Obligatorio"],
    rulesName: [
      (v) => !!v || "Obligatorio",
      (v) => v.length < 40 || "Limite de 40 caracteres",
    ],
    rulesPhone: [],
    rulesMail: [
      (v) => !!v || "Obligatorio",
      (v) => v.length < 255 || "Limite de 255 caracteres",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Email invalido",
    ],
    message: false,
    dialog: false,
    form: {
      name: "",
      country: {
        name: null,
        id: null,
      },
      city: {
        idCity: null,
        name: null,
      },
      phoneCode: null,
      phone: null,
      email: "",
    },
    default: {
      name: "",
      country: {
        name: null,
        id: null,
      },
      city: {
        idCity: null,
        name: null,
      },
      phoneCode: null,
      phone: null,
      email: "",
    },
  }),
  mounted() {
    this.rulesPhone = [
      (v) => !!v || "Obligatorio",
      () => this.isValidNumberPhone || "Numero invalido",
    ];
  },
  computed: {
    ...mapGetters("country", ["getCountry", "getCity"]),
    listCity() {
      return this.getCity(this.form.country.id);
    },
    phoneCode() {
      return this.form.country.phone_code || null;
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
    isValidNumberPhone() {
      const number = this.phoneCode + "" + this.form.phone;
      return isValidNumber(number, this.form.country.code);
    },
  },
  methods: {
    ...mapActions("users", ["createUser"]),
    async save() {
      if (!this.$refs.form.validate()) return null;
      this.createUser(this.form);
      this.message = true;
      this.reset();
    },
    reset() {
      this.form = JSON.parse(JSON.stringify(this.default));
      this.$refs.form.resetValidation();
    },
  },
};
</script>
