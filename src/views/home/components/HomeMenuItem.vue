<template>
    <div @click="navigate" class="flex flex-col items-center justify-center w-16 h-16">
        <!-- 图片 -->
        <img :src="require(`@/assets/images/menu/${imgSrc}`)" alt="menu item image" class="w-9 h-9 mt-4"/>
        <!-- 标签 -->
        <div class="" style="font-size: 10px;">{{ label }}</div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: {
        // 图片链接
        imgSrc: {
            type: String,
            required: true
        },
        // 标签文本
        label: {
            type: String,
            required: true
        },
        // 跳转链接
        href: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() {
    },
    methods: {
        navigate() {
            this.$router.push(this.href);
        }
    }
}
</script>

<style scoped lang="less">

</style>
