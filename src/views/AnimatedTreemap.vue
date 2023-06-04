<template>
	<LoadingTip
		:loading="loading"
		:loadError="loadError"
	>
		<div class="chart_box"></div>
	</LoadingTip>
</template>

<style lang="less" scoped>
	.mid {
		flex-direction: column;
	}
</style>

<script lang="ts" setup>
	import {
		range,
		csv,
		tsv,
		InternMap,
		group as d3group,
		treemap as d3treemap,
		treemapResquarify,
		hierarchy,
		sum,
		max as d3max,
		create,
		easeLinear,
		format,
		interpolate,
		scaleOrdinal,
		schemeCategory10,
		interpolateRgb,
		HierarchyRectangularNode as d3HierarchyRectangularNode,
		Selection,
		BaseType,
	} from 'd3';
	import Scrubber from '@/components/d3/Scrubber';

	interface HierarchyRectangularNode<T> extends d3HierarchyRectangularNode<T>, ID {}

	interface Region {
		Division: string;
		Region: string;
		State: string;
		'State Code': string;
	}
	interface States {
		name: string;
		values: number[];
	}
	type Uid = {
		id: string;
		href: string;
	};
	type ID = {
		leafUid?: Uid;
		clipUid?: Uid;
	};
	type Group = InternMap<string, InternMap<string, States[]>> & ID;
	interface Data {
		keys: number[];
		group: Group;
	}
	interface InnerData {
		name: string;
		values: number[];
	}

	let loading = ref(true);
	let loadError = ref(false);
	let data = ref<Data>();

	let loadData = async () => {
		const keys = range(1790, 2000, 10);
		let res = await Promise.all([
			csv('/src/assets/d3json/animatedTreemap/census-regions.csv'),
			tsv('/src/assets/d3json/animatedTreemap/population.tsv'),
		])
			.then(([regions, states]) => {
				let statesFormated: States[] = states.slice(1).map((item) => ({
					name: item[''] as string,
					values: keys.map((key) => Number((item[key] ?? '').replace(/,/g, ''))),
				}));

				let regionsFormated = [...regions] as unknown as Region[];
				return [regionsFormated, statesFormated];
			})
			.catch((err) => {
				console.log(err);
				loadError.value = true;
			});

		loading.value = false;
		if (!res) {
			return;
		}
		let [regions, states] = res as [Region[], States[]];
		const regionByState = new Map(regions.map((d) => [d.State, d.Region]));
		const divisionByState = new Map(regions.map((d) => [d.State, d.Division]));

		data.value = {
			keys,
			group: d3group(
				states,
				(d) => regionByState.get(d.name) as string,
				(d) => divisionByState.get(d.name) as string
			),
		};
	};

	onMounted(async () => {
		await loadData();
		if (!data.value) return;
		await nextTick();

		// 用于生成 clip-path 使用的 id
		let Zn = 0;
		function Xn(e: string) {
			return Qn('O-' + (null == e ? '' : e + '-') + ++Zn);
		}
		function Qn(e: string): Uid {
			return {
				id: e,
				href: new URL(`#${e}`, location.href).href + '',
			};
		}

		let duration = 2500;
		let treemapData = data.value;

		let ob = Scrubber(range(treemapData.keys.length), {
			autoplay: false,
			delay: duration,
			loop: false,
			format: (i) => treemapData.keys[i],
		});

		const chart_box = document.getElementsByClassName('chart_box')[0];
		let preObservablehq = document.getElementsByClassName('observablehq')[0];
		preObservablehq?.parentElement?.removeChild(preObservablehq);

		let observablehq = document.createElement('div');
		observablehq.classList.add('observablehq');

		observablehq.appendChild(ob);
		chart_box.parentElement?.insertBefore(observablehq, chart_box);

		let sums = treemapData.keys.map(
			(d, i) =>
				hierarchy(treemapData.group).sum((d) => {
					let dVal = d.values;
					if (Array.isArray(dVal)) {
						return dVal[i];
					}
					return 0;
				}).value ?? 0
		);
		let max = d3max(sums) ?? 1;

		const { innerWidth: width, innerHeight: height } = window;
		const margin = { top: 40, right: 20, bottom: 40, left: 40 };

		const treemap = d3treemap<Group>()
			.tile(treemapResquarify)
			.size([width, height])
			.padding((d) => (d.height === 1 ? 1 : 0))
			.round(true);

		const root = treemap(
			hierarchy(treemapData.group)
				.sum((d) => {
					let dVal = d.values;
					if (Array.isArray(dVal)) {
						return sum(dVal);
					}
					return 0;
				})
				.sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
		);

		const svg = create('svg')
			.attr('viewBox', `0 -20 ${width} ${height + 20}`)
			.attr('font-family', 'sans-serif')
			.attr('font-size', 10)
			.style('overflow', 'visible');

		// '9,231' 的字符串数字转真实数字
		let formatNumber = format(',d');

		// 绘制年份总数的方框
		const box = svg
			.append('g')
			.selectAll('g')
			.data(
				treemapData.keys
					.map((key, i) => {
						const value =
							root.sum((d) => {
								let dVal = d.values;
								if (Array.isArray(dVal)) {
									return dVal[i];
								}
								return 0;
							}).value ?? 0;
						return { key, value, i, k: Math.sqrt(value / max) };
					})
					.reverse()
			)
			.join('g')
			.attr('transform', ({ k }) => `translate(${((1 - k) / 2) * width},${((1 - k) / 2) * height})`)
			.attr('opacity', ({ i }) => (i >= ob.value ? 1 : 0))
			.call((g) =>
				g
					.append('text')
					.attr('y', -6)
					.attr('fill', '#777')
					.selectAll('tspan')
					.data(({ key, value }) => [key, ` ${formatNumber(value)}`])
					.join('tspan')
					.attr('font-weight', (d, i) => (i === 0 ? 'bold' : null))
					.text((d) => d)
			)
			.call((g) =>
				g
					.append('rect')
					.attr('fill', 'none')
					.attr('stroke', '#ccc')
					.attr('width', ({ k }) => k * width)
					.attr('height', ({ k }) => k * height)
			);

		// 使后续可以获取到添加的 leafUid 和 clipUid 属性, 不加也不影响显示
		const leaf: Selection<SVGGElement | BaseType, HierarchyRectangularNode<Group>, SVGGElement, any> = svg
			.append('g')
			.selectAll('g')
			.data(layout(ob.value))
			.join('g')
			.attr('transform', (d) => `translate(${d.x0},${d.y0})`);

		let color = scaleOrdinal(
			treemapData.group.keys(),
			schemeCategory10.map((d) => interpolateRgb(d, 'white')(0.5))
		);

		// 绘制动画的显示方块
		leaf.append('rect')
			.attr('id', (d) => (d.leafUid = Xn('leaf')).id)
			.attr('fill', (d) => {
				while (d.depth > 1) d = d.parent as HierarchyRectangularNode<Group>;
				let data = d.data;
				if (Array.isArray(data)) {
					return color(data[0]);
				}
				return color('');
			})
			.attr('width', (d) => d.x1 - d.x0)
			.attr('height', (d) => d.y1 - d.y0);

		// 显示的文本内容, 使用 clip-path 属性获取文本内容
		leaf.append('clipPath')
			.attr('id', (d) => (d.clipUid = Xn('clip')).id)
			.append('use')
			.attr('xlink:href', (d) => d.leafUid?.href ?? '');

		// 绘制显示的文本内容
		leaf.append('text')
			.attr('clip-path', (d) => `url(${d.clipUid?.href ?? ''})`) // 加了 url() 就可以使文字超出不显示
			.selectAll('tspan')
			.data((d) => {
				let data = d.data as unknown as InnerData;
				return [data.name, formatNumber(d.value ?? 0)];
			})
			.join('tspan')
			.attr('x', 3)
			.attr('y', (d, i, nodes) => `${Number(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
			.attr('fill-opacity', (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
			.text((d) => d);

		// leaf.append('title').text((d) => d.data.name);

		// 根据下标更新数据
		function layout(index: number) {
			const k = Math.sqrt(
				(root.sum((d) => {
					let dVal = d.values;
					if (Array.isArray(dVal)) {
						return dVal[index];
					}
					return 0;
				}).value ?? 0) / max
			);
			const x = ((1 - k) / 2) * width;
			const y = ((1 - k) / 2) * height;
			return treemap
				.size([width * k, height * k])(root)
				.each((d) => ((d.x0 += x), (d.x1 += x), (d.y0 += y), (d.y1 += y)))
				.leaves();
		}

		let parseNumber = (str: string) => +str.replace(/,/g, '');
		// 根据年份更新数据
		let update = () => {
			// 获取年份
			let index = ob.i.value;
			box.transition()
				.duration(duration)
				.attr('opacity', ({ i }) => (i >= index ? 1 : 0));

			leaf.data(layout(index))
				.transition()
				.duration(duration)
				.ease(easeLinear)
				.attr('transform', (d) => `translate(${d.x0},${d.y0})`)
				.call((leaf) =>
					leaf
						.select('rect')
						.attr('width', (d) => d.x1 - d.x0)
						.attr('height', (d) => d.y1 - d.y0)
				)
				.call((leaf) =>
					leaf.select('text tspan:last-child').tween('text', function (d) {
						let self = this as SVGTSpanElement;
						const i = interpolate(parseNumber(self.textContent ?? ''), d.value ?? 0);
						return function (t) {
							self.textContent = formatNumber(i(t));
						};
					})
				);
		};
		ob.addEventListener('input', update);
		chart_box.appendChild(svg.node() as SVGSVGElement);
	});
</script>
