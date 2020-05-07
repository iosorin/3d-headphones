<template>
    <div class="options">
        <v-tooltip top color="black">
            <template v-slot:activator="{ on }">
                <v-btn
                    x-small
                    fab
                    class="ml-auto"
                    v-on="on"
                    @click="$emit('applyColor')"
                >
                    <v-icon>mdi-rotate-right</v-icon>
                </v-btn>
            </template>
            <span>Change color</span>
        </v-tooltip>
    </div>
</template>
