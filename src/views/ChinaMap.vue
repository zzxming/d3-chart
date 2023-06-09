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

<style lang="less">
	.location {
		display: none;
		position: absolute;
		padding: 4px;
		border-radius: 6px;
		background-color: #fff;
		font-size: 12px;
		fill: #fff;
	}
</style>

<script lang="ts" setup>
	import * as GeoJSON from 'geojson';
	import {
		geoPath,
		scaleOrdinal,
		quantize,
		interpolateRainbow,
		zoom,
		BaseType,
		select,
		selectAll,
		geoMercator,
	} from 'd3';
	import d3Tip from 'd3-tip';

	import LoadingTip from '@/components/LoadingTip.vue';
	import { D3ZoomEvent } from '@/interface';
	import axios from '@/assets/api';

	let { data: chinaMapProvinceNameData } = await axios.get('/d3json/chinaMap/chinaMapProvinceNameData.json');

	const chart = ref();

	let loadError = ref(false);
	let loading = ref(true);
	// 原始只有省份边界的数据
	let originMapFeatures = shallowRef<GeoJSON.Feature[]>([]);
	// tip调用和this执行有关, 在on监听时要改变this指向
	let tips = ref(
		(d3Tip as Function)()
			.attr('class', 'd3_tip')
			.offset([0, 10])
			.html((d: GeoJSON.Feature) => `<span class="d3_tip-name">${d.properties?.name ?? '没有名字'}</span>`)
	);
	// 加载初始省份边界数据
	let loadData = async () => {
		loadError.value = false;
		loading.value = true;
		let chinaMapData = [];
		// 循环加载所有省级数据
		for (let i = 0; i < chinaMapProvinceNameData.length; i++) {
			let data = axios.get(`/d3json/chinaMap/wrap/${chinaMapProvinceNameData[i]}.json`);
			chinaMapData.push(data);
		}
		let data: GeoJSON.FeatureCollection[] | void = await Promise.all(chinaMapData)
			.then((res) => res.map((v) => v.data))
			.catch((err) => {
				console.log(err);
				loadError.value = true;
			});
		loading.value = false;

		if (data) {
			originMapFeatures.value = data.map((v) => v.features[0]);
		}
	};
	// 使用市级数据替换省级数据
	let reaplaceData = (adcode: number, data: GeoJSON.FeatureCollection) => {
		if (originMapFeatures.value.length < 1) {
			console.log('原始数据依赖不存在, 无法获取新数据');
			return [];
		}
		let newData: GeoJSON.Feature[] = [...originMapFeatures.value];
		let i = newData.findIndex((d) => d.properties?.adcode === adcode);
		newData.splice(i, 1, ...data.features);
		return newData;
	};
	onMounted(async () => {
		await loadData();
		if (!originMapFeatures.value) return;
		let map: GeoJSON.FeatureCollection = {
			type: 'FeatureCollection',
			features: unref(originMapFeatures.value),
		};

		// 等待页面挂载完成，可以获取 dom 信息
		await nextTick();
		const { innerWidth: width, innerHeight: height } = window;
		const margin = { top: 40, right: 20, bottom: 40, left: 40 };

		let strokeOriginWidth = 0.6;
		let minZoom = 1;
		let maxZoom = 20;

		let svg = select(chart.value)
			.append('svg')
			.attr('viewBox', [0, 0, width - margin.left - margin.right, height - margin.top - margin.bottom])
			.attr('stroke', '#c86a7a')
			.attr('stroke-width', strokeOriginWidth);
		// 地图投影
		let projection = geoMercator()
			.center([105, 38])
			.scale(Math.min(width, height))
			.translate([width / 2, height / 2]);
		// geopath路径绘制
		let path = geoPath().projection(projection);
		// 区域颜色
		// 建议使用固定颜色,否则在市级数据添加时,会导致颜色重新分配
		// let color = scaleOrdinal().range(quantize(interpolateRainbow, map.features.length));
		// 绘制边界
		let g = svg.append('g');
		let province = g
			.selectAll('path')
			.data(map.features)
			.enter()
			.append('path')
			// .attr('opacity', '0.6')
			// .attr('fill', (d) => color(d.properties?.name ?? '没有名字') as string)
			.attr('fill', '#fcf9f2')
			.attr('d', path)
			.on('mouseenter', mouseenter)
			.on('mouseleave', mouseleave)
			.on('click', loadInside);
		// province.append('title').text((d) => d.properties.name);
		// 放大和拖动
		let zoomHandle = (event: D3ZoomEvent) => {
			const t = event.transform;
			g.attr('transform', `translate(${t.x}, ${t.y}) scale(${t.k})`); // 改变svg的位置及缩放
			g.selectAll('circle').attr('r', 2 / t.k);
			svg.attr('stroke-width', strokeOriginWidth / t.k);
		};
		let d3zoom = zoom().scaleExtent([minZoom, maxZoom]).on('zoom', zoomHandle); // 设置缩放大小和监听事件
		svg.call(d3zoom as any);
		// 挂载d3-tip
		svg.call(tips.value);

		let update = (data: GeoJSON.Feature[]) => {
			// 这里要使用 g.selectAll 而不能用 province, 使用 province 会导致老的 path 删除不了, 使 g 内的 path 个数点一次增加一次
			// 注意此处会有元素复用,可以插入一个title元素就知道了
			g.selectAll('path')
				.data(data)
				.join('path')
				// .attr('opacity', '0.6')
				.attr('fill', '#fcf9f2')
				.attr('d', path)
				// 会有新元素添加,需要重写绑定事件
				.on('mouseenter', mouseenter)
				.on('mouseleave', mouseleave)
				.on('click', loadInside);

			// .exit()
			// .remove();
			// .append('title')
			// .text((d) => d.properties.name);
		};

		function mouseenter(this: BaseType | SVGPathElement, e: any, d: GeoJSON.Feature) {
			tips.value.show.call(this, d);
			// select(this).attr('opacity', '1');
		}
		function mouseleave(this: BaseType | SVGPathElement, e: any, d: GeoJSON.Feature) {
			tips.value.hide.call(this, d);
			// select(this).attr('opacity', '0.6');
		}
		// 加载市级数据
		async function loadInside(e: any, d: GeoJSON.Feature) {
			if (d.properties?.level !== 'province') return;
			if (!d.properties?.name) {
				console.log('没有此地图数据');
				return;
			}
			let cityData = await axios.get(`/d3json/chinaMap/inside/${d.properties?.name}.json`);
			// console.log(cityData.default);
			let newData = reaplaceData(d.properties.adcode, cityData.data);
			// console.log(newData);
			if (newData.length < 1) {
				return;
			}
			// 更新数据
			update(newData);
		}
	});
	onUnmounted(() => {
		tips.value.destroy();
	});
</script>
