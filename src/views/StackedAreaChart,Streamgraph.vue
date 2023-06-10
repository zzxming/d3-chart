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

<style lang="less" scoped></style>

<script lang="ts" setup>
	import Streamgraph from '@/components/d3/Streamgraph';
	import axios from '@/assets/api';

	interface Data {
		date: string;
		industry: string;
		unemployed: number;
	}

	const chart = ref();

	let loading = ref(true);
	let loadError = ref(false);

	let data = shallowRef<Data[]>([]);
	let loadData = async () => {
		let res = await axios.get(`/d3json/StackedAreaChart,Streamgraph.json`).catch((err) => {
			console.log(err);
			loadError.value = true;
		});

		loading.value = false;
		if (res) {
			data.value = res.data;
		}
	};
	onMounted(async () => {
		await loadData();
		if (!data.value.length) return;
		await nextTick();
		const { innerWidth: width, innerHeight: height } = window;
		const margin = { top: 40, right: 20, bottom: 40, left: 40 };

		let svg = Streamgraph<Data, Date, number, string>(unref(data), {
			x: (d) => new Date(d.date),
			y: (d) => d.unemployed,
			z: (d) => d.industry,
			yLabel: '↑ Unemployed persons',
			width,
			height,
		});
		document.getElementsByClassName('chart_box')[0].appendChild(svg);
	});
</script>
