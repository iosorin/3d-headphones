<template>
    <v-container class="editor-container">
        <v-row ref="canvas-container">
            <v-card class="coverdiv">
                <canvas id="editor-canvas" ref="canvas"></canvas>
            </v-card>
        </v-row>

        <v-row class="mt-2">
            <v-col class="px-0">
                <v-color-picker
                    class="mx-auto"
                    mode="hexa"
                    v-model="backgroundColor"
                    hide-mode-switch
                    @input="color => applyColor({ color })"
                >
                </v-color-picker>
            </v-col>

            <EditorOptions @applyColor="applyColor" />
        </v-row>
    </v-container>
</template>

<script>
import EditorOptions from './Editor.options';

const colorsMap = [
    '#553EEA', '#1C1E1F', '#D6A989', '#8D93E8', '#555195',
    '#001916', '#4D33EF', '#AC2739', '#F6F5F5', '#5FAE7A',
    '#73697B', '#1B1B23', '#D67339', '#E08C07', '#067D8C',
    '#DAD29A', '#82925B', '#A3624D', '#4F3334', '#4C272E',
    '#EB6940', '#DD4C1F', '#D77167', '#A02326', '#ECFA1C'
];

export default {
    components: { EditorOptions },
    data() {
        return {
            backgroundColor: '#2A2A2A'
        };
    },

    created() {
        this.$nuxt.$on('ACTIVE_MESH_CHANGED', this.applyColor);

        if (process.browser) {
            window.addEventListener('resize', this.onResize);
        }
    },

    destroyed() {
        this.$nuxt.$off('ACTIVE_MESH_CHANGED', this.applyColor);

        if (process.browser) {
            window.removeEventListener('resize', this.onResize);
        }
    },

    mounted() {
        this.container = this.$refs['canvas-container'];

        this.ctx = this.$refs.canvas.getContext('2d');

        this.onResize();

        this.applyColor({ restore: true });

        this.triggerUpdate();
    },

    methods: {
        /**
         * triggerUpdate - Notifying the scene component that changes have occurred
        */
        triggerUpdate() {
            this.$nuxt.$emit('MESH_UPDATE');
        },

        /**
         * applyColor - Set canvas background color
         *
         * @param {string} color     color (if the argument is not defined, will be applied random color)
         * @param {boolean} restore  restore current color
         *
        */
        applyColor({ color, restore = false } = {}) {
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.container.offsetWidth, this.container.offsetHeight);

                if (!restore) {
                    const randomColor = colorsMap[Math.floor((Math.random() * colorsMap.length))];

                    this.backgroundColor = color ?? randomColor;
                }

                this.ctx.fillStyle = this.backgroundColor;
                this.ctx.fillRect(0, 0, this.container.offsetWidth, this.container.offsetHeight);

                this.triggerUpdate();
            }
        },

        /**
         * onResize - Window resize handler
         *
        */
        onResize() {
            const [w, h] = [this.container.offsetWidth, this.container.offsetHeight];

            this.ctx.canvas.width = w;
            this.ctx.canvas.height = h;

            this.applyColor({ restore: true });
        }
    }
};
</script>

<style lang="scss" scoped>
.editor-container {
    height: 100%;
    padding-bottom: 0;

    .row {
        height: 50%;
        margin: 0;
    }
}
</style>
