<template>
    <v-container class="my-0 mx-auto main flex-column">
        <v-row no-gutters justify="space-between" class="linhaFiltro">
            <v-col cols="12" class="d-flex flex-column flex-md-row">
                <v-col md="5">
                <span class="nomeFiltro">Filtrar por</span>
                    <Filtro
                        filterType="1"
                        :opcoes="items"
                        :opcaoDefault="
                            routeWithQuery ? $route.query.type : opcao1
                        "
                        @selectOptions="valueOption1 = $event"
                    />
                </v-col>
                <v-col md="5">
                    <span class="nomeFiltro">Região</span>
                    <Filtro
                        v-show="filtro1"
                        filterType="2"
                        :opcoes="options.options"
                        :opcaoDefault="
                            routeWithQuery
                                ? $route.query.region
                                : opcao1.options
                        "
                        @selectOptions="valueOption2 = $event"
                    />
                </v-col>
                <v-col md="2" class="ml-md-5 d-flex justify-md-center justify-end" align-self="center" align="center">
                    <v-btn
                        @click="searchResults({ valueOption1, valueOption2 })"
                        color="#6D2080"
                    >
                        <span class="pesquisar">Pesquisar</span>
                    </v-btn>
                </v-col>
            </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row no-gutters justify="center" align="center" class="flex-column flex-lg-row">
            <v-col class="my-6 d-flex justify-center" cols="4" align-self="center" v-for="item in bandeirasPagination" :key="item.name">
                <Nav :bandeiras="item" />
            </v-col>
        </v-row>
        <v-pagination
            color="#6D2080"
            class="my-4"
            v-show="showPagination"
            v-model="page"
            :length="pagination['btn']"
        ></v-pagination>
    </v-container>
</template>

<script>
import Filtro from "@/components/Filtro/Filtro";
import Nav from "@/components/Nav/Nav";
import { mapState, mapMutations } from "vuex";

export default {
    name: "App",

    components: {
        Filtro,
        Nav,
    },

    data: () => ({
        items: [
            {
                label: "Região",
                value: "region",
                options: {},
            },
            {
                label: "Capital",
                value: "capital",
                options: {},
            },
            {
                label: "Lingua",
                value: "lang",
                options: {},
            },
            {
                label: "País",
                value: "alpha",
                options: {},
            },
            {
                label: "Código postal",
                value: "callingcode",
                options: {},
            },
        ],
        filtro1: true,
        bandeiras: [],

        valorPag: 12,
        limit: 12,
        page: 1,
        showPagination: false,

        options: [],
        valueOption1: "alpha",
        valueOption2: null,
    }),
    watch: {
        valueOption1() {
            this.options = this.items.find(
                (option) => option.value == this.valueOption1
            );
        },
    },
    computed: {
        ...mapState(["opcao1", "opcao2"]),

        routeWithQuery() {
            return this.$route.query["type"] == "region";
        },

        pagination() {
            return {
                btn: Math.ceil(this.valorPag / 12),
            };
        },
        bandeirasPagination() {
            const first = this.limit * (this.page - 1);
            const second = this.limit + first;

            return this.bandeiras.slice(first, second);
        },
    },

    async created() {
        await this.getAllCountries();

        if (this.routeWithQuery) {
            this.CHANGE_OPTION_1({
                opcao1: {
                    label: "Região",
                    value: this.$route.query["type"],
                    options: this.items[0].options,
                },
            });
            this.valueOption1 = this.$route.query["type"];
            this.valueOption2 = this.$route.query["region"];
        }

        this.options = this.opcao1;
    },

    methods: {
        ...mapMutations(["CHANGE_OPTION_1", "CHANGE_OPTION_2"]),

        teste() {
            this.filtro1 = !this.filtro1;
        },
        mudar() {
        },

        async getAllCountries() {
            // this.bandeiras = []
            await fetch(`https://restcountries.eu/rest/v2/all`)
                .then((r) => r.json())
                .then((r) => {
                    const {
                        0: regiao,
                        1: capital,
                        2: lingua,
                        3: pais,
                        4: codigo_postal,
                    } = this.items;

                    (regiao.options = r.map((country) => {
                        return {
                            label: country.region,
                            value: country.region,
                        };
                    })),
                        (capital.options = r.map((country) => {
                            return {
                                label: country.capital + " ",
                                value: country.capital,
                            };
                        })),
                        (lingua.options = r.map((country) => {
                            return {
                                label: country.languages[0].name,
                                value: country.languages[0].iso639_1,
                            };
                        })),
                        this.CHANGE_OPTION_1({
                            opcao1: {
                                ...pais,
                                options: r.map((country) => {
                                    return {
                                        label: country.name,
                                        value: country.alpha3Code,
                                    };
                                }),
                            },
                        });
                    (pais.options = r.map((country) => {
                        return {
                            label: country.name,
                            value: country.alpha3Code,
                        };
                    })),
                        (codigo_postal.options = r.map((country) => {
                            return {
                                label: country.callingCodes,
                                value: country.callingCodes[0],
                            };
                        }));
                });
        },
        async searchResults({ valueOption1, valueOption2 }) {
            fetch(
                `https://restcountries.eu/rest/v2/${valueOption1}/${valueOption2}`
            )
                .then((r) => r.json())
                .then((r) => {
                    valueOption1 == "alpha"
                        ? (this.bandeiras = [r])
                        : (this.bandeiras = r);
                    this.valorPag = this.bandeiras.length;
                    this.showPagination = true;
                });
        },
    },
};
</script>
<style scoped>
.main {
    height: auto;
}

.linhaFiltro {
    align-self: start;
    margin-top: 3em !important;
    width: 100%;
}

.pesquisar{

    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    font-family: Montserrat;



    color: #FFFFFF;
}
.nomeFiltro{
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    color: #6D2080;
}
</style>
