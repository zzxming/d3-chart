import {
	stackOffsetWiggle,
	stackOrderInsideOut,
	schemeTableau10,
	map,
	extent,
	InternSet,
	range,
	stack,
	rollup,
	axisBottom,
	area as d3area,
	create,
	InternMap,
	scaleUtc,
	scaleOrdinal,
	scaleLinear,
	Numeric,
} from 'd3';
import d3Tip from 'd3-tip';

interface Options<
	DT,
	XT extends Numeric,
	YT extends Numeric,
	ZT extends string,
	xTypeType extends (...args: any[]) => any = typeof scaleUtc,
	yTypeType extends (...args: any[]) => any = typeof scaleLinear,
	offsetType extends (...args: any[]) => any = typeof stackOffsetWiggle,
	orderType extends (...args: any[]) => any = typeof stackOrderInsideOut
> {
	x: (value: DT, index: number, iterable: Iterable<DT>) => XT;
	y: (value: DT, index: number, iterable: Iterable<DT>) => YT; // given d in data, returns the (quantitative) y-value
	z: (value: DT, index: number, iterable: Iterable<DT>) => ZT; // given d in data, returns the (categorical) z-value
	marginTop?: number; // top margin, in pixels
	marginRight?: number; // right margin, in pixels
	marginBottom?: number; // bottom margin, in pixels
	marginLeft?: number; // left margin, in pixels
	width?: number; // outer width, in pixels
	height?: number; // outer height, in pixels
	xType?: xTypeType; // type of x-scale
	xDomain?: [XT, XT]; // [xmin, xmax]
	xRange?: [number, number]; // [left, right]
	yType?: yTypeType; // type of y-scale
	yDomain?: [YT, YT]; // [ymin, ymax]
	yRange?: [number, number]; // [bottom, top]
	zDomain?: ZT[]; // array of z-values
	offset?: offsetType; // stack offset method
	order?: orderType; // stack order method
	xFormat?: string; // a format specifier string for the x-axis
	yLabel?: string; // a label for the y-axis
	colors?: readonly string[];
}
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/streamgraph
/** 使用非默认参数 xType、yType、offset、order 时, 传入调用函数类型, 用于识别调用类型 */
export default function Streamgraph<
	DT,
	XT extends Numeric,
	YT extends number,
	ZT extends string,
	xTypeType extends (...args: any[]) => any = typeof scaleUtc,
	yTypeType extends (...args: any[]) => any = typeof scaleLinear,
	offsetType extends (...args: any[]) => any = typeof stackOffsetWiggle,
	orderType extends (...args: any[]) => any = typeof stackOrderInsideOut
>(data: DT[], options: Options<DT, XT, YT, ZT, xTypeType, yTypeType, offsetType, orderType>) {
	let {
		x,
		y,
		z,
		marginTop = 20,
		marginRight = 30,
		marginBottom = 30,
		marginLeft = 20,
		width = 640,
		height = 400,
		xType = scaleUtc,
		xDomain,
		xRange = [marginLeft, width - marginRight],
		yType = scaleLinear,
		yDomain,
		yRange = [height - marginBottom, marginTop],
		zDomain,
		offset = stackOffsetWiggle,
		order = stackOrderInsideOut,
		xFormat,
		yLabel,
		colors = schemeTableau10,
	} = options;
	// Compute values.
	const X = map(data, x);
	const Y = map(data, y);
	const Z = map(data, z);

	// Compute default x- and z-domains, and unique the z-domain.
	if (xDomain === undefined) xDomain = extent(X) as [XT, XT];
	if (zDomain === undefined) zDomain = Z;
	let zDomainSet = new InternSet(zDomain);

	// Omit any data not present in the z-domain.
	// 找到非空值的所有 y 值
	const I = range(X.length).filter((i) => zDomainSet.has(Z[i]));

	// Compute a nested array of series where each series is [[y1, y2], [y1, y2],`
	// [y1, y2], …] representing the y-extent of each stacked rect. In addition,
	// each tuple has an i (index) property so that we can refer back to the
	// original data point (data[i]). This code assumes that there is only one
	// data point for a given unique x- and z-value.
	// 按有效的 y 值(I)计算对应 x 位置的 y 和 z 的值
	let series = stack<[XT, InternMap<ZT, number>], ZT>()
		.keys(zDomainSet)
		.value(([x, I], z) => Y[I.get(z) as number])
		.order(order)
		.offset(offset)(
			rollup(
				I,
				([i]) => i,
				(i) => X[i],
				(i) => Z[i]
			)
		)
		.map((s) => s.map((d) => Object.assign(d, { i: d.data[1].get(s.key) ?? 0 })));

	// Compute the default y-domain. Note: diverging stacks can be negative.
	if (yDomain === undefined) yDomain = extent(series.flat(2)) as [YT, YT];

	// Construct scales and axes.
	const xScale = xType(xDomain, xRange);
	const yScale = yType(yDomain, yRange);
	const color = scaleOrdinal(zDomainSet, colors);
	const xAxis = axisBottom(xScale)
		.ticks(width / 80, xFormat)
		.tickSizeOuter(0);

	const svg = create('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('viewBox', [0, 0, width, height])
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

	const area = d3area<(typeof series)[0][0]>()
		.x(({ i }) => xScale(X[i]))
		.y0(([y1]) => yScale(y1))
		.y1(([, y2]) => yScale(y2));

	// 使用 d3-tip 显示
	const tips = (d3Tip as Function)()
		.attr('class', 'd3_tip')
		.offset([-10, 0])
		.html((_: MouseEvent, [{ i }]: (typeof series)[0]) => Z[i]); // d 是全部数据, 因为无法锁定鼠标在 x 轴的位置, 也就无法获取 y 的值
	svg.call(tips);

	svg.append('g')
		.selectAll('path')
		.data(series)
		.join('path')
		.attr('fill', ([{ i }]) => color(Z[i]))
		.attr('d', area)
		.on('mouseover', tips.show)
		.on('mouseleave', tips.hide);
	// .append('title')
	// .text(([{ i }]) => Z[i]);

	svg.append('g')
		.attr('transform', `translate(0,${height - marginBottom})`)
		.call(xAxis)
		.call((g) => g.select('.domain').remove());

	svg.append('g')
		.attr('transform', `translate(${marginLeft},0)`)
		.call((g) => {
			if (yLabel) {
				return g
					.append('text')
					.attr('x', -marginLeft)
					.attr('y', 10)
					.attr('font-family', 'sans-serif')
					.attr('fill', '#fff')
					.attr('font-size', 12)
					.text(yLabel);
			}
		});

	return Object.assign(svg.node() as SVGSVGElement, { scales: { color } });
}
