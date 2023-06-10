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

<style lang="less" scoped>
	.chart_box {
		background-color: #fff;
	}
</style>

<script setup lang="ts">
	import Sunburst from '@/components/d3/SunBurst';
	import axios from '@/assets/api';

	interface SunDataWitchChildren {
		name: string;
		children: SunRootData[] | SunDataWitchChildren[];
	}
	interface SunRootData {
		name: string;
		value: number;
	}
	type Data = SunDataWitchChildren | SunRootData;

	function isSunDataRoot(data: Data): data is SunDataWitchChildren {
		return 'children' in data;
	}

	let chart = ref();
	let loading = ref(true);
	let loadError = ref(false);
	let data = ref<Data>();

	let loadData = async () => {
		let res = await new Promise<Data>(async (resolve, reject) => {
			resolve((await axios.get('/d3json/ZoomableSunburst.json')).data as Data);
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

		let chartData = data.value;

		let svg = Sunburst<Data>(chartData, {
			value: (d) => (isSunDataRoot(d) ? 0 : d.value), // size of each node (file); null for internal nodes (folders)
			label: (d) => d.name, // display name for each cell
			title: (d, n) =>
				`${n
					.ancestors()
					.reverse()
					.map((d) => d.data.name)
					.join('.')}\n${isSunDataRoot(d) ? '' : d.value.toLocaleString('en')}`, // hover text
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
