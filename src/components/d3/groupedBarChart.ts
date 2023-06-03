import {
	scaleLinear,
	map,
	schemeTableau10,
	max,
	InternSet,
	range,
	scaleBand,
	scaleOrdinal,
	axisBottom,
	axisLeft,
	create,
} from 'd3';
import d3Tip from 'd3-tip';
/**
 *   
  x = (d, i) => i,                                  // given d in data, returns the (ordinal) x-value
  y = d => d,                                       // given d in data, returns the (quantitative) y-value
  z = () => 1,                                      // given d in data, returns the (categorical) z-value
  title,                                            // given d in data, returns the title text
  marginTop = 30,                                   // top margin, in pixels
  marginRight = 0,                                  // right margin, in pixels
  marginBottom = 30,                                // bottom margin, in pixels
  marginLeft = 40,                                  // left margin, in pixels
  width = 640,                                      // outer width, in pixels
  height = 400,                                     // outer height, in pixels
  xDomain,                                          // array of x-values
  xRange = [marginLeft, width - marginRight],       // [xmin, xmax]
  xPadding = 0.1,                                   // amount of x-range to reserve to separate groups
  yType = scaleLinear,                           // type of y-scale
  yDomain,                                          // [ymin, ymax]
  yRange = [height - marginBottom, marginTop],      // [ymin, ymax]
  zDomain,                                          // array of z-values
  zPadding = 0.05,                                  // amount of x-range to reserve to separate bars
  yFormat,                                          // a format specifier string for the y-axis
  yLabel,                                           // a label for the y-axis
  colors = schemeTableau10,                      // array of colors
 * 
 */
interface GroupedBarChartOptions<T> {
	x: (d: T, i: number, data: Iterable<T>) => number | string;
	y: (d: T, i: number, data: Iterable<T>) => number;
	z: (d: T, i: number, data: Iterable<T>) => number | string;

	title?: (d: T, x: number | string, y: number | string, z: number | string) => string;
	yType?: typeof scaleLinear;
	colors?: readonly string[];
	yLabel?: string;
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
	width?: number;
	height?: number;
	yFormat?: string;
	xDomain?: (number | string)[];
	zDomain?: (number | string)[];
	yDomain?: [number, number];
	xRange?: [number, number]; // 默认参数中需要 margin 的传入值, 此默认值在函数内处理
	yRange?: [number, number]; // 默认参数中需要 margin 的传入值, 此默认值在函数内处理
	xPadding?: number;
	zPadding?: number;
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/grouped-bar-chart
export default function GroupedBarChart<T>(data: T[], options: GroupedBarChartOptions<T>) {
	let {
		x,
		y,
		z,
		title,
		marginTop = 30,
		marginRight = 0,
		marginBottom = 30,
		marginLeft = 40,
		width = 640,
		height = 400,
		xDomain,
		xRange = [marginLeft, width - marginRight],
		xPadding = 0.1,
		yType = scaleLinear,
		yDomain,
		yRange = [height - marginBottom, marginTop],
		zDomain,
		zPadding = 0.05,
		yFormat,
		yLabel = 'label for the y-axis',
		colors = schemeTableau10,
	} = options;

	// Compute values.
	const X = map(data, x);
	const Y = map(data, y);
	const Z = map(data, z);

	// Compute default domains, and unique the x- and z-domains.
	if (xDomain === undefined) xDomain = X;
	if (yDomain === undefined) yDomain = [0, max(Y) ?? 0];
	if (zDomain === undefined) zDomain = Z;
	let xInternSet = new InternSet(xDomain);
	let zInternSet = new InternSet(zDomain);

	// Omit any data not present in both the x- and z-domain.
	const I = range(X.length).filter((i) => xInternSet.has(X[i]) && zInternSet.has(Z[i]));

	// Construct scales, axes, and formats.
	const xScale = scaleBand(xInternSet, xRange).paddingInner(xPadding);
	const xzScale = scaleBand(zInternSet, [0, xScale.bandwidth()]).padding(zPadding);
	const yScale = yType(yDomain, yRange).nice();
	const zScale = scaleOrdinal(zDomain, colors);
	const xAxis = axisBottom(xScale).tickSizeOuter(0);

	const yAxis = axisLeft(yScale).ticks(height / 60, yFormat);

	// Compute titles.
	let titleFormat: (d: T, x: number | string, y: number | string, z: number | string) => string;
	const formatValue = yScale.tickFormat(100, yFormat);
	if (title === undefined) {
		titleFormat = (d: T, x: number | string, y: number | string, z: number | string) =>
			`
            ${x}
            <br />
            ${z}
            <br />
            ${formatValue(Number(y))}
        `;
	} else {
		const T = title;
		titleFormat = (d, x, y, z) => T(d, x, formatValue(Number(y)), z);
	}

	const svg = create('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('viewBox', [0, 0, width, height])
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
		.attr('color', '#fff');

	let d3g = svg.append('g').attr('transform', `translate(${marginLeft},0)`);
	// 贯穿全图的y轴水平线
	let drawyLine = (g: typeof d3g) =>
		g
			.selectAll('.tick line')
			.clone()
			.attr('x2', width - marginLeft - marginRight)
			.attr('stroke-opacity', 0.1);
	// y轴提示文字
	let drawyLabel = (g: typeof d3g) =>
		g
			.append('text')
			.attr('x', -marginLeft)
			.attr('y', 10)
			.attr('fill', 'currentColor')
			.attr('text-anchor', 'start')
			.text(yLabel);

	d3g.call(yAxis)
		.call((g) => g.select('.domain').remove())
		.call(drawyLine)
		.call(drawyLabel);

	// 使用 d3-tip 显示
	const tips = (d3Tip as Function)()
		.attr('class', 'd3_tip')
		.offset([-10, 0])
		.html((_: MouseEvent, i: number) => titleFormat(data[i], X[i], Y[i], Z[i]));
	svg.call(tips);

	const bar = svg
		.append('g')
		.selectAll('rect')
		.data(I)
		.join('rect')
		.attr('x', (i) => (xScale(X[i]) ?? 0) + (xzScale(Z[i]) ?? 0))
		.attr('y', (i) => yScale(Y[i]))
		.attr('width', xzScale.bandwidth())
		.attr('height', (i) => yScale(0) - yScale(Y[i]))
		.attr('fill', (i) => zScale(Z[i]))
		.on('mouseover', tips.show)
		.on('mouseleave', tips.hide);
	// 添加 title 标签显示
	// if (titleFormat) bar.append('title').text(titleFormat);

	svg.append('g')
		.attr('transform', `translate(0,${height - marginBottom})`)
		.call(xAxis);

	return Object.assign(svg.node() as SVGSVGElement, { scales: { color: zScale } });
}
