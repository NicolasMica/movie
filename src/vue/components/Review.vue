<template>
    <div class="flex" @mouseleave="cancel">
        <button class="p-2 text-4xl text-yellow-dark" v-for="item in limit" :key="item" @mouseenter="enter(item)" @click="change(item)">
            <span v-show="item > hovering">
                <i class="far fa-star"></i>
            </span>
            <span v-show="item <= hovering">
                <i class="fas fa-star"></i>
            </span>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'Review',
        model: {
            event: 'change',
            prop: 'value'
        },
        watch: {
            /**
             * Updates from parent value
             */
            value (value) {
                this.hovering = this.data = value
            }
        },
        props: {
            limit: {
                default: 5,
                type: Number
            },
            value: {
                default: 0,
                type: Number
            }
        },
        data () {
            return {
                data: 0,
                hovering: 0
            }
        },
        methods: {
            /**
             * Emits the change event
             * @param value
             */
            change (value) {
                this.data = value
                this.$emit('change', this.data)
            },

            /**
             * Handles hover event
             * @param item
             */
            enter (item) {
                this.hovering = parseInt(item)
            },

            /**
             * Cancels the hovering
             */
            cancel () {
                this.hovering = this.data
            }
        }
    }
</script>