<template>
	<div
		ref="box"
		class="box"
	></div>
</template>

<style lang="css">
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
	}
	.d3-tip {
		position: relative;
		background-color: #000;
		color: #fff;
		border-radius: 6px;
		padding: 4px;
	}
	.d3-tip::after {
		content: '';
		display: block;
		background-color: #000;
		width: 12px;
		height: 12px;
		position: absolute;
		left: 50%;
		transform: rotateZ(45deg) translateX(-50%);
	}
</style>

<script setup>
	import sunData from '../assets/d3json/ZoomableSunburst.json';
	import * as d3 from 'd3';
	import d3Tip from 'd3-tip';
	// type SunData = typeof sunData;
	// type SunRootData = { name: string; value: number };

	let box = ref();

	let partition = (data) => {
		const root = d3
			.hierarchy(data)
			.sum((d) => d.value)
			.sort((a, b) => b.value - a.value);
		return d3.partition().size([2 * Math.PI, root.height + 1])(root);
	};
	let format = d3.format(',d');
	let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, sunData.children.length + 1));

	onMounted(() => {
		nextTick(() => {
			if (!box.value) return;
			let width = box.value.clientWidth;
			let height = box.value.clientHeight;
			let radius = width / 10;

			let arc = d3
				.arc()
				.startAngle((d) => d.x0)
				.endAngle((d) => d.x1)
				.padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
				.padRadius(radius * 1.5)
				.innerRadius((d) => d.y0 * radius)
				.outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

			const root = partition(sunData);
			root.each((d) => (d.current = d));
			const svg = d3.select(box.value).append('svg').attr('viewBox', [0, 0, width, height]).attr('width', width);

			const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

			let tip = d3Tip()
				.attr('class', 'd3-tip')
				.html(function (e, d) {
					return `
			            <strong>${d.data.name}<strong>
			            <span>${format(d.value)}</span>
			        `;
				});
			g.call(tip);

			const path = g
				.append('g')
				.selectAll('path')
				.data(root.descendants().slice(1))
				.join('path')
				.attr('fill', (d) => {
					while (d.depth > 1) d = d.parent;
					return color(d.data.name);
				})
				.attr('fill-opacity', (d) => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
				.attr('pointer-events', (d) => (arcVisible(d.current) ? 'auto' : 'none'))
				.attr('d', (d) => arc(d.current))
				.on('mouseover', tip.show)
				.on('mouseout', tip.hide);

			path.filter((d) => d.children)
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
				.attr('transform', (d) => {
					return labelTransform(d.current);
				})
				.attr('style', (d) => {
					return `font-size: ${0.5 ** d.depth * 8 + 10}px`;
				})
				.text((d) => d.data.name);

			g.append('text')
				.text('go back')
				.attr('text-anchor', 'middle')
				.style('user-select', 'none')
				.on('click', clicked);
			const parent = g
				.append('circle')
				.datum(root)
				.attr('r', radius)
				.attr('fill', 'none')
				.attr('pointer-events', 'all')
				.on('click', clicked);

			function clicked(event, p) {
				parent.datum(p.parent || root);

				root.each(
					(d) =>
						(d.target = {
							x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
							x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
							y0: Math.max(0, d.y0 - p.depth),
							y1: Math.max(0, d.y1 - p.depth),
						})
				);

				const t = g.transition().duration(750);

				// Transition the data on all arcs, even the ones that aren’t visible,
				// so that if this transition is interrupted, entering arcs will start
				// the next transition from the desired position.
				path.transition(t)
					.tween('data', (d) => {
						const i = d3.interpolate(d.current, d.target);
						return (t) => (d.current = i(t));
					})
					.filter(function (d) {
						return +this.getAttribute('fill-opacity') || arcVisible(d.target);
					})
					.attr('fill-opacity', (d) => (arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0))
					.attr('pointer-events', (d) => (arcVisible(d.target) ? 'auto' : 'none'))

					.attrTween('d', (d) => () => arc(d.current));

				label
					.filter(function (d) {
						return +this.getAttribute('fill-opacity') || labelVisible(d.target);
					})
					.transition(t)
					.attr('fill-opacity', (d) => +labelVisible(d.target))
					.attrTween('transform', (d) => () => labelTransform(d.current));
			}

			function arcVisible(d) {
				return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
			}

			function labelVisible(d) {
				return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
			}

			function labelTransform(d) {
				const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
				const y = ((d.y0 + d.y1) / 2) * radius;
				return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
			}
		});
	});
</script>
