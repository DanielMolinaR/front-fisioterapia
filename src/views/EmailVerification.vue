<template>
    <v-container fluid>
        <v-row justify="center" align="center" class="mt-16">
            <v-col cols="12" sm="10" md="5" lg="5" xl="4" align-self="center" class="mt-16">
                <v-card class="mt-16" :color="this.color" >
                    <br>
                    <v-card-text class="headline" v-text="this.msg" style="color: white; font-weight: bold"></v-card-text>
                    <br>
                </v-card>              
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {

    data() {
        return {
            slug: this.$route.path.substring(20, this.$route.path.length),
            color: "success", //success y red accent-2
            msg: "Correo verificado",
        }
    },

    beforeMount(){
        console.log(this.$route.path.substring(20, this.$route.path.length))
    },

    mounted() {

    },

    methods: {
        async sendVerification() {
            this.color = "red"
            this.msg = "puto"
        },
    },

}
</script>