<template>
    <div class="topology-container">
        <!-- 用于渲染 G6 图形的容器 -->
        <div id="container" ref="container" class="topology-chart" style="width: 100%; height: 800px"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6'
import { getTopoStructer } from '../api/api';
import { registerCustomNormalNode, registerCustomUnitNode } from '../lib/CustomNode';
export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            // 初始化数据：包含节点和组合
            graphData: null,
            graph: null
        }
    },
    computed: {
    },
    watch: {},
    created() { },
    mounted() {
        this.$nextTick(() => {
            registerCustomUnitNode();
            registerCustomNormalNode();
            this.initializeGraph()
        })

        // 监听窗口 resize 事件，动态更新图表的尺寸
        window.addEventListener('resize', this.onResize);
    },
    beforeDestroy() {
        // 销毁组件时移除 resize 事件监听
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        async initializeGraph() {
            const container = document.getElementById('container');
            this.graph = new G6.Graph({
                container: this.$refs.container, // 容器
                width: container.clientWidth,  // 初始宽度为容器的宽度
                height: container.clientHeight,  // 初始高度为容器的高度
                groupByTypes: false,
                fitView: true,
                fitViewPadding: 1,
                layout: {
                    type: 'dagre',
                    rankdir: 'TB',
                    ranksep: 6,
                    nodesep: 20,
                },
                modes: {
                    default: [
                        'drag-combo',
                        'drag-node',
                        'drag-canvas',
                        'zoom-canvas',
                    ],
                },
                defaultNode: {
                    type: 'image',
                    size: 20, // 节点大小
                    labelCfg: {
                        style: {
                            fill: '#000', // 文本颜色
                            fontSize: 4, // 文本大小
                        },
                        position: 'bottom'
                    },
                },
                defaultEdge: {
                    style: {
                        stroke: '#e2e2e2', // 边的颜色
                        lineWidth: 1,
                    },
                },

                defaultCombo: {
                    type: 'rect',
                    padding: [0, 20, 0, 20],
                    labelCfg: {
                        position: 'top',
                        refX: 0,
                        refY: 0,
                        style: {
                            fill: '#666',
                            fontSize: 4
                        },
                    },
                },

            })

            let res = await getTopoStructer()
            this.graphData = res.data.data
            // 渲染图形
            this.graph.data(this.graphData)
            this.graph.render()

            // 设置图形布局
            this.graph.fitView() // 调整图形大小以适应画布
        },
        // 处理窗口 resize 事件，动态更新图表的宽度和高度
        onResize() {
            if (this.graph) {
                const container = document.getElementById('container');
                this.graph.changeSize(container.clientWidth, container.clientHeight);
            }
        },
    }
}
</script>

<style scoped lang="less"></style>
