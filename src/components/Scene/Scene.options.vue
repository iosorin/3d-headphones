<template>
    <div class="options">
        <v-tooltip top color="black">
            <template v-slot:activator="{ on }">
                <v-btn
                    x-small
                    fab
                    v-on="on"
                    @click="$emit('toggleRotate')"
                >
                    <v-icon>mdi-axis-z-rotate-counterclockwise</v-icon>
                </v-btn>
            </template>
            <span>Turn {{ autoRotate ? 'off' : 'on' }} auto-rotate</span>
        </v-tooltip>

        <v-tooltip top color="black">
            <template v-slot:activator="{ on }">
                <v-btn
                    x-small
                    fab
                    v-on="on"
                    class="ml-2"
                    @click="$emit('setActiveMesh', { forward: false })"
                >
                    <v-icon>mdi-ray-end-arrow</v-icon>
                </v-btn>
            </template>
            <span>Previous headphone area</span>
        </v-tooltip>

        <v-tooltip top color="black">
            <template v-slot:activator="{ on }">
                <v-btn
                    x-small
                    fab
                    v-on="on"
                    class="ml-1 mr-2"
                    @click="$emit('setActiveMesh')"
                >
                    <v-icon>mdi-ray-start-arrow</v-icon>
                </v-btn>
            </template>
            <span>Next headphone area</span>
        </v-tooltip>

        <v-tooltip top color="black">
            <template v-slot:activator="{ on }">
                <v-btn
                    x-small
                    fab
                    v-on="on"
                    @click="$emit('toggleWireframes')"
                >
                    <v-icon>{{ showWireframes ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                </v-btn>
            </template>
            <span>{{ showWireframes ? ' Hide' : ' Show' }} wireframes</span>
        </v-tooltip>

        <v-tooltip top color="black">
            <template v-slot:activator="{ on }">
                <v-btn
                    x-small
                    fab
                    v-on="on"
                    class="ml-auto"
                    @click="$emit('startAllOver')"
                >
                    <v-icon>mdi-cached</v-icon>
                </v-btn>
            </template>
            <span>Start all over</span>
        </v-tooltip>
    </div>
</template>

<script>
export default {
    props: ['autoRotate', 'showWireframes']
};
</script>
