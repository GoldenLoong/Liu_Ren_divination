// 引入处理农历日期的库 chinese-lunar-calendar
// 使用 chinese_lunar_calendar 模块
// import { getLunar } from './utils/chinese_lunar_calendar.min.js';
const { getLunar } = chinese_lunar_calendar;


// 农历时辰名称
const LUNAR_HOURS = [
        '子时',
        '丑时', 
        '寅时', 
        '卯时', 

        '辰时',
        '巳时',
        '午时',
        '未时', 

        '申时', 
        '酉时', 
        '戌时', 
        '亥时'
];

function getLunarHourIndex (hour) {
    if (hour >= 23 || hour < 1) return 1; // 子时
    if (hour >= 1 && hour < 3) return 2;  // 丑时
    if (hour >= 3 && hour < 5) return 3;  // 寅时
    if (hour >= 5 && hour < 7) return 4;  // 卯时
    if (hour >= 7 && hour < 9) return 5;  // 辰时
    if (hour >= 9 && hour < 11) return 6; // 巳时
    if (hour >= 11 && hour < 13) return 7; // 午时
    if (hour >= 13 && hour < 15) return 8; // 未时
    if (hour >= 15 && hour < 17) return 9; // 申时
    if (hour >= 17 && hour < 19) return 10; // 酉时
    if (hour >= 19 && hour < 21) return 11; // 戌时
    if (hour >= 21 && hour < 23) return 12; // 亥时
};





// 随机分析
function randomDivination() {
    // 第一次起卦
    const randomIndex1 = Math.floor(Math.random() * 6);
    const index1 = randomIndex1;
    const result1 = divinationConfig.getDivinationResultByIndex(index1);

    // 第二次起卦
    const randomIndex2 = Math.floor(Math.random() * 6);
    const index2 = (randomIndex2 + index1) % 6;
    const result2 = divinationConfig.getDivinationResultByIndex(index2);

    // 第三次起卦
    const randomIndex3 = Math.floor(Math.random() * 6);
    const index3 = (randomIndex3 + index2) % 6;
    const result3 = divinationConfig.getDivinationResultByIndex(index3);

    // 生成综合批词
    const finalExplanation = generateFinalExplanation(randomIndex1, randomIndex2, randomIndex3);

    // 更新显示
    updateDisplay({
        index1: randomIndex1 + 1,
        index2: randomIndex2 + 1,
        index3: randomIndex3 + 1,
        result1,
        result2,
        result3,
        finalExplanation
    });

    // 隐藏农历信息
    document.getElementById('lunarInfo').style.display = 'none';
}

// 时辰分析
function timeDivination() {
    // 获取当前时间
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();

    // 获取农历日期
    const lunarDate = getLunar(year, month, day);
    // 获取农历月、日
    const lunarMonth = lunarDate.lunarMonth;
    const lunarDay = lunarDate.lunarDate;
    const lunarHour = getLunarHourIndex(hour);

    // 计算起卦参数
    const index1 = (lunarMonth - 1) % 6;
    const index2 = (lunarDay + index1 - 1) % 6;
    const index3 = (lunarHour + index2 - 1) % 6;

    // 获取卦象结果
    const result1 = divinationConfig.getDivinationResultByIndex(index1);
    const result2 = divinationConfig.getDivinationResultByIndex(index2);
    const result3 = divinationConfig.getDivinationResultByIndex(index3);
    
    // 生成显示内容
    const finalExplanation = generateFinalExplanation(index1, index2, index3);
    const lunarHourName = LUNAR_HOURS[lunarHour - 1];

    // 显示农历信息
    document.getElementById('lunarInfo').textContent = 
        `当前农历时间：${lunarDate.lunarYear} ${lunarDate.dateStr} ${lunarHourName}`;
    document.getElementById('lunarInfo').style.display = 'block';

    // 统一使用updateDisplay函数
    updateDisplay({

        index1: lunarMonth,
        index2: lunarDay,
        index3: lunarHour,
        result1: result1,
        result2: result2,
        result3: result3,
        finalExplanation: finalExplanation
    });
}


// 切换自定义输入框显示
function toggleCustomInput() {
    const inputBox = document.getElementById('inputBox');
    inputBox.style.display = inputBox.style.display === 'none' ? 'block' : 'none';
}

// 自定义分析
function userSelectDivination() {
    const input1 = parseInt(document.getElementById('input1').value) - 1;
    const input2 = parseInt(document.getElementById('input2').value) - 1;
    const input3 = parseInt(document.getElementById('input3').value) - 1;

    // if (isNaN(input1) || isNaN(input2) || isNaN(input3) ||
    //     input1 < 0 || input1 > 1000 || 
    //     input2 < 0 || input2 > 1000 || 
    //     input3 < 0 || input3 > 1000) {
    //     alert('请输入1-1000之间的数字！');
    //     return;
    // }

    const index1 = (input1 ) % 6;
    const index2 = (input2  + index1) % 6;
    const index3 = (input3  + index2) % 6;
    const result1 = divinationConfig.getDivinationResultByIndex(index1);
    const result2 = divinationConfig.getDivinationResultByIndex(index2);
    const result3 = divinationConfig.getDivinationResultByIndex(index3);

    const finalExplanation = generateFinalExplanation(input1, input2, input3);

    updateDisplay({
        index1: input1 + 1,
        index2: input2 + 1,
        index3: input3 + 1,
        result1,
        result2,
        result3,
        finalExplanation
    });

    // 隐藏农历信息
    document.getElementById('lunarInfo').style.display = 'none';
}

// 生成综合解释
function generateFinalExplanation(index1, index2, index3) {
    return divinationConfig.generateExplanation(index1, index2, index3);
}

// 更新显示结果
function updateDisplay(data) {
    const resultBox = document.getElementById('resultBox');
    const parameters = document.getElementById('parameters');
    const result1Name = document.getElementById('result1Name');
    const result1Exp = document.getElementById('result1Exp');
    const result2Name = document.getElementById('result2Name');
    const result2Exp = document.getElementById('result2Exp');
    const result3Name = document.getElementById('result3Name');
    const result3Exp = document.getElementById('result3Exp');
    const finalExp = document.getElementById('finalExp');

    parameters.textContent = `分析参数为：${data.index1 }-${data.index2 }-${data.index3 }`;
    result1Name.textContent = `事情起始运势：${data.result1.name}`;
    result1Exp.textContent = `解读：${data.result1.explanation}`;
    result2Name.textContent = `事情发展运势：${data.result2.name}`;
    result2Exp.textContent = `解读：${data.result2.explanation}`;
    result3Name.textContent = `事情最终运势：${data.result3.name}`;
    result3Exp.textContent = `解读：${data.result3.explanation}`;
    finalExp.textContent = data.finalExplanation;

    resultBox.style.display = 'block';
}

// 切换文化背景信息显示
function toggleCulturalInfo() {
    const culturalInfo = document.getElementById('culturalInfo');
    culturalInfo.style.display = culturalInfo.style.display === 'none' ? 'block' : 'none';
} 