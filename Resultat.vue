<template>

    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="2" order-md="10" class="btn" style="color:white;background: linear-gradient(to right, rgb(68 144 11) 0%, rgb(11 97 162) 100%);">
          <router-link to="/" style="color:white;text-decoration:none">accueil</router-link>
        </b-col>
      </b-row>
        <hr>
        <b-tabs>
                
                <b-tab>
                    <template active #title>
                        <b-spinner 
                            v-for="variant in variants"
                            :variant="variant"
                            :key="variant"
                        small type="grow"></b-spinner> Mes précedentes recherches
                    </template>
                      <br>
                      <b-row>
                        <b-col cols="6" v-for="(liste,index) in this.listes" :key="index+1">
                        <b-card bg-variant="primary" text-variant="white" style="background: linear-gradient(to right, rgb(68 144 11) 0%, rgb(11 97 162) 100%);">
                        </b-card>
                          <div  class="py-3" >
                              <div class="mx-8 bg-white shadow rounded p-4">
                                  <div style="text-align:left" >
                                      <div class="text-2xl" style="font-size:bold">{{ liste.title.toUpperCase() }}</div>
                                  </div>
                                  <hr>
                                  <div style="text-align:left" class="text-sm">{{ liste.description }}</div>
                                  <div style="text-align:right">
                                    <a  :href="liste.link" target="_blank" style="text-decoration:none;color:bleu" class="px-2 py-1 text-sm mt-3 inline-block ">{{ liste.link }}</a>
                                  </div>
                              </div>
                          </div>
                        </b-col>
                        
                      </b-row>
                </b-tab>

                <b-tab >
                    <template #title>
                    <b-spinner variant="success" type="grow" small></b-spinner> A propos
                    </template>
                    <p class="p-3">Tab contents 1</p>
                </b-tab>
        </b-tabs>
       
        <br>
    </b-container>

</template>

<script>
  // 
//   import axios from 'axios'

  export default {
    
    name: 'Resultat',
    props: {
      msg: String
    },
    

    data() {
      return {
        // 
        variants: ['primary'],
        valeur: '',
        personnes: {},
        q : '',
        listes :[],
        showBottom: false,
        showTop: false,
        value : ''
      }
    },
    mounted() {
      this.getResourceDB();
    },
    methods: {
        getResourceDB() {
            let request = window.indexedDB.open('dbMoteur', 1),
                db,
                store;
            // 
            request.addEventListener('success', (ev) => {

                db = ev.target.result;
                console.log('success DB', db);
                // 
                store = db.transaction('views', 'readonly').objectStore('views');
                // 
                var customers =[];
                // 
                store.openCursor().onsuccess = function(event) {
                  var cursor = event.target.result;
                  
                  if (cursor) {
                    // alert("Name for SSN " + cursor.key + " is " + cursor.value.title);
                    customers.push(cursor.value);
                    // 
                    cursor.continue();

                  }
                //  
                };
                this.listes = customers;
                
            });
        }
    }

  }
</script>
