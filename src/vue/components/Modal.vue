<template>
    <div class="fixed pin flex justify-center items-center">
        <div class="absolute pin h-full w-full bg-black-80" @click="dismiss"></div>
        <div class="relative">
            <slot></slot>
        </div>
        <button class="absolute pin-t pin-r py-4 px-8 text-white-60 hover:text-white-80 text-xl" aria-label="close" @click="close" v-show="closeable">
            <i class="fas fa-times"></i>
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            dismissable: {
                default: false,
                type: Boolean
            },
            closeable: {
                default: true,
                type: Boolean
            }
        },
        methods: {
            /**
             * Dismisses the modal when clicking on the background
             */
            dismiss (event) {
                if (this.dismissable) {
                    this.$emit('close', event)
                }
            },

            /**
             * Closes the modal when clicking the cross button
             * @param event
             */
            close (event = null) {
                if (this.closeable) {
                    this.$emit('close', event)
                }
            }
        }
    }
</script>
