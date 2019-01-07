<template>
  <v-app>
    <v-layout 
      row 
      wrap 
      justify-center>
      <v-flex 
        xs12 
        sm10 
        md8 
        lg6 
        xl4>
        <v-form>
          <h2>Upload new image</h2>
          <br>
          <v-text-field 
            v-model="name" 
            label="Repülő" 
            required />
          <br>
          <v-text-field 
            v-model="generation" 
            label="Generáció" 
            required />
          <br>
          <v-text-field 
            v-model="crew" 
            label="Személyzet" 
            required />
          <br>
          <v-text-field 
            v-model="max_alt" 
            label="Maximum magasság" 
            required />
          <br>
          <v-text-field 
            v-model="max_ias" 
            label="Maximum sebesség" 
            required />
          <br>
          <v-text-field 
            v-model="first_take_off" 
            label="Első felszállás" 
            required />
          <br>
          <v-text-field 
            v-model="image" 
            label="Image URL" 
            required />
          <br>
          <v-btn
            color="info"
            block
            @click="addLocation(name,generation,crew,max_alt,max_ias,first_take_off, image)">Add</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      wrap 
      justify-center>
      <v-flex 
        v-for="(location, index) in locations" 
        :key="index" 
        xs12 
        sm6 
        md4 
        lg3 
        xl3>
        <v-card>
          <v-img 
            class="white--text image-title" 
            height="200px" 
            :src="location.image">
            <v-container 
              fill-height 
              fluid>
              <v-layout fill-height>
                <v-flex 
                  align-end 
                  flexbox>
                  <span class="headline">{{ location.name }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span>{{ location.name }}</span>
              <br>
              <span>Generáció: <strong>{{ location.generation }}</strong></span>
              <br>
              <span>Személyzet: <strong>{{ location.crew }}</strong> fő</span>
              <br>
              <span>Maximum magasság: <strong>{{ location.max_alt }}</strong> m</span>
              <br>
              <span>Maximum sebesség: <strong>{{ location.max_ias }}</strong> km/h</span>
              <br>
              <span>Eslő felszállás: <strong>{{ location.first_take_off }}</strong></span>
              <br>
              <span>Feltöltötte: {{ location.uploader }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn 
              flat 
              color="red" 
              @click="deleteLocation(location.id)">Delete</v-btn>
            <v-btn 
              flat 
              color="orange">Hide</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import firebase from "firebase";
import db from "@/firebaseApp";
@Component({
  firestore: {
    locations: db.collection("locations")
  }
})
export default class Demo extends Vue {
  private name: string = "";
  private generation: string = "";
  private crew: string = "";
  private max_alt: string = "";
  private max_ias: string = "";
  private first_take_off: string = "";
  private image: string = "";
  private locations: any = [];
  private orderedLocations: any = [];
  //Új elem hozzáadása az adatbázishoz
  private addLocation(
    name: string,
    generation: string,
    crew: string,
    max_alt: string,
    max_ias: string,
    first_take_off: string,
    image: string
  ): void {
    const createdAt = new Date();
    const user = firebase.auth().currentUser;
    let uploader;
    if (user) {
      uploader = user.email; // A feltöltő (a bejelentkezett felhasználó) e-mail címe
    }
    db.collection("locations") // Elem feltöltése az adatbázisba
      .add({ 
        name,
        generation,
        crew,
        max_alt,
        max_ias,
        first_take_off,
        image,
        createdAt,
        uploader})
      .then(docRef => {
        alert(`Document written with ID: ${docRef.id}`);
      })
      .catch(error => {
        alert(`Error adding document: ${error}`);
      });
    this.name = "";
    this.image = "";
  }
  //Elem törlése az adatbázisból
  private deleteLocation(id: any): void {
    db.collection("locations")
      .doc(id)
      .delete()
      .then(() => {
        alert("Document deleted!");
      })
      .catch(error => {
        alert(`Error deleting document: ${error}`);
      });
  }
  @Watch("locations")
  private onLocationsChanged(value: number, oldValue: number) {
    //alert("invoke: onLocationsChanged");
  }
}
</script>

<style scoped>
.image-title {
  text-shadow: 0px 0px 8px black;
}
</style>
