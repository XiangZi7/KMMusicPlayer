<template lang="">

    <aplayer :audio="audioInfo" :lrcType="1" fixed ref="aplayer" @listAdd="handleEvent" />

</template>
<script>
    import Vue from 'vue';
    import APlayer from '@moefe/vue-aplayer';
    import { mapState } from "vuex";
    Vue.use(APlayer);


    export default {
        computed: {
            ...mapState(["audioInfo"]),

        },

        mounted() {
            this.handleEvent()
        },
        methods: {
            handleEvent() {
                const aplayer_app = this.$refs.aplayer;
                const counson = this.$store.state.audioInfo.length - 1;
                aplayer_app.switch(counson);
                aplayer_app.play();
            }
        },
    }
</script>
<style lang="">

</style>