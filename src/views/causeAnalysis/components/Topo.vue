<template>
    <div class="topology-container">
        <!-- 用于渲染 G6 图形的容器 -->
        <div id="container" ref="container" class="topology-chart" style="width: 100%; height: 700px"></div>
        <el-dialog title="节点详情" :visible.sync="dialogVisible" width="90%">
            <div class="flex flex-col">
                <div>节点: 10.215.22.31</div>
                <div>节点别名: VM_22_32_linux</div>
                <div>数据中心: 10.215.22.31</div>
                <div>管理对象: Linux</div>
                <div>管理对象组件: 日志</div>
                <div>告警摘要: G3财务中心表t_igm_oms_gm_product分区将到上线，产品编号已超过1100，请联系刘兴旺</div>
                <div>告警开始时间: 2025-02-11 09:00:01</div>
                <div>告警最后一次发生时间: 2025-02-11 09:00:01</div>
            </div>
        </el-dialog>
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
            graph: null,
            dialogVisible: false
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
                    ranksep: 10,
                    nodesep: 30,
                    // 使用函数控制每个节点之间的水平间距
                    nodesepFunc: (node) => {
                        if (node.label === '省中心LNS路由器') {
                            return 80;  // 特定节点间距
                        }
                        return 30;  // 默认节点间距
                    },
                },
                modes: {
                    default: [
                        'drag-canvas',
                        'zoom-canvas',
                    ],
                },
                defaultNode: {
                    type: 'custom-normal-node',
                    anchorPoints: [
                        [0.5, 1],
                        [0.5, 0],
                    ],// 设置锚点,这里最好就按这个顺序，两个数组顺序改了edge会有问题
                },
                defaultEdge: {
                    style: {
                        stroke: '#e2e2e2', // 边的颜色
                        lineWidth: 1,
                    },
                },

                defaultCombo: {
                    type: 'rect',
                    padding: [20, 5, 20, 5],
                    labelCfg: {
                        position: 'top',
                        refX: 0,
                        refY: 0,
                        style: {
                            fill: '#666',
                            fontSize: 10
                        },
                    },
                },

            })

            this.graph.on('node:click', (e) => {
                console.log('node click', e)
                this.dialogVisible = true
            })
            // 如果需要支持移动端的 touch 事件
            this.graph.on('node:touchstart', (e) => {
                console.log('node touchstart', e);
                this.dialogVisible = true;
            });

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
