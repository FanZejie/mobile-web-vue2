<template>
    <div class="flex flex-col items-center justify-center w-16 h-16">
        <!-- 图片 -->
        <div class="flex w-9 h-9 mt-4 bg-blue-800 text-white rounded ">
            <p class="h-9 w-9 text-xs flex items-center justify-center">{{ shortName }}</p>
        </div>
        <!-- 标签 -->
        <div class="" style="font-size: 10px;">{{ label }} </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: {
         // 标签文本
         label: {
            type: String,
            required: true
        },
        shortName: {
            type: String,
            required: true
        },
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {}
}
</script>

<style scoped lang="less"></style>
