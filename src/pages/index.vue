<template>
    <v-container
        class="fill-height"
        fluid
    >
        <v-row
            class="content-row"
            align="center"
            justify="center"
        >
            <!-- Scene -->
            <v-col cols="7">
                <v-card
                    color="grey lighten-3"
                    outlined
                    tile
                >
                    <Scene/>
                </v-card>
            </v-col>

            <!-- Editor -->
            <v-col cols="5">
                <v-card
                    color="grey lighten-3"
                    outlined
                    tile
                >
                    <Editor/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Scene from '@/components/Scene/Scene';
import Editor from '@/components/Editor/Editor';

export default {
    components: {
        Scene,
        Editor
    }
};
</script>

<style lang="scss" scoped>
// Full-height row cards
.content-row {
    height: 100%;

    & > .col {
        height: 100%;
        position: relative;
        padding-top: 0;

        & > .v-card {
            height: 100%;
            border-radius: 5px !important;
            overflow: hidden;
        }
    }
}
</style>
