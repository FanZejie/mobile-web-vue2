import G6 from '@antv/g6';

export const registerCustomUnitNode = () => {
    G6.registerNode('custom-rect-node', {
        draw(cfg, group) {
            const { title, items } = cfg;

            // 绘制外部矩形
            const rect = group.addShape('rect', {
                attrs: {
                    width: 60,
                    height: 100,
                    fill: '#ffffff',
                    stroke: '#000000',
                    radius: 10, // 外矩形圆角
                },
            });

            // 绘制左上角文字
            group.addShape('text', {
                attrs: {
                    x: 8,
                    y: 8,
                    text: title,
                    fontSize: 8,
                    fill: '#000000',
                },
            });

            // 绘制六个内部圆角矩形，每个包含名字和状态
            const itemHeight = 10; // 每个圆角矩形的高度
            items.forEach((item, index) => {
                group.addShape('rect', {
                    attrs: {
                        x: 10,
                        y: 10 + index * (itemHeight + 5), // 间距5px
                        width: 40,
                        height: itemHeight,
                        fill: '#f0f0f0',
                        stroke: '#cccccc',
                        radius: 1, // 圆角
                    },
                });
                // 绘制名字和状态
                group.addShape('text', {
                    attrs: {
                        x: 20,
                        y: 10 + index * (itemHeight + 5) + itemHeight / 2, // 垂直居中
                        text: `${item.name}`,
                        fontSize: 4,
                        fill: '#333333',
                    },
                });
            });

            return rect; // 返回节点
        },
    });
};

export const registerCustomNormalNode = () => {
    G6.registerNode('custom-normal-node', {
        draw(cfg, group) {
            const { label, imgType, status } = cfg;

            // 根据 status 动态决定边框颜色
            const borderColor = status === 'error'
                ? 'red'
                : status === 'warning'
                    ? 'yellow'
                    : 'green';

            // 使用 canvas 的 context.measureText() 方法来计算文字宽度
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = '10px sans-serif';  // 设置字体样式
            const textWidth = ctx.measureText(label).width;  // 计算文本宽度
            // 计算矩形的宽度，确保包含文本的宽度，同时加一些内边距
            const rectWidth = textWidth + 50;  // 50 是内边距，防止文字紧贴矩形边框

            // 绘制外部矩形
            const rect = group.addShape('rect', {
                attrs: {
                    x: 0,
                    y: 0,
                    width: rectWidth,
                    height: 30,
                    fill: '#ffffff',
                    stroke: borderColor,
                    radius: 10, // 圆角
                },
            });

            // 左侧的 logo，动态根据 type 改变
            let logoSrc;
            switch (imgType) {
                case 'terminal':
                    logoSrc = require('@/assets/images/terminal.png');
                    break;
                case 'dns':
                    logoSrc = require('@/assets/images/dns.png');
                    break;
                case 'type2':
                    logoSrc = 'path/to/logo2.png';
                    break;
                case 'type3':
                    logoSrc = 'path/to/logo3.png';
                    break;
                case 'type4':
                    logoSrc = 'path/to/logo4.png';
                    break;
                default:
                    logoSrc = require('@/assets/images/dns.png'); // 默认 logo
            }

            // 左侧 logo 绘制
            group.addShape('image', {
                attrs: {
                    x: 10,
                    y: 5,
                    width: 20,
                    height: 20,
                    img: logoSrc,
                },
            });

            // 右侧的 title
            group.addShape('text', {
                attrs: {
                    x: 40,
                    y: 20, // 垂直居中
                    text: label,
                    fontSize: 10,
                    fill: '#333333',
                },
            });

            return rect; // 返回节点
        },
    });
}