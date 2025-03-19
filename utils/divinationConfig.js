const divinationConfig = {
    // 六个基本卦象的配置
    results: [
        {
            name: '大安',
            explanation: '好运,代表平安，事情发展顺利，可以放心进行。'
        },
        {
            name: '留连',
            explanation: '坏运,表示徘徊不定，事情可能有所延迟，需要耐心等待。'
        },
        {
            name: '速喜',
            explanation: '好运,代表好消息即将到来，事情进展迅速。'
        },
        {
            name: '赤口',
            explanation: '坏运,提示需要谨慎，可能遇到口舌是非。'
        },
        {
            name: '小吉',
            explanation: '好运,表示小有收获，事情略有起色。'
        },
        {
            name: '空亡',
            explanation: '坏运,意味着暂时没有结果，需要等待时机。'
        }
    ],

    // 根据索引获取卦象结果
    getDivinationResultByIndex(index) {
        return this.results[index];
    },

    // 生成综合解释
    generateExplanation(index1, index2, index3) {
        const result1 = this.results[index1];
        const result2 = this.results[index2];
        const result3 = this.results[index3];

        // 根据三个卦象的组合生成综合解释
        let explanation = '';

        // 判断整体趋势
        if (index1 === 0 || index2 === 0 || index3 === 0) { // 有大安
            explanation += '整体来看，事情发展较好,趋势平稳。';
        } else if (index1 === 2 || index2 === 2 || index3 === 2) { // 有速喜
            explanation += '整体来看，事情发展较好,变化很快。';
        } else {
            explanation += '整体来看，事情发展需要耐心。';
        }

        // 根据起始状态给出建议
        explanation += '\n    从起始来看，' + this.getAdvice(index1);

        // 根据发展状态补充建议
        explanation += '\n    在发展过程中，' + this.getAdvice(index2);

        // 根据结果状态总结
        explanation += '\n    最终结果，' + this.getAdvice(index3);

        return explanation;
    },

    // 根据单个卦象给出建议
    getAdvice(index) {
        switch(index) {
            case 0: // 大安
                return '可以按计划进行';
            case 1: // 留连
                return '需要有耐心和毅力';
            case 2: // 速喜
                return '可以抓住机会快速行动';
            case 3: // 赤口
                return '要注意避免冲突';
            case 4: // 小吉
                return '可以稳步推进';
            case 5: // 空亡
                return '建议静观其变';
            default:
                return '请谨慎行事';
        }
    }
};

// 如果在浏览器环境中，将配置对象添加到全局作用域
if (typeof window !== 'undefined') {
    window.divinationConfig = divinationConfig;
}

// 如果在 Node.js 环境中，导出配置对象
if (typeof module !== 'undefined' && module.exports) {
    module.exports = divinationConfig;
} 