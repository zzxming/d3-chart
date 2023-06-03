<template>
	<LoadingTip
		:loading="loading"
		:loadError="loadError"
	>
		<div
			ref="chart"
			class="chart_box"
		></div>
	</LoadingTip>
</template>

<script lang="ts" setup>
	import {
		select,
		stack as d3stack,
		range,
		stackOrderNone,
		transpose,
		min,
		max,
		scaleLinear,
		interpolateCool,
		area as d3area,
	} from 'd3';

	const chart = ref();

	let loading = ref(true);
	let loadError = ref(false);

	onMounted(async () => {
		loading.value = false;
		await nextTick();
		const { innerWidth: width, innerHeight: height } = window;
		const margin = { top: 40, right: 20, bottom: 40, left: 40 };

		/** number of layers, 图层数 */
		let n = 20;
		/** number of samples per layer, 极值点个数, x轴点个数 */
		let m = 200;
		/** number of bumps per layer */
		let k = 10;

		const svg = select(chart.value).append('svg');
		svg.attr('viewBox', [0, 0, width, height]);

		let stack = d3stack<number[], number>().keys(range(n)).order(stackOrderNone);

		function randomize() {
			// 使用假数据
			let data = transpose<number>(Array.from({ length: n }, () => bumps()(m, k)));
			// console.log(data);
			let layers = stack([...data]);
			// console.log(layers);
			y.domain([min(layers, (l) => min(l, (d) => d[0])) ?? 0, max(layers, (l) => max(l, (d) => d[1])) ?? 0]);
			return layers;
		}

		let x = scaleLinear([0, m - 1], [0, width]);
		let y = scaleLinear([0, 1], [height, 0]);
		let z = interpolateCool;

		// 假数据生成
		let bumps = function () {
			// Inspired by Lee Byron’s test data generator.
			function bump(a: number[], n: number) {
				const x = 1 / (0.1 + Math.random());
				const y = 2 * Math.random() - 0.5;
				const z = 10 / (0.1 + Math.random());
				for (let i = 0; i < n; ++i) {
					const w = (i / n - y) * z;
					a[i] += Math.round(x * Math.exp(-w * w));
				}
			}
			return function bumps(n: number, m: number) {
				const a: number[] = [];
				for (let i = 0; i < n; ++i) a[i] = 0;
				for (let i = 0; i < m; ++i) {
					bump(a, n);
				}
				return a;
			};
		};

		let area = d3area();
		area.x((d, i) => x(i));
		area.y0((d) => y(d[0]));
		area.y1((d) => y(d[1]));

		// 初始图
		const path = svg
			.selectAll('path')
			.data(randomize)
			.join('path')
			.attr('d', (d) => area(d as [number, number][]))
			.attr('fill', (d, i) => z(Math.random())); // 颜色生成, 改为Math.random(), 随机颜色

		// 循环生成新数据，使动画
		let nextData = async function () {
			svg.node();
			await path
				.data(randomize)
				.transition()
				.delay(1000)
				.duration(1500)
				.attr('d', (d) => area(d as [number, number][]))
				.end();
		};
		// 如果想是静态数据, 可以不使用循环获取新数据
		// c 防止意外死循环, 可以去掉
		let c = 0;
		while (true && c < 10) {
			await nextData();
			c += 1;
		}
	});
</script>

<style lang="less" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>
