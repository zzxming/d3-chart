<template>
	<LoadingTip
		:loading="loading"
		:loadError="loadError"
	>
		<div class="chart_box"></div>
	</LoadingTip>
</template>

<style lang="less" scoped>
	// 样式有问题
	.mid {
		flex-direction: column;
	}
	.d3_tip-content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1px solid #000;
		border-radius: 4px;
		padding: 4px 8px;
		font-size: 12px;
		&::after {
			position: absolute;
			bottom: -6px;
			left: 50%;
			width: 10px;
			height: 10px;
			transform: translateX(-50%) rotateZ(45deg);
			content: '';
			display: block;
			background-color: #fff;
			border: 1px solid transparent;
			border-bottom-color: #000;
			border-right-color: #000;
		}
	}
</style>

<script lang="ts" setup>
	import * as d3 from 'd3';
	import d3Tip from 'd3-tip';
	import Scrubber from '@/components/d3/Scrubber';

	let regionColor = {
		辽宁: '#0b097d',
		四川: '#d87171',
		安徽: '#dbc0ab',
		北京: '#721d73',
		江苏: '#db02b9',
		湖北: '#366aea',
		香港: '#d14a1e',
		黑龙江: '#2d5717',
		浙江: '#5e2bea',
		上海: '#890acb',
		山西: '#11b72c',
		福建: '#b3dae9',
		广东: '#87a7d3',
		陕西: '#1e5e5e',
		河北: '#8e8352',
		天津: '#4e2b41',
		吉林: '#298ff6',
		山东: '#e6de02',
		重庆: '#b4ace0',
		西藏: '#2ac073',
		云南: '#b07097',
		内蒙古: '#5c50dd',
		湖南: '#6d293d',
		河南: '#f5da86',
		新疆: '#2bbaab',
	};
	type Region = keyof typeof regionColor;
	interface Data {
		name: string;
		region: Region;
		income: [number, number][];
		population: [number, number][];
		lifeExpectancy: [number, number][];
	}
	interface DataFormatted {
		name: string;
		region: Region;
		income: [Date, number][];
		population: [Date, number][];
		lifeExpectancy: [Date, number][];
	}
	interface DataInProcess {
		name: string;
		region: Region;
		income: number;
		population: number;
		lifeExpectancy: number;
	}

	interface DataRange {
		min_year: number;
		max_year: number;
		min_money: number;
		max_money: number;
		min_paper_amount: number;
		max_paper_amount: number;
		min_fund_amount: number;
		max_fund_amount: number;
	}

	interface LoadData {
		data: Data[];
		range: DataRange;
	}
	// const props = withDefaults(
	// 	defineProps<{
	// 		datas: Data[];
	// 		range: DataRange;
	// 		minRadius?: number;
	// 	}>(),
	// 	{
	// 		minRadius: 4,	// 不要传 0, 0 会导致园的半径小于 0 而报错
	// 	}
	// );

	// 临时变量，使用可以props传
	let minRadius = ref(1);

	let color = ref(regionColor);

	let loadError = ref(false);
	let loading = ref(true);

	let tips = ref(
		(d3Tip as Function)()
			.attr('class', 'd3_tip')
			.offset([-10, 0])
			.html((_: MouseEvent, d: Data) => `<span class="d3_tip-name">${d.name ?? '没有名字'}</span>`)
	);
	let dataRange = ref<DataRange>();
	let data = ref<Data[]>();
	// 加载数据
	let loadData = async () => {
		loadError.value = false;
		loading.value = true;

		let res = await new Promise<LoadData>(async (resolve, reject) => {
			resolve((await import(`@/assets/d3json/TheWealthAndHealthOfNations.json`)).default as LoadData);
		}).catch((err) => {
			console.log(err);
			loadError.value = true;
		});
		loading.value = false;

		if (res) {
			dataRange.value = res.range;
			data.value = res.data;
		}
	};
	onMounted(async () => {
		await loadData();
		if (!dataRange.value || !data.value) return;
		await nextTick();

		const { innerWidth: width, innerHeight: height } = window;
		const margin = { top: 40, right: 20, bottom: 40, left: 40 };
		const svg = d3
			.select('.chart_box')
			.append('svg')
			.attr('viewBox', [0, 0, width, height])
			.attr('width', width - margin.left - margin.right);
		// x 为经费
		let x = d3.scaleLinear(
			[dataRange.value.min_money, dataRange.value.max_money],
			[margin.left, width - margin.right]
		);
		// y 为文章
		let y = d3.scaleLinear(
			[dataRange.value.min_paper_amount, dataRange.value.max_paper_amount],
			[height - margin.bottom, margin.top]
		);

		let xg = svg.append('g');
		let xAxis = (g: typeof xg) =>
			g
				.attr('transform', `translate(0,${height - margin.bottom})`)
				.call(d3.axisBottom(x).ticks(width / 80))
				.call((g) => g.select('.domain').remove())
				.call((g) =>
					g
						.append('text')
						.attr('x', width - margin.right - 10)
						.attr('y', margin.bottom - 5)
						.attr('fill', 'currentColor')
						.attr('text-anchor', 'end')
						.attr('font-size', '12px')
						.text('经费投入 (万元) →')
				);
		xg.call(xAxis);
		let yg = svg.append('g');
		let yAxis = (g: typeof yg) =>
			g
				.attr('transform', `translate(${margin.left}, 0)`)
				.call(d3.axisLeft(y))
				.call((g) => g.select('.domain').remove())
				.call((g) =>
					g
						.append('text')
						.attr('x', -margin.left)
						.attr('y', 20)
						.attr('fill', 'currentColor')
						.attr('text-anchor', 'start')
						.attr('font-size', '12px')
						.text('↑ 文章产出量（篇）')
				);
		yg.call(yAxis);

		// 圆点半径
		let radius = d3.scaleSqrt(
			[dataRange.value.min_fund_amount, dataRange.value.max_fund_amount],
			[minRadius.value, width / 24]
		);
		// 值处理
		let parseSeries = (series: [number, number][]): [Date, number][] => {
			return series.map(([year, value]) => [new Date(Date.UTC(year, 0, 1)), value]);
		};
		// 数据处理
		let currentData = data.value.map((v) => ({
			name: v.name,
			region: v.region,
			income: parseSeries(v.income),
			population: parseSeries(v.population),
			lifeExpectancy: parseSeries(v.lifeExpectancy),
		}));
		// 根据年份获取数据
		let dataAt = (date: Date) => {
			return currentData.map((v) => ({
				name: v.name,
				region: v.region,
				income: valueAt(v.income, date),
				population: valueAt(v.population, date),
				lifeExpectancy: valueAt(v.lifeExpectancy, date),
			}));
		};
		// 二分查找
		let bisector = d3.bisector((d: [Date, number]) => d[0]).left;
		let valueAt = (datas: [Date, number][], date: Date) => {
			const i = bisector(datas, date, 0, datas.length - 1);
			const a = datas[i];

			if (i > 0) {
				const b = datas[i - 1];
				// 可以不用加 .getTime()，Date 会自动调用，但不加 ts 会报错
				const t = (date.getTime() - a[0].getTime()) / (b[0].getTime() - a[0].getTime());
				return a[1] * (1 - t) + b[1] * t;
			}
			return a[1];
		};
		// 挂载d3-tip
		svg.call(tips.value);
		// 画圆点
		const circle = svg
			.append('g')
			.attr('stroke', 'black')
			.selectAll('circle')
			.data(dataAt(new Date(dataRange.value.min_year, 0, 1)), (d) => (d as DataInProcess).name)
			.join('circle')
			.sort((a, b) => d3.descending(a.population, b.population))
			.attr('cx', (d) => x(d.income))
			.attr('cy', (d) => y(d.lifeExpectancy))
			.attr('r', (d) => {
				let r = radius(d.population);
				return r < 0 ? 0 : r;
			})
			.on('mouseover', tips.value.show)
			.on('mouseout', tips.value.hide)
			.attr('fill', (d) => color.value[d.region]);

		// d3.min、d3.max 在 ts 识别返回值有可能是 undefined，d3.utcYears 的参数不允许 undefined
		let dates = d3.utcYears(
			d3.min(currentData, (d: DataFormatted) =>
				d3.min([d.income[0], d.population[0], d.lifeExpectancy[0]], ([date]) => date)
			) as Date,
			d3.min(currentData, (d: DataFormatted) =>
				d3.max(
					[
						d.income[d.income.length - 1],
						d.population[d.population.length - 1],
						d.lifeExpectancy[d.lifeExpectancy.length - 1],
					],
					([date]) => date
				)
			) as Date
		);
		// 更新数据
		let update = (data: DataInProcess[]) => {
			circle
				.data(data, (d) => d.name)
				.sort((a, b) => d3.descending(a.population, b.population))
				.transition()
				.attr('cx', (d) => x(d.income))
				.attr('cy', (d) => y(d.lifeExpectancy))
				.attr('r', (d) => {
					let r = radius(d.population);
					return r < 0 ? 0 : r;
				});
		};

		// 插入进度条dom
		// 删除老的进度条dom
		const box = document.getElementsByClassName('chart_box')[0];
		let preObservablehq = document.getElementsByClassName('observablehq')[0];
		preObservablehq?.parentElement?.removeChild(preObservablehq);

		let observablehq = document.createElement('div');
		observablehq.classList.add('observablehq');
		// 生成进度条
		observablehq.appendChild(
			Scrubber(dates, {
				autoplay: false,
				format: (v: Date) => v.getFullYear(),
				loop: false,
				update: (date: Date) => update(dataAt(date)),
				delay: 500,
			})
		);
		box.parentElement?.insertBefore(observablehq, box);
	});

	onUnmounted(() => {
		tips.value.destroy();
	});
</script>
