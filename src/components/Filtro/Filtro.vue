<template>
    <div>
        <v-select
            :items="opcoes"
            item-text="label"
            class="filtro"
            placeholder="Escolha uma opção"
            v-model="opcaoSelecionada"
            @change="values"
        >
            <template template #header>
                <div class="label">Filtrar por</div>
            </template>
        </v-select>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: {
        opcoes: {
            type: [Array, Object],
        },
        filterType: {
            type: [Number, String],
            required: true,
        },
        opcaoDefault: {
            type: [Array, Object],
        },
    },
    data: () => ({
        opcaoSelecionada: null,
    }),

    computed: {
        ...mapState(["opcao1", "opcao2"]),
    },
    methods: {
        ...mapMutations(["CHANGE_OPTION_1", "CHANGE_OPTION_2"]),

        selectOption() {
            if (this.filterType == 1) {
                this.CHANGE_OPTION_1({
                    opcao1: this.opcoes.find(
                        (option) => option.value == this.opcaoDefault
                    ),
                });
            } else {
                this.CHANGE_OPTION_2({
                    opcao2: this.opcaoDefault,
                });
            }
        },
        values() {
            this.$emit("selectOptions", this.opcaoSelecionada);
        },
    },

    created() {
        this.opcaoSelecionada = this.opcaoDefault;
    },
};
</script>

<style scoped>
.filtro {
    align-items: center;
    display: block;
    width: 100%;
    font-family: Montserrat;
    font-style: normal;
    font-size: 16px;
    line-height: 20px;
}
</style>