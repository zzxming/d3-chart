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

<script setup lang="ts">
	import Sunburst from '@/components/d3/SunBurst';
	import data from '@/assets/d3json/ZoomableSunburst.json';

	let loading = ref(true);
	let loadError = ref(false);
	let chart = ref();

	onMounted(async () => {
		loading.value = false;
		await nextTick();
		let svg = Sunburst(data, {
			value: (d) => d.value, // size of each node (file); null for internal nodes (folders)
			label: (d) => d.name, // display name for each cell
			title: (d, n) =>
				`${n
					.ancestors()
					.reverse()
					.map((d) => d.data.name)
					.join('.')}\n${n.value.toLocaleString('en')}`, // hover text
			// link: (d, n) =>
			// 	n.children
			// 		? `https://github.com/prefuse/Flare/tree/master/flare/src/${n
			// 				.ancestors()
			// 				.reverse()
			// 				.map((d) => d.data.name)
			// 				.join('/')}`
			// 		: `https://github.com/prefuse/Flare/blob/master/flare/src/${n
			// 				.ancestors()
			// 				.reverse()
			// 				.map((d) => d.data.name)
			// 				.join('/')}.as`,
			width: 1152,
			height: 1152,
		});

		chart.value.appendChild(svg);
	});
</script>

<style lang="less" scoped></style>
