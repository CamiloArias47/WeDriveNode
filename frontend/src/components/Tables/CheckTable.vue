<template>
  <div>
    <md-table v-model="sources" :table-header-color="tableHeaderColor" md-sort="id" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Item" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Barrio" md-sort-by="barrio">{{ item.barrio }}</md-table-cell>
        <md-table-cell md-label="Ciudad" md-sort-by="ciudad">{{ item.city }}</md-table-cell>
        <md-table-cell md-label="Ubicación" md-sort-by="ubicacion">{{ item.location }}</md-table-cell>
        <md-table-cell md-label="Acciones">
          <md-button class="md-just-icon md-simple md-primary" v-on:click="onConfirmApprove()">
            <md-icon>ok</md-icon>                     
            <md-tooltip md-direction="top">Aprobar</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger" v-on:click="onConfirmDisapprove()">
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Descartar</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    srcProps:{
      Type:Object
    }
  },
  data() {
    return {
      sources: this.srcProps
    };
  },
  methods:{
    confirmApprove(){
      console.log("Aprobado: ")
      alert("Aprobado: ")
    },
    onConfirmDisapprove(){
      console.log("Descartado: ")
      alert("Descartado: ")
    }
  }
};
</script>