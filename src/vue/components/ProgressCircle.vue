<template>
    <div ref="progress"></div>
</template>

<script>
    import Progress from 'progressbar.js'
    import merge from 'deepmerge'

    export default {
        props: {
            value: {
                required: true,
                type: Number,
                default: 0,
            },
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data () {
            return {
                intance: null
            }
        },
        watch: {
            /**
             * Updates the progress circle value & text
             */
            value (progress) {
                this.instance.animate(progress / 5)
                this.instance.setText(progress + '/5')
            }
        },
        mounted () {
            this.instance = new Progress.Circle(this.$refs.progress, merge({
                strokeWidth: 8,
                easing: 'easeInOut',
                duration: 1400,
                color: '#00d573',
                trailColor: '#004653',
                trailWidth: 8,
                svgStyle: null,
                text: {
                    value: this.value + '/5'
                }
            }, this.options))
            this.instance.path.style.strokeLinecap = 'round'
            this.instance.animate(this.value / 5)
        }
    }
</script>