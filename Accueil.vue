<template>
    <div class="container">
       
        <div v-if="listes =='' ">
            <h1>Zwa Eyano</h1>
            <img alt="Vue logo" class="" src="../assets/okapi.png" style="height:200px;">
            <br>
            <b-container class="bv-example-row">
                <br>
                <b-row class="text-center">
                    <b-col></b-col>
                    <b-col cols="7">
                        <b-input-group class="mb-2">
                            <b-form-input v-model="q" type="text" debounce="500"></b-form-input>
                            <b-input-group-append v-if="isOnline">
                                <b-button variant="primary" @click.prevent="search" id="search" style="color:white;background:linear-gradient(to right, rgb(103 103 103) 0%, rgb(10 95 123) 100%);">
                                    <b-icon icon="search"></b-icon>
                                </b-button>
                            </b-input-group-append>
                            <b-input-group-append v-else>
                                <b-button variant="danger" @click.prevent="search" id="search" style="color:white;background: linear-gradient(to right, #f43b48 0%, #453a94 100%);">
                                    <b-icon icon="search"></b-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col></b-col>
                    <div class="mt-2">
                        <b-button pill variant="primary" size="lg" @click.prevent="search" style="color:white;background: linear-gradient(to right, rgb(68 144 11) 0%, rgb(11 97 162) 100%);">Je recherche {{ q }}</b-button>
                        <b-button v-if="isOnline" v-b-toggle.sidebar-border class="m-3" pill variant="outline-secondary" size="lg" style="color:white;background:linear-gradient(to right, rgb(103 103 103) 0%, rgb(10 95 123) 100%);">
                            <b-spinner v-for="variant in variants" variant="primary" :key="variant" small type="grow"></b-spinner> Vous etes en ligne
                        </b-button>
                        <b-button v-else class="m-3" v-b-toggle.sidebar-border pill variant="danger" size="lg" style="color:white;background: linear-gradient(to right, #f43b48 0%, #453a94 100%);" >
                            <b-spinner small></b-spinner> Vous etes hors ligne
                        </b-button>
                    </div>
                </b-row>
                <b-sidebar id="sidebar-border" sidebar-class="border-right border-danger">
                    <div class="px-3 py-2">
                        <h2 style="text-decoration:none"><router-link to="/Resultat">Mon historique</router-link></h2>
                        <p style="padding:22px">
                            Zwa Eyano se veut d'etre la première plateforme de recherche avec la technologie de Progressive Webs Apps mise à la disposition des utilisateurs.
                        </p>
                        <img alt="Vue logo" class="" src="../assets/okapi.png" style="padding:4px;height:240px;margin-top:65px">
                        
                    </div>
                </b-sidebar>
            </b-container>
        </div>
    
        <div v-else>
            <b-container class="bv-example-row">
                <b-row class="text-center">
                    <b-col cols="2" @click="init" class="btn" style="color:white;background: linear-gradient(to right, rgb(68 144 11) 0%, rgb(11 97 162) 100%);">
                        Accueil
                    </b-col>
                    <b-col cols="5">
                        <b-input-group>
                            <b-form-input v-model="q" type="text" debounce="500"></b-form-input>
                            <b-input-group-append v-if="isOnline">
                                <b-button variant="primary" @click.prevent="search" id="search" style="color:white;background: linear-gradient(to right, #f43b48 0%, #453a94 100%);">
                                    <b-icon icon="search"></b-icon>
                                </b-button>
                            </b-input-group-append>
    
                            <b-input-group-append v-else>
                                <b-button variant="danger" @click.prevent="search" id="search" style="color:white;background: linear-gradient(to right, #f43b48 0%, #453a94 100%);">
                                    <b-icon icon="search"></b-icon>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
            <hr>
            <div>
              <b-tabs>
                <b-tab active>
                  <template #title>
                    <b-spinner type="grow" small></b-spinner> Résultat
                  </template>
                  <br>
                
                
                  <div v-if="isOnline" class="text-sm bg-white shadow rounded p-4">
                     <p  class="p-1" style="text-align:justify">Elément recherché : <b>{{ this.listes[1].toUpperCase() }}</b> </p>
                     <hr>
                     <b-row >
                        <b-col cols="3">
                           <div style="border:2px solid black">
                                <img :src="this.listes[0]" >
                           </div>
                        </b-col>

                        <b-col cols="9">
                            <p class="p-1" style="text-align:left">Description</p>
                            <p style="text-align:justify"><br>{{ this.listes[2] }}</p>
                        </b-col>
                     </b-row> 
                     
                  </div>

                  <div v-if="!isOnline" class="text-sm bg-white shadow rounded p-4">
                     <p  class="p-1" style="text-align:justify">Elément recherché : <b>{{ this.listes.title.toUpperCase() }}</b> </p>
                     <p class="p-1" style="text-align:justify">Lien : </p>
                     <hr>
                     <b-row >
                        <b-col cols="3">
                           <div style="border:2px solid black">
                                <img src="../assets/okapi.png" style="height:290px;" >
                           </div>
                        </b-col>

                        <b-col cols="9">
                            <p class="p-1" style="text-align:left">Description</p>
                            <p style="text-align:justify"><br>{{ this.listes.description }}</p>
                        </b-col>
                     </b-row> 
                     
                  </div>
                  <br>

                    <div style="margin-top:70px">
                    <!--  -->
                        <p >Bienvenue sur Zwa eyano!, A quel niveau etes-vous satisfait de résultat ? :  {{ value }}</p>
                        <hr>
                        <b-row>
                            <b-col col lg="4" offset-md="4">
                            <b-form-rating v-model="value" variant="warning"></b-form-rating>
                            </b-col>
                        </b-row>
                    </div>

                    <br>

                </b-tab>
                <b-tab md="12" v-if="isOnline">
                  <template #title>
                    <b-spinner type="border" small></b-spinner> Autres liens
                  </template>
                    <br>
                    <b-row>
                        <b-col cols="6" v-for="(liste,index) in this.tab_links" :key="index+1">
                          <div class="py-3">
                              <div class="mx-8 bg-white shadow rounded p-4">
                                  <div style="text-align:left" >
                                      <div class="text-2xl" v-if="liste.title">Titre : {{ liste.title.toUpperCase() }}</div>
                                  </div>
                                  <div style="text-align:left" class="text-sm">Description : {{ liste.description }}</div>
                                  <div style="text-align:right" v-if="liste.link">
                                    <a  :href="liste.link"  target="_blank" style="text-decoration:none;color:bleu" class="px-2 py-1 text-sm mt-3 inline-block ">{{ liste.link }}</a>
                                  </div>
                              </div>
                          </div>
                        </b-col>
                        
                      </b-row>
                </b-tab>
              </b-tabs>
            </div>
    </div>
    <!-- <router-link to="/Resultat">link</router-link> -->
  </div>

</template>

<script>
// 
import axios from 'axios'


export default {
    name: 'Accueil',
    components: {},
    props: {
        msg: String
    },
    mounted() {
        console.log(`Connexion d'user ${this.isOnline} `);
        this.listes  = '';
    },
    data() {
        return {
            // 
            titre : "<Zwa eyano/>",
            variants: ['primary'],
            valeur: '',
            personnes: {},
            q: '',
            listes: [],
            tableau: {},
            showBottom: false,
            showTop: false,
            value: '',
            id: '',
            resultat: {},
            tab_links: []
        }
    },
    // 
     methods: {

        init(){
          this.listes = ''
        },
        // 
        makeToast(variant = null) {
          this.$bvToast.toast('Toast body content', {
            title: `Variant ${variant || 'default'}`,
            variant: variant,
            solid: true
          })
        },
        // 
        // INDEXEDDB
        // IDB =
         
        search() {

            this.createdIndexedDB();

            if(this.q.length>=1)
            {
                if(this.isOnline)
                {
                    // alert('online')
                    // 
                    // Données en ligne
                    // 
                    axios.get(`http://localhost:3000/api/v1/${this.q.toLowerCase()}`)
                                .then(response => {
                                    
                                    console.log(response.data);
                                    console
                                    // this.listes = response.data;
                                    this.listes = response.data;
                                    // 
                                    // INDEXDDB SAUVEGARDE
                                    // 
                                    this.tab_liinks = this.listes;
                                    this.storeDataIndexedDB();
                                    // 
                                    console.log('Données enregistrées!');
                                }).
                                catch(error => console.log(error))
                }
                else
                {
                   this.getResourceDB();
                    // this.storeDataIndexedDB();
                }
            }
            // else
            // {
            //     alert("Aucune caractère entré!");
            // }
        },
        // 
        // INDEXEDDB CREATION
        // 
        createdIndexedDB()
        {
            let request = window.indexedDB.open('dbMoteur', 1),
                db,
                objectStore;
            // index;
            request.onupgradeneeded = function(e) {
                db = request.result;
                // db.deleteObjectStore('views');
                objectStore = db.createObjectStore('views', {
                    keyPath: 'id',
                    autoIncrement: true
                });
                objectStore.createIndex('titleID', 'title', { unique: true });

                e.onsuccess = () => {
                    console.log('succes!!!');
                }
                // store = db.createObjectStore("views",{autoIncrement:true})
            }
            // 
            request.onerror = function(e) {
                console.warn('Erreur' + e.target.errorCode);
            };
            // console.log('BD créée avec succès!!!');

        },
        // 
        // RECHERCHE DE LA RESSOUCE DANS LA BD LOCALE
        // 
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
                let valeurIndex = store.index("titleID");
                // 
                var lowerBoundKeyRange = IDBKeyRange.bound(this.q.toLowerCase(),'\uffff',false,true);
                //
                valeurIndex.openCursor(lowerBoundKeyRange).onsuccess = (event) => {
                    // 
                    // console.log(event.target.result.value.title);
                    // //
                    if(event.target.result.value.title.match(this.q.toLowerCase()))
                    {
                        this.listes = event.target.result.value;
                        // cursor.continue();
                    }
                    else{
                        alert('Aucune donnée trouvée en local');
                    }
                   
                };
                // 
                valeurIndex.openCursor(lowerBoundKeyRange,"prevunique").onerror = () => {
                    // let cursor = event.target.result;
                    // console.log("Erreur");
                    alert('Aucune donnée trouvée en local');
                };
                
            });
        },
        // 
        //  ENREGISTRER LES DONNEES DANS LA BD
        // 
        storeDataIndexedDB() {
            let request = window.indexedDB.open('dbMoteur', 1),
                db,
                tx,
                store,
                moteur,
                title,
                link,
                description;
            // 
            request.addEventListener('success', (ev) => {
                // 
                db = ev.target.result;
                console.log('success Store', db);

                tx = db.transaction('views', 'readwrite');
                // 
                title = this.listes['1'].toLowerCase();
                link = this.listes['0'];
                description = this.listes['2'];

                // title = "etienne tshisekedi";
                // link = "https://fr.wikipedia.org/wiki/etienne_thsisekedi";
                // description ="Étienne Tshisekedi wa Mulumba, né à Kananga (alors Luluabourg au Congo belge) le 14 décembre 1932, est un homme politique de la République démocratique du Congo (RDC), ancien Premier ministre du Zaïre (nom de la RDC sous Mobutu) et président de l'Union pour la démocratie et le progrès social (UDPS). Il est d'origine luba."
                // // 
                moteur = {
                    // id : this.uid,
                    title,
                    link,
                    description
                };

                // 
                tx.oncomplete = (ev) => {
                    console.log(ev)
                }
                tx.onerror = (error) => {
                    console.warn(error)
                }

                store = tx.objectStore('views');

                let save = store.add(moteur);

                save.onsuccess = function() {
                    if (save.result) {

                        var idQuestion = save.result;
                        console.log('id question ' + idQuestion)

                        return idQuestion;
                    } else {
                        console.log("No such result ID");
                    }

                    return idQuestion;

                };
                console.log('succes!!!');

            });
        },
       
        
       
    }
    

    
}
</script>
