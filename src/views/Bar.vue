<template>
	<LoadingTip
		:loading="loading"
		:loadError="loadError"
	>
		<div class="chart_box"></div>
	</LoadingTip>
</template>

<style lang="less" scoped></style>

<script lang="ts" setup>
	import { select, scaleBand, max, scaleLinear, axisBottom, axisLeft, zoom, schemeSpectral } from 'd3';
	import d3Tip from 'd3-tip';
	import { D3ZoomEvent, ModuleImport } from '@/interface';

	import GroupBarChart from '@/components/d3/GroupedBarChart';

	interface SingleBar {
		name: string | number;
		value: number;
	}
	interface GroupBar {
		year: number;
		value: number;
		age: string;
	}

	/** 单柱状图 */
	let loading = ref(true);
	let loadError = ref(false);
	let SingleBarData = ref<SingleBar[]>([]);
	let loadSingleBarData = async () => {
		let res = await new Promise<ModuleImport<SingleBar[]>>((resolve) => {
			resolve(import('@/assets/d3json/Bar.json'));
		})
			.then((res) => res.default)
			.catch((err) => {
				console.log(err);
				loadError.value = true;
			});
		loading.value = false;

		if (res) {
			SingleBarData.value = res;
		}
	};

	let singleBar = async () => {
		await loadSingleBarData();
		if (!SingleBarData.value) return;
		const { innerWidth: width, innerHeight: height } = window;
		const margin = { top: 40, right: 20, bottom: 20, left: 60 };
		const textHeight = 20;

		const svg = select('.chart_box').append('svg').attr('viewBox', [0, 0, width, height]).attr('color', '#fff');

		const tips = (d3Tip as Function)()
			.attr('class', 'd3_tip')
			.offset([-10, 0])
			.html(
				(_: MouseEvent, d: SingleBar) => `<span class="d3_tip-name">${d.name ?? '没有名字'}: ${d.value}</span>`
			);
		svg.call(tips);
		// 数据位置计算
		// range数组的顺序影响坐标轴的数据显示顺序
		let x = scaleBand()
			.domain(SingleBarData.value.map((d) => `${d.name}`))
			.range([margin.left, width - margin.right])
			.padding(0.1);
		let y = scaleLinear()
			.domain([0, max(SingleBarData.value, (d) => d.value) ?? 0])
			.nice()
			.range([height - margin.bottom - textHeight, margin.top]);

		// 坐标轴
		// .tickSizeOuter(0) 是把 x 轴初始位置和末尾位置的坐标点突出的线长度为0, 默认6
		let xAxis = (g: typeof xg) =>
			g
				.attr('transform', `translate(0, ${height - margin.bottom - textHeight})`)
				.attr('class', 'x-axis')
				.call(axisBottom(x).tickSizeOuter(0))
				.call((g) =>
					g
						.append('text')
						.attr('x', width - 120)
						.attr('y', 16 + textHeight)
						.attr('fill', 'currentColor')
						.attr('text-anchor', 'start')
						.attr('font-size', '16px')
						.text('→ x轴说明文字')
				);

		// .call((g) => g.select('.domain').remove()) 是把竖着的线去掉
		let yAxis = (g: typeof yg) =>
			g
				.attr('transform', `translate(${margin.left}, 0)`)
				.attr('class', 'y-axis')
				.call(axisLeft(y))
				.call((g) => g.select('.domain').remove())
				.call((g) =>
					g
						.append('text')
						.attr('x', -margin.left / 2)
						.attr('y', margin.top / 2)
						.attr('fill', 'currentColor')
						.attr('text-anchor', 'start')
						.attr('font-size', '16px')
						.text('↑ y轴说明文字')
				);

		let bars = svg
			.append('g')
			.attr('class', 'bars')
			.selectAll('rect')
			.data(SingleBarData.value)
			.join('rect')
			.attr('x', (d) => x(`${d.name}`) ?? 0)
			.attr('y', (d) => y(d.value))
			.attr('height', (d) => y(0) - y(d.value))
			.attr('width', x.bandwidth())
			.attr('fill', '#aca')
			.on('mouseover', tips.show)
			.on('mouseleave', tips.hide);

		let xg = svg.append('g');
		xg.call(xAxis);

		let yg = svg.append('g');
		yg.call(yAxis);

		const extent: [[number, number], [number, number]] = [
			[margin.left, margin.top],
			[width - margin.right, height - margin.top],
		];
		// 缩放
		function zoomed(event: D3ZoomEvent) {
			x.range([margin.left, width - margin.right].map((d) => event.transform.applyX(d)));
			bars.attr('x', (d) => x(`${d.name}`) ?? 0).attr('width', x.bandwidth());
			xg.call(xAxis);
		}
		let d3zoom = zoom().scaleExtent([1, 8]).translateExtent(extent).extent(extent).on('zoom', zoomed);
		svg.call(d3zoom as any);
	};

	/** 多柱状图 */
	let groupBarData = ref<GroupBar[]>([]);
	let groupBarDataAges = ref<string[]>([]);
	let loadGroupBarData = async () => {
		let res = await new Promise<ModuleImport<{ data: GroupBar[]; age: string[] }>>((resolve) => {
			resolve(import('@/assets/d3json/GroupBar.json'));
		})
			.then((res) => res.default)
			.catch((err) => {
				console.log(err);
				loadError.value = true;
			});
		loading.value = false;

		if (res) {
			groupBarData.value = res.data;
			groupBarDataAges.value = res.age;
		}
	};

	let groupBar = async () => {
		await loadGroupBarData();
		if (!groupBarData.value || !groupBarDataAges.value) return;
		const { innerWidth: width, innerHeight: height } = window;
		const margin = { top: 40, right: 20, bottom: 20, left: 60 };
		const textHeight = 20;

		let svg = GroupBarChart<GroupBar>(groupBarData.value, {
			x: (d) => d.year,
			y: (d) => d.value,
			z: (d) => d.age,
			yLabel: '↑ 不知道什么数',
			zDomain: groupBarDataAges.value,
			colors: schemeSpectral[groupBarDataAges.value.length],
			marginBottom: margin.bottom,
			marginLeft: margin.left,
			marginRight: margin.right,
			marginTop: margin.top,
			width,
			height,
			title: (d, x, y, z) => {
				return `<span class="d3_tip-name">${x}年，年龄${z}的人有${y}</span>`;
			},
		});
		document.getElementsByClassName('chart_box')[0].appendChild(svg);
	};
	onMounted(async () => {
		await nextTick();
		singleBar();
		groupBar();
	});
</script>
