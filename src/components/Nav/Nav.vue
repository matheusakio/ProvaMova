<template>
    <div>
        <v-card class="containerBandeira">
            <router-link :to="{ name: 'Paises', query: { pais: bandeiras.alpha3Code } }">
                <img :src="bandeiras.flag" class="imagem-paises" />
            </router-link>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "Nav",
    props: {
        bandeiras: {
            type: [Array, Object],
            required: true
        }
    },
};
</script>

<style scoped>
.containerBandeira {
    width: 316px;
    height: 181px;
    display: block;
    /* margin: 0 30px; */
}

.imagem-paises {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    height: 100%;
    width: 100%;
    min-width: 316px;
}
</style>
