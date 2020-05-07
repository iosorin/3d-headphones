<template>
    <div ref="container" class="scene coverdiv">
        <SceneOptions
            :showWireframes="showWireframes"
            @setActiveMesh="setActiveMesh"
            @toggleWireframes="toggleWireframes"
        />

        <v-overlay absolute :value="!isLoaded"/>
    </div>
</template>

<script>
import { findArraySibling } from '@/utils';
import SceneInit from './js/Scene.init';

import SceneOptions from './Scene.options';

export default {
    components: { SceneOptions },
    data() {
        return {
            model: {},
            objects: [],
            activeMesh: {},
            isLoaded: false,
            showWireframes: true
        };
    },

    computed: {
        editorCanvas() {
            return document.getElementById('editor-canvas');
        }
    },

    created() {
        this.$nuxt.$on('MESH_UPDATE', this.updateMesh);
    },

    destroyed() {
        this.$nuxt.$off('MESH_UPDATE', this.updateMesh);
    },

    mounted() {
        this.scene = SceneInit(this.$refs.container);

        this.loadModel();
    },

    methods: {
        /**
         * updateMesh - Updating the material map of the active mesh with the editor canvas
        */
        updateMesh() {
            if (!this.activeMesh?.material) {
                return;
            }

            this.activeMesh.material.map.needsUpdate = true;
        },

        /**
         * setActiveMesh - Set active mesh, assign a material map that duplicates the editor canvas
         *
         * @param {string} mesh          model mesh
         * @param {boolean} forward      go to the next or previous sibling
         * @param {boolean} onModelLoad  On model load
         *
        */
        setActiveMesh({ mesh, forward = true, onModelLoad = false } = {}) {
            const canvasTexture = new THREE.Texture(this.editorCanvas);

            // mousedown event (navigation button)
            if (!mesh) {
                mesh = findArraySibling({
                    arr: this.objects,
                    current: this.activeMesh,
                    pName: 'name',
                    forward
                });

                if (!mesh) {
                    return;
                }
            }

            // assign duplicated material.map
            mesh.material = new THREE.MeshStandardMaterial({ map: canvasTexture });

            this.activeMesh = mesh;

            this.updateMesh();

            // ignore the new editor color call
            if (!onModelLoad) {
                this.$nuxt.$emit('ACTIVE_MESH_CHANGED');
            }
        },

        /**
         * createWireframe - Create a wireframe and add it to the mesh
        */
        createWireframe({ mesh, color = 0x000000, linewidth = 4 } = {}) {
            const material = new THREE.LineBasicMaterial({ color, linewidth });
            const geometry = new THREE.EdgesGeometry(mesh.geometry);

            const wireframe = new THREE.LineSegments(geometry, material);

            wireframe.name = '_wireframe';
            wireframe.renderOrder = 1;

            mesh.add(wireframe);
        },

        /**
         * toggleWireframes - Toggle the wireframe visibility
        */
        toggleWireframes() {
            this.showWireframes = !this.showWireframes;

            // Iterator through the model's children
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    const wireframe = child.getObjectByName('_wireframe');

                    wireframe.visible = this.showWireframes;
                }
            });
        },

        /**
         * loadModel - Loading a model, adding wireframes to its meshes and defining the active object
        */
        loadModel() {
            this.isLoaded = false;

            this.scene.loadModel('model/scene.gltf', (model) => {
                // Iterator through the model's children
                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        // clear original material.map
                        child.material.map = null;

                        // create wireframe
                        this.createWireframe({ mesh: child });

                        // push to local array
                        this.objects.push(child);
                    }
                });

                // set the first child as active
                this.setActiveMesh({ mesh: this.objects[0], onModelLoad: true });

                this.model = model;

                this.isLoaded = true;
            });
        }
    }
};
</script>
