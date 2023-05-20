<template>
	<div v-if="loading">loading</div>
	<div v-if="!loading && loadError">error</div>
	<div
		v-if="!loading && !loadError"
		class="box"
	></div>
</template>

<style lang="css">
	.box {
		position: relative;
		background-color: #333;
		width: 100vw;
		height: 100vh;
	}
	.location {
		display: none;
		position: absolute;
		padding: 4px;
		border-radius: 6px;
		background-color: #fff;
		font-size: 12px;
		fill: #fff;
	}
	.d3_tip {
		border-radius: 4px;
		border: 1px solid;
		padding: 4px 8px;
		background-color: #fff;
	}
	.d3_tip::after {
		position: absolute;
		left: 50%;
		top: 100%;
		content: '';
		display: block;
		/* width: 0;
		height: 0;
		border: 10px solid transparent;
		border-bottom-color: #fff;
		transform: rotateZ(180deg) translate(50%, 0); */
		box-sizing: border-box;
		width: 10px;
		height: 10px;
		background-color: #fff;
		border: 1px solid transparent;
		border-bottom-color: #000;
		border-right-color: #000;
		transform: rotate(45deg) translate(-50%, -2px);
	}
</style>

<script lang="ts" setup>
	import chinaMapProvinceNameData from '@/assets/d3json/chinaMap/chinaMapProvinceNameData.json';
	// import mapGeo from '../assets/d3json/chinaMap/xiaochimap.json';
	import * as GeoJSON from 'geojson';
	import * as d3 from 'd3';
	import { ZoomTransform } from 'd3';
	import d3Tip from 'd3-tip';

	interface D3ZoomEvent {
		sourceEvent: WheelEvent;
		transform: ZoomTransform;
		type: 'zoom';
	}

	let mapBox = ref<SVGAElement>();
	let loadError = ref(false);
	let loading = ref(true);
	// 原始只有省份边界的数据
	let originMapFeatures = ref<GeoJSON.Feature[]>([]);
	// 加载初始省份边界数据
	let loadMapProvinceData = async () => {
		loadError.value = false;
		loading.value = true;
		let chinaMapData = [];
		for (let i = 0; i < chinaMapProvinceNameData.length; i++) {
			let data = await import(`@/assets/d3json/chinaMap/wrap/${chinaMapProvinceNameData[i]}.json`);
			chinaMapData.push(data.default);
		}
		let data: GeoJSON.FeatureCollection[] | void = await Promise.all(chinaMapData).catch((err) => {
			console.log(err);
			loadError.value = true;
		});
		loading.value = false;

		if (!data) return null;
		return data.map((v) => v.features[0]);
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
		await nextTick();
		let features: GeoJSON.Feature[] | null = await loadMapProvinceData();
		if (!features) return;
		let map: GeoJSON.FeatureCollection = {
			type: 'FeatureCollection',
			features,
		};
		// 保存原始省份边界, 用于还原
		originMapFeatures.value = [...features];
		const box = document.getElementsByClassName('box')[0];
		const { clientWidth: width, clientHeight: height } = box;
		const margin = { top: 40, right: 20, bottom: 40, left: 40 };

		let strokeOriginWidth = 0.6;
		let svg = d3
			.select('.box')
			.append('svg')
			.attr('viewBox', [0, 0, width - margin.left - margin.right, height - margin.top - margin.bottom])
			.attr('stroke', '#c86a7a')
			.attr('stroke-width', strokeOriginWidth);
		// 地图投影
		let projection = d3
			.geoMercator()
			.center([105, 38])
			.scale(Math.min(width, height))
			.translate([width / 2, height / 2]);
		// geopath路径绘制
		let path = d3.geoPath().projection(projection);
		// 区域颜色
		// 建议使用固定颜色,否则在市级数据添加时,会导致颜色重新分配
		// let color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, map.features.length));

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
		let zoomHandle = (zoomEvent: D3ZoomEvent) => {
			const t = zoomEvent.transform;
			g.attr('transform', `translate(${t.x}, ${t.y}) scale(${t.k})`); //改变svg的位置及缩放
			g.selectAll('circle').attr('r', 2 / t.k);
			svg.attr('stroke-width', strokeOriginWidth / t.k);
			// if (t.k > 3) {
			//     g.selectAll("path")
			//         .data(mapJson.features)
			//         .join("path")
			//         .attr("fill", "rgb(245, 243, 204)")
			//         .attr("d", path)
			//         .attr("data-area", (d) => d.properties.parent.adcode)
			//         .attr("class", "area")
			//         .on("mouseover", function () {
			//             const area = d3.select(this);
			//             d3.selectAll(
			//                 `.${area.attr("class")}[data-area="${area.attr(
			//                     "data-area"
			//                 )}"]`
			//             ).attr("fill", enterColor);
			//         })
			//         .on("mouseout", function () {
			//             const area = d3.select(this);
			//             d3.selectAll(
			//                 `.${area.attr("class")}[data-area="${area.attr(
			//                     "data-area"
			//                 )}"]`
			//             ).attr("fill", originColor);
			//         })
			//         .append("title")
			//         .text((d) => {
			//             return d.properties.name;
			//         });
			// }
		};
		let d3zoom = d3.zoom().scaleExtent([1, 20]).on('zoom', zoomHandle); //设置监听事件
		svg.call(d3zoom as any);

		// tip调用和this执行有关, 在on监听时要改变this指向
		let tips = (d3Tip as Function)()
			.attr('class', 'd3_tip')
			.offset([0, 10])
			.html((d: GeoJSON.Feature) => `<span class="d3_tip-name">${d.properties?.name ?? '没有名字'}</span>`);
		svg.call(tips);

		let update = (data: GeoJSON.Feature[]) => {
			//  使用join可以保证新path成功添加, 但原来其他的path不删除
			// 注意此处会有元素复用,可以插入一个title元素就知道了
			console.log(data);
			province
				.data(data)
				.join('path')
				// .attr('opacity', '0.6')
				.attr('fill', '#fcf9f2')
				.attr('d', path)
				// 会有新元素添加,需要重写绑定事件
				.on('mouseenter', mouseenter)
				.on('mouseleave', mouseleave)
				.on('click', loadInside)

				.exit()
				.remove();
			// .append('title')
			// .text((d) => d.properties.name);
		};

		function mouseenter(this: SVGPathElement, e: any, d: GeoJSON.Feature) {
			tips.show.call(this, d);
			// d3.select(this).attr('opacity', '1');
		}
		function mouseleave(this: SVGPathElement, e: any, d: GeoJSON.Feature) {
			tips.hide.call(this, d);
			// d3.select(this).attr('opacity', '0.6');
		}
		async function loadInside(e: any, d: GeoJSON.Feature) {
			if (!d.properties?.name) {
				console.log('没有此地图数据');
				return;
			}
			let cityData = await import(`@/assets/d3json/chinaMap/inside/${d.properties?.name}.json`);
			// console.log(cityData.default);
			let newData = reaplaceData(d.properties.adcode, cityData.default);
			// console.log(newData);
			if (newData.length < 1) {
				return;
			}
			// 更新数据
			update(newData);
		}
		// let box = d3.select(mapBox.value);
		// let svg = d3
		// 	.select(mapBox.value)
		// 	.append('svg')
		// 	.attr('width', '800px')
		// 	.attr('height', '500px')
		// 	.attr('style', 'background-color:#999');
		// let projection = d3
		// 	.geoMercator()
		// 	.center([105, 38])
		// 	.scale(height / 2)
		// 	.translate([width / 2, height / 2]);
		// let path = d3.geoPath().projection(projection);
		// let color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, map.features.length));
		// // d3.json('http://cdn.a4z.cn/json/china.geojson').then((data) => {
		// d3.json('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full').then((data) => {
		// 	// d3.json('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000').then((data) => {
		// 	let map = data as GeoJSON.FeatureCollection;
		// 	let color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, map.features.length));
		// 	// console.log(map);
		// 	svg.selectAll('path')
		// 		.data(map.features)
		// 		.enter()
		// 		.append('path')
		// 		.attr('d', path)
		// 		.attr('fill', function (d) {
		// 			let cityName: string = d.properties?.name ?? '没有名字';
		// 			return color(cityName) as string;
		// 		})
		// 		.attr('stroke', 'white')
		// 		.on('mouseenter', function (e, d) {
		// 			d3.select(this).attr('opacity', '0.7').attr('stroke', 'black');
		// 			// let coor = projection(d.properties?.cp ?? [0, 0]) ?? [0, 0];
		// 			// box.select('.location')
		// 			// 	.attr('style', `display:block;left:${coor[0]}px;top:${coor[1]}px`)
		// 			// 	.text(d.properties?.name ?? '没有名字');
		// 		})
		// 		.on('mouseleave', function (e, d) {
		// 			d3.select(this).attr('opacity', '1').attr('stroke', 'white');
		// 			// box.select('.location').attr('style', 'display:none');
		// 		});
		// 	box.append('div').attr('class', 'location');
		// });
		// svg.selectAll('path')
		// 	.data(map.features)
		// 	.join('path')
		// 	.attr('d', path)
		// 	.attr('fill', function (d) {
		// 		let cityName: string = d.properties?.name ?? '没有名字';
		// 		return color(cityName) as string;
		// 	})
		// 	.on('mouseenter', function (d) {
		// 		d3.select(this).attr('opacity', '0.7').attr('stroke', 'black');
		// 	})
		// 	.on('mouseleave', function (d) {
		// 		d3.select(this).attr('opacity', '1').attr('stroke', 'white');
		// 	})
		// 	.attr('stroke', 'white')
		// 	.attr('stroke-width', '1')
		// 	.append('title')
		// 	.text((d) => d.properties?.name ?? '没有名字');
		// svg.selectAll('.location')
		// 	.data(map.features)
		// 	.join('g')
		// 	.attr('class', 'location')
		// 	.attr('transform', function (d) {
		// 		// if (!d.properties?.center) return;
		// 		// let coor = projection(d.properties?.center) ?? [0, 0];
		// 		let coor = projection(d.properties?.cp) ?? [0, 0];
		// 		return `translate(${coor[0]}, ${coor[1]})`;
		// 	})
		// 	.append('circle')
		// 	.attr('r', 4)
		// 	.attr('fill', 'white')
		// 	.attr('stroke', 'black');
	});
</script>
