import {
	descending,
	interpolateRainbow,
	stratify,
	hierarchy,
	partition,
	scaleSequential,
	arc as d3arc,
	create,
	HierarchyRectangularNode,
} from 'd3';

interface HierarchyRectangularNodeIndex<T> extends HierarchyRectangularNode<T> {
	x0: number;
	y0: number;
	x1: number;
	y1: number;
	index?: number;
}

type ID = { id?: any; parentId?: any; [key: string]: any };
interface SunBurstArgs<T> {
	path?: ((d: ArrayUseTItem<T>, i: number, data: ArrayUseTItem<T>[]) => string) | null;
	id?:
		| ((d: ArrayUseTItem<UseT<T>>, i: number, data: ArrayUseTItem<UseT<T>>[]) => string | null | '' | undefined)
		| null;
	parentId?:
		| ((d: ArrayUseTItem<UseT<T>>, i: number, data: ArrayUseTItem<UseT<T>>[]) => string | null | '' | undefined)
		| null;
	children?: (d: ArrayUseTItem<UseT<T>>) => ArrayUseTItem<UseT<T>>[];
	value?: (d: ArrayUseTItem<UseT<T>>) => number;
	sort?: (
		a: HierarchyRectangularNode<ArrayUseTItem<UseT<T>>>,
		b: HierarchyRectangularNode<ArrayUseTItem<UseT<T>>>
	) => number;
	label?: (d: ArrayUseTItem<UseT<T>>, data: HierarchyRectangularNode<ArrayUseTItem<UseT<T>>>) => string;
	title?: (d: ArrayUseTItem<UseT<T>>, data: HierarchyRectangularNode<ArrayUseTItem<UseT<T>>>) => string;
	link?: (d: ArrayUseTItem<UseT<T>>, data: HierarchyRectangularNode<ArrayUseTItem<UseT<T>>>) => string;
	linkTarget?: string;
	width?: number;
	height?: number;
	margin?: number;
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
	padding?: number;
	radius?: number;
	color?: (d: number) => string;
	fill?: string;
	fillOpacity?: number;
}

type UseT<T> = T extends Array<infer U> ? (U extends ID ? T : never) : T;
type ArrayUseTItem<T> = T extends Array<infer U> ? (U extends ID ? U : never) : T;

export default function Sunburst<T>(
	data: UseT<T>,
	{
		// data is either tabular (array of objects) or hierarchy (nested objects)
		path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
		id = Array.isArray(data) ? (d) => (d as ID).id : null, // if tabular data, given a d in data, returns a unique identifier (string)
		parentId = Array.isArray(data) ? (d) => (d as ID).parentId : null, // if tabular data, given a node d, returns its parent’s identifier
		children, // if hierarchical data, given a d in data, returns its children
		value, // given a node d, returns a quantitative value (for area encoding; null for count)
		sort = (a, b) => descending(a.value, b.value), // how to sort nodes prior to layout
		label, // given a node d, returns the name to display on the rectangle
		title, // given a node d, returns its hover text
		link, // given a node d, its link (if any)
		linkTarget = '_blank', // the target attribute for links (if any)
		width = 640, // outer width, in pixels
		height = 400, // outer height, in pixels
		margin = 1, // shorthand for margins
		marginTop = margin, // top margin, in pixels
		marginRight = margin, // right margin, in pixels
		marginBottom = margin, // bottom margin, in pixels
		marginLeft = margin, // left margin, in pixels
		padding = 1, // separation between arcs
		radius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2, // outer radius
		color = interpolateRainbow, // color scheme, if any
		fill = '#ccc', // fill for arcs (if no color encoding)
		fillOpacity = 0.6, // fill opacity for arcs
	}: SunBurstArgs<T> = {}
) {
	// If id and parentId options are specified, or the path option, use d3.stratify
	// to convert tabular data to a hierarchy; otherwise we assume that the data is
	// specified as an object {children} with nested objects (a.k.a. the “flare.json”
	// format), and use d3.hierarchy.
	let root = !!path
		? stratify<ArrayUseTItem<UseT<T>>>().path(path)(data as ArrayUseTItem<UseT<T>>[])
		: !!id && !!parentId
		? stratify<ArrayUseTItem<UseT<T>>>().id(id).parentId(parentId)(data as ArrayUseTItem<UseT<T>>[])
		: hierarchy<ArrayUseTItem<UseT<T>>>(data as ArrayUseTItem<UseT<T>>, children);

	let useRoot = root as HierarchyRectangularNodeIndex<ArrayUseTItem<UseT<T>>>;

	// Compute the values of internal nodes by aggregating from the leaves.
	!value ? root.count() : useRoot.sum((d) => Math.max(0, value(d)));

	// Sort the leaves (typically by descending value for a pleasing layout).
	if (!!sort) useRoot.sort(sort);

	// Compute the partition layout. Note polar coordinates: x is angle and y is radius.
	partition<ArrayUseTItem<UseT<T>>>().size([2 * Math.PI, radius])(useRoot);

	// Construct a color scale.
	if (!!color) {
		color = scaleSequential([0, (useRoot.children?.length ?? 0) - 1], color).unknown(fill);
		useRoot.children?.forEach((child, i) => (child.index = i));
	}

	// Construct an arc generator.
	const arc = d3arc<any, typeof useRoot>()
		.startAngle((d) => d.x0)
		.endAngle((d) => d.x1)
		.padAngle((d) => Math.min((d.x1 - d.x0) / 2, (2 * padding) / radius))
		.padRadius(radius / 2)
		.innerRadius((d) => d.y0)
		.outerRadius((d) => d.y1 - padding);

	const svg = create('svg')
		.attr('viewBox', [marginRight - marginLeft - width / 2, marginBottom - marginTop - height / 2, width, height])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
		.attr('font-family', 'sans-serif')
		.attr('font-size', 10)
		.attr('text-anchor', 'middle');

	const cell = svg
		.selectAll('a')
		.data(useRoot.descendants())
		.join('a')
		.attr('xlink:href', link == null ? null : (d) => link(d.data, d))
		.attr('target', link == null ? null : linkTarget);

	cell.append('path')
		.attr('d', arc)
		.attr('fill', color ? (d) => color(d.ancestors().reverse()[1]?.index ?? 0) : fill)
		.attr('fill-opacity', fillOpacity);

	if (label != null)
		cell.filter((d) => ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
			.append('text')
			.attr('transform', (d) => {
				if (!d.depth) return '';
				const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
				const y = (d.y0 + d.y1) / 2;
				return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
			})
			.attr('dy', '0.32em')
			.text((d) => label(d.data, d));

	if (title != null) cell.append('title').text((d) => title(d.data, d));

	return svg.node();
}
