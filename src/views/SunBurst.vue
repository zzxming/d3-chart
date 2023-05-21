<template>
	<div class="mid">
		<div v-if="loading">loading</div>
		<div v-if="!loading && loadError">error</div>
		<div
			v-if="!loading && !loadError"
			class="chart_box"
		></div>
	</div>
</template>

<style lang="less" scoped>
	.chart_box {
		background-color: #fff;
	}

	// .d3-tip {
	// 		position: relative;
	// 		background-color: #000;
	// 		color: #fff;
	// 		border-radius: 6px;
	// 		padding: 4px;
	// 		&::after {
	// 			content: '';
	// 			display: block;
	// 			background-color: #000;
	// 			width: 12px;
	// 			height: 12px;
	// 			position: absolute;
	// 			left: 50%;
	// 			transform: rotateZ(45deg) translateX(-50%);
	// 		}
	// 	}
</style>

<script lang="ts" setup>
	import * as d3 from 'd3';
	import d3Tip from 'd3-tip';

	interface SunDataWitchChildren {
		name: string;
		children: SunRootData[] | SunDataWitchChildren[];
	}
	interface SunRootData {
		name: string;
		value: number;
	}
	type Data = SunDataWitchChildren | SunRootData;
	// 类型保护函数
	function isSunDataRoot(data: Data): data is SunDataWitchChildren {
		return 'children' in data;
	}

	let loading = ref(true);
	let loadError = ref(false);
	let data = ref<Data>();

	let format = d3.format(',d');
	let tips = ref(
		(d3Tip as any)()
			.attr('class', 'd3_tip')
			.html(
				(e: MouseEvent, d: d3.HierarchyRectangularNode<Data>) => `
			            <strong>${d.data.name}<strong>
			            <span>${format(d.value || 0)}</span>
			        `
			)
	);
	// 加载数据
	let loadData = async () => {
		let res = await new Promise<Data>(async (resolve, reject) => {
			resolve((await import('../assets/d3json/ZoomableSunburst.json')).default as Data);
		}).catch((err) => {
			console.log(err);
			loadError.value = true;
		});
		loading.value = false;
		if (res) {
			data.value = res;
		}
	};

	onMounted(async () => {
		await nextTick();
		await loadData();
		if (!data.value) return;

		const { innerWidth: width, innerHeight: height } = window;
		let radius = width / 10;

		let color = d3.scaleOrdinal(
			d3.quantize(d3.interpolateRainbow, (data.value as SunDataWitchChildren).children.length + 1)
		);
		let arc = d3
			.arc<d3.HierarchyRectangularNode<Data>['current']>()
			.startAngle((d) => d.x0)
			.endAngle((d) => d.x1)
			.padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
			.padRadius(radius * 1.5)
			.innerRadius((d) => d.y0 * radius)
			.outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

		let partition = (data: Data) => {
			const root = d3
				.hierarchy(data)
				.sum((d) => (isSunDataRoot(d) ? 0 : d.value))
				.sort((a, b) => (b?.value ?? 0) - (a?.value ?? 0));

			return d3.partition<Data>().size([2 * Math.PI, root.height + 1])(root);
		};
		const root = partition(data.value);
		root.each((d) => (d.current = d));

		const svg = d3.select('.chart_box').append('svg').attr('viewBox', [0, 0, width, height]).attr('width', width);
		const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

		g.call(tips.value);

		const path = g
			.append('g')
			.selectAll('path')
			.data(root.descendants().slice(1))
			.join('path')
			.attr('fill', (d) => {
				// depth > 1 保证有 parent
				while (d.depth > 1) d = d.parent as typeof d;
				return color(d.data.name);
			})
			.attr('fill-opacity', (d) => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
			.attr('pointer-events', (d) => (arcVisible(d.current) ? 'auto' : 'none'))
			.attr('d', (d) => arc(d.current))
			.on('mouseover', tips.value.show)
			.on('mouseout', tips.value.hide);

		path.filter((d) => !!d.children)
			.style('cursor', 'pointer')
			.on('click', clicked);

		// path.append('title').text((d) => {
		// 	return `${d
		// 		.ancestors()
		// 		.slice(0, -1)
		// 		.map((d) => d.data.name)
		// 		.reverse()
		// 		.join('/')}\n${format(d.value)}`;
		// });

		const label = g
			.append('g')
			.attr('pointer-events', 'none')
			.attr('text-anchor', 'middle')
			.style('user-select', 'none')
			.selectAll('text')
			.data(root.descendants().slice(1))
			.join('text')
			.attr('dy', '0.35em')
			.attr('fill-opacity', (d) => +labelVisible(d.current))
			.attr('transform', (d) => labelTransform(d.current))
			// 根据层级改变字体大小
			.attr('style', (d) => {
				return `font-size: ${0.5 ** d.depth * 8 + 10}px`;
			})
			.text((d) => d.data.name);

		g.append('text').text('go back').attr('text-anchor', 'middle').style('user-select', 'none');

		const parent = g
			.append('circle')
			.datum(root)
			.attr('r', radius)
			.attr('fill', 'none')
			.attr('pointer-events', 'all')
			.on('click', clicked);

		function clicked(e: MouseEvent, p: d3.HierarchyRectangularNode<Data>) {
			parent.datum(p.parent || root);

			root.each((d) => {
				return (d.target = {
					x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
					x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
					y0: Math.max(0, d.y0 - p.depth),
					y1: Math.max(0, d.y1 - p.depth),
				});
			});

			const t = g.transition().duration(750);

			// Transition the data on all arcs, even the ones that aren’t visible,
			// so that if this transition is interrupted, entering arcs will start
			// the next transition from the desired position.
			// 使用 this 的时候注意, 使用一个变量接受, 并明确指明类型, 否则 function 容易报错
			path.transition(t as unknown as d3.Transition<d3.BaseType, d3.HierarchyRectangularNode<Data>, any, any>)
				.tween('data', (d) => {
					const i = d3.interpolate(d.current, d.target);
					return (t) => (d.current = i(t));
				})
				.filter(function (d) {
					let self = this as SVGGElement;
					return Boolean(Number(self.getAttribute('fill-opacity')) || labelVisible(d.target));
				})
				.attr('fill-opacity', (d) => (arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0))
				.attr('pointer-events', (d) => (arcVisible(d.target) ? 'auto' : 'none'))
				// attrTween(name: string, factory: ValueFn<GElement, Datum, (this: GElement, t: number) => string>): this;
				.attrTween('d', (d) => () => arc(d.current) as string);

			label
				.filter(function (d) {
					let self = this as SVGGElement;
					return Boolean(Number(self.getAttribute('fill-opacity')) || labelVisible(d.target));
				})
				.transition(t as unknown as d3.Transition<d3.BaseType, d3.HierarchyRectangularNode<Data>, any, any>)
				.attr('fill-opacity', (d) => +labelVisible(d.target))
				.attrTween('transform', (d) => () => labelTransform(d.current));
		}

		function arcVisible(d: d3.HierarchyRectangularNode<Data>['target']) {
			return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
		}

		function labelVisible(d: d3.HierarchyRectangularNode<Data>['target']) {
			return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
		}

		function labelTransform(d: d3.HierarchyRectangularNode<Data>['current']) {
			const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
			const y = ((d.y0 + d.y1) / 2) * radius;
			return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
		}
	});
</script>
