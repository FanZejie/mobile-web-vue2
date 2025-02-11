import G6 from '@antv/g6';

export const registerCustomUnitNode = () => {
    G6.registerNode('custom-rect-node', {
        draw(cfg, group) {
            const { title, items, status } = cfg;

            // 根据 status 动态决定边框颜色
            const borderColor = status === 'error'
                ? 'red'
                : status === 'warning'
                    ? '#efb041'
                    : 'green';

            // 绘制外部矩形
            const rect = group.addShape('rect', {
                attrs: {
                    width: 120,
                    height: 180,
                    stroke: borderColor,
                    radius: 4, // 外矩形圆角
                },
            });

            // 绘制左上角文字
            group.addShape('text', {
                attrs: {
                    x: 10,
                    y: 14,
                    text: title,
                    fontSize: 10,
                    fill: '#000000',
                },
            });

            // 绘制六个内部圆角矩形，每个包含名字和状态
            const itemHeight = 20; // 每个圆角矩形的高度
            items.forEach((item, index) => {

                // 根据 status 动态决定边框颜色
                const itemBorderColor = item.status === 'error'
                    ? 'red'
                    : item.status === 'warning'
                        ? '#efb041'
                        : 'green';


                group.addShape('rect', {
                    attrs: {
                        x: 10,
                        y: 20 + index * (itemHeight + 5), // 间距5px
                        width: 100,
                        height: itemHeight,
                        stroke: itemBorderColor,
                        radius: 1, // 圆角
                    },
                });
                // 绘制名字和状态
                group.addShape('text', {
                    attrs: {
                        x: 20,
                        y: 25 + index * (itemHeight + 5) + itemHeight / 2, // 垂直居中
                        text: `${item.name}`,
                        fontSize: 10,
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
                    ? '#efb041'
                    : 'green';

            // 使用 canvas 的 context.measureText() 方法来计算文字宽度
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = '14px sans-serif';  // 设置字体样式
            const textWidth = ctx.measureText(label).width;  // 计算文本宽度
            // 计算矩形的宽度，确保包含文本的宽度，同时加一些内边距
            const rectWidth = textWidth + 50;  // 50 是内边距，防止文字紧贴矩形边框

            // 绘制外部矩形
            const rect = group.addShape('rect', {
                attrs: {
                    x: 0,
                    y: 0,
                    width: rectWidth,
                    height: 40,
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
                case 'router':
                    logoSrc = require('@/assets/images/Router.png');
                    break;
                case 'accessSwitch':
                    logoSrc = require('@/assets/images/accessSwitch.png');
                    break;
                case 'firewall':
                    logoSrc = require('@/assets/images/firewall.png');
                    break;
                case 'aggregationSwitch':
                    logoSrc = require('@/assets/images/aggregationSwitch.png');
                    break;
                case 'f5':
                    logoSrc = require('@/assets/images/f5logo.png');
                    break;
                case 'ssl':
                    logoSrc = require('@/assets/images/ssl.png');
                    break;
                case 'DWDM':
                    logoSrc = require('@/assets/images/DWDM.png');
                    break;
                default:
                    logoSrc = require('@/assets/images/dns.png'); // 默认 logo
            }

            // 左侧 logo 绘制
            group.addShape('image', {
                attrs: {
                    x: 10,
                    y: 5,
                    width: 25,
                    height: 25,
                    img: logoSrc,
                },
            });

            // 右侧的 title
            group.addShape('text', {
                attrs: {
                    x: 40,
                    y: 24, // 垂直居中
                    text: label,
                    fontSize: 14,
                    fill: '#333333',
                },
            });

            return rect; // 返回节点
        },
    }
    );
}