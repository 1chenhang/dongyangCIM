<template>
    <div id="app">
        <canvas ref="canvasRef" width="640" height="480" @mousedown="startDrawing" @mousemove="draw"
            @mouseup="finishDrawing" @mouseleave="finishDrawing"></canvas>
        <p v-if="center.x && center.y">Rectangle Center: {{ center.x }}, {{ center.y }}</p>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
const canvasRef = ref(null);
let isDrawing = false;
let startX = 0;
let startY = 0;
const rect = ref({ x: 0, y: 0, width: 0, height: 0 });

//鼠标按下
const startDrawing = (event) => {
    const { offsetX, offsetY } = event;
    startX = offsetX;
    startY = offsetY;
    isDrawing = true;
    console.log(startX,startY,'鼠标按下的坐标')
};

//鼠标移动
const draw = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = event;

    const width = offsetX - startX;
    const height = offsetY - startY;
    console.log(offsetX,offsetY)
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空Canvas


    // 绘制矩形
    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.strokeStyle = 'red'; // 可以自定义颜色
    ctx.stroke();

    // 更新矩形数据
    rect.value = { x: startX, y: startY, width, height };
   
};

//鼠标松开
const finishDrawing = () => {
    if (!isDrawing) return;
    isDrawing = false;
    // 在这里可以处理矩形绘制完成后的逻辑，例如：输出矩形的位置和大小、中心点坐标等
    console.log(rect.value);
    console.log(center.value);
};

//计算矩形中心点坐标
const center = computed(() => {
    return {
        x: rect.value.x + rect.value.width / 2,
        y: rect.value.y + rect.value.height / 2
    };
});

onMounted(() => {
    const canvas = canvasRef.value;
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDrawing);
    canvas.addEventListener('mouseleave', finishDrawing);
});
</script>