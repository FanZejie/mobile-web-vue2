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
            const { title, imgType, status } = cfg;

            // 根据 status 动态决定边框颜色
            const borderColor = status === 'error'
                ? 'red'
                : status === 'warning'
                    ? 'yellow'
                    : 'green';

            // 绘制外部矩形
            const rect = group.addShape('rect', {
                attrs: {
                    x: 0,
                    y: 0,
                    width: 300,
                    height: 60,
                    fill: '#ffffff',
                    stroke: borderColor,
                    radius: 10, // 圆角
                },
            });

            // 左侧的 logo，动态根据 type 改变
            let logoSrc;
            switch (imgType) {
                case 'type1':
                    logoSrc = 'path/to/logo1.png';
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
                    logoSrc = 'path/to/default_logo.png'; // 默认 logo
            }

            // 左侧 logo 绘制
            group.addShape('image', {
                attrs: {
                    x: 10,
                    y: 15,
                    width: 30,
                    height: 30,
                    img: logoSrc,
                },
            });

            // 右侧的 title
            group.addShape('text', {
                attrs: {
                    x: 50,
                    y: 30, // 垂直居中
                    text: title,
                    fontSize: 14,
                    fill: '#333333',
                },
            });

            return rect; // 返回节点
        },
    });
}