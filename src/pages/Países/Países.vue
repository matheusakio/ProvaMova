<template>
    <div>
        <div class="centro">

        <div class="container">
            <div class="imagem">
                <img class="bandeira" :src="infoPais.flag" />
            </div>
            <div class="paisContainer">
                <ul class="lista">
                    <li
                        v-for="(header, key, index) in infoPais.headers"
                        :key="index"
                    >
                        <h3 v-if="!Array.isArray(header)">
                            {{ key + ":" }}
                            <router-link
                                :to="{
                                    name: 'Home',
                                    query: { type: 'region', region: header },
                                }"
                                v-if="key == 'Região'"
                            >
                                <em>{{ header }}</em>
                            </router-link>
                            <em v-else>{{ header }}</em>
                        </h3>
                        <h3 v-else>
                            {{ key + ":" }}
                            <em style="font-weight: 400">{{
                                header.join(" | ")
                            }}</em>
                        </h3>
                    </li>
                </ul>
            </div>
        </div>
        <v-container class="d-flex flex-column">
            <h2 v-text="'Países vizinhos'" v-show="infoPais.borders.length > 0"></h2>
            <v-row no-gutters justify="center" align="center" class="flex-column flex-lg-row">
                <v-col
                    class="my-6 d-flex justify-center" cols="4" align-self="center"
                    v-for="vizinhos in bandeirasPagination"
                    :key="vizinhos.alpha3Code"
                >
                    <Nav :bandeiras="vizinhos" />
                </v-col>
            </v-row>
        <v-pagination
            color="#6D2080"
            class="my-4"
            v-model="page"
            v-show="showPagination"
            :length="pagination['btn']"
        ></v-pagination>
        </v-container>
        </div>


    </div>
</template>

<script>
import Nav from "@/components/Nav/Nav";
export default {
    name: "Países",
    components: {
        Nav,
    },

    data: () => ({
        teste: "teste",
        infoPais: {
            flag: "",
            headers: {},
            borders: [],
        },
        valorPag: 3,
        limit: 3,
        page: 1,
        showPagination: false,
    }),
    watch:{
        valorPag() {
            if(this.valorPag < 3){                         
                this.showPagination = true;
            }

        }
    },
    computed: {
        pagination() {
                return {
                    btn: Math.ceil(this.valorPag / 3),
                };
            },
    bandeirasPagination() {
            const first = this.limit * (this.page - 1);
            const second = this.limit + first;

            return this.infoPais.borders.slice(first, second);
        },

    },
    created() {
        this.pais = this.$route.query.pais;
        this.getCountry(this.pais);
    },
    methods: {
        getCountry(country) {
            fetch(`https://restcountries.eu/rest/v2/alpha/${country}`)
                .then((r) => r.json())
                .then((r) => {
                    this.paisSelecionado = r;
                    const {
                        flag,
                        name,
                        capital,
                        region,
                        subregion,
                        population,
                        languages,
                        borders,
                    } = r;
                    this.infoPais["flag"] = flag;
                    this.infoPais["headers"] = {
                        Nome: name,
                        Capital: capital,
                        Região: region,
                        "Sub região": subregion,
                        População: population,
                        Línguas: languages.map((lingua) => lingua.name),
                    };
                    this.getBorderCountrys(borders);
                });
        },
        getBorderCountrys(borders) {
            borders.forEach((b) => {
                fetch(`https://restcountries.eu/rest/v2/alpha/${b}`)
                    .then((r) => r.json())
                    .then((r) => {
                        this.infoPais["borders"].push(r);
                        this.valorPag = this.infoPais.borders.length;
                    });
            });
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    margin: 0 auto;

}
@media screen and (min-width: 993px) {
    .container{
        flex-direction: row;
    }
    
}

.imagem {
    margin-top: 5em;
    width: 443px;
    height: 258px;
    display: block;
    min-width: 443px;
}
.bandeira {
    display: block;
    height: 100%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    width: 100%;
}
.paisContainer {
    margin-top: 5em;
    display: block;
    height: 258px;
    text-align: left;
    width: 100%;
}

.lista {
    display: block;
    height: 100%;
    font-size: 1.2em;
}

.vizinhos-bandeira {
    height: 181px;
    max-width: 316px;
    width: 100%;
}
.bandeiraVizinho {
    display: block;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    height: 100%;
    width: 100%;
}


.labelPaíses {
    text-align: left;
    font-size: 1.3em;
}
h3,
em {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 22px;
    margin-top: 15px;
    color: #454545;
}
h3 {
    font-weight: bold;
}
li {
    list-style: none;
}
h2 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    display: flex;
    margin-left: 2em;
    margin-top: 2em;

}
.centro{
    justify-content: center;
}
</style>