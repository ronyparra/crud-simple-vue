<template>
  <v-app>
    <v-app-bar app flat color="#f5f7fc">
      <v-container class="py-0 fill-height">
        <v-responsive max-width="230" class="mr-2" v-if="!isMobile">
          <v-autocomplete
            clearable
            dense
            flat
            placeholder="Filtar"
            hide-details
            color="pink"
            rounded
            solo
          ></v-autocomplete>
        </v-responsive>
        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            placeholder="Buscar"
            hide-details
            color="pink"
            v-model="search"
            append-icon="fa-search"
            rounded
            solo
          ></v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>
        <span v-if="!isMobile" class="font-weight-medium grey--text"
          >Usuarios registrados: {{getUserData.length}}</span
        >
        <v-divider v-if="!isMobile" vertical inset class="mx-3"></v-divider>
        <span v-if="!isMobile" class="font-weight-medium grey--text"
          >Paises: 2</span
        >
      </v-container>
    </v-app-bar>
    <v-main class="bg main">
      <v-container>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="getUserData"
          sort-by="calories"
          class="elevation-1 rounded-xl"
        >
          <template v-slot:top>
            <v-toolbar flat class="rounded-t-xl">
              <v-toolbar-title class="title">Usuarios</v-toolbar-title>

              <v-spacer></v-spacer>

              <FormCrud />
             
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{item}">
     <!--        <ButtonTable icon="fa-edit">Editar</ButtonTable> -->
            <ButtonTable icon="fa-trash-alt" @click="deleteItem(item)">Eliminar</ButtonTable>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import FormCrud from "./views/Crud";
import ButtonTable from "./components/ButtonTable";
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {
    ButtonTable,
    FormCrud,
  },
  data: () => ({
    dialogDelete: false,
    deleteData: null,
    search: '',
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Telefono", value: "phone" },
      { text: "Correo", value: "email" },
      { text: "Pais", value: "country.name" },
      { text: "Ciudad", value: "city.name" },
      { text: "Accion", value: "actions", align: "end", sortable: false },
    ]
  }),

  computed: {
    ...mapGetters('users',['getUserData']),
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    ...mapActions('users',['fetchUsers','deleteUser']),
    deleteItem(item){
      this.deleteUser(item.id)
    }
  },
};
</script>
<style lang="scss" scoped>
.bg {
  background-color: #f5f7fc;
}

.main {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
span {
  font-weight: 500;
}
</style>
