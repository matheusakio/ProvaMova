<template>
    <header class="headerContainer">
        <img class="imagem" src="../../assets/logo.svg" />

        <button @click="backToHome" class="button" v-if="!home">
            <svg
                width="19"
                height="10"
                viewBox="0 0 19 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M17 1V5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H19V1H17Z"
                    fill="#6D2080"
                />
            </svg>
            <span class="texto-button"> Voltar </span>
        </button>
    </header>
</template>

<script>
export default {
    // data() {},
    methods: {
        backToHome(){
            this.$router.push('/')
        }
    },
    computed: {
        home() {
            const { path, query } = this.$route
            return path == '/' || path == '/' && query
        },
    },
    created() {
    },
};
</script>

<style scoped>
.headerContainer {
    align-items: center;
    display: flex;
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 100px;
    justify-content: space-between;
    padding: 0 48px;
    min-width: 500px;
}
.imagem {
    height: 3.75em;
    width: 5.7em;
}
.button {
    align-items: center;
    border: 1px solid #6D2080;
    box-sizing: border-box;
    display: inline-flex;
    height: 35px;
    justify-content: space-around;
    width: 135px;
}
.texto-button {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #6D2080
}
</style>