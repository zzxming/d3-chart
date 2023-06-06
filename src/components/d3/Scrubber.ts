const html = kn(
	function (e: string) {
		let t = document.createElement('template');
		return (t.innerHTML = e.trim()), document.importNode(t.content, !0);
	},
	function () {
		return document.createElement('span');
	}
);
function kn(e: any, t: any) {
	// ts 对模板字符串调用函数的参数个数识别有误
	return function (n: TemplateStringsArray, ..._: any) {
		let r,
			o,
			a,
			i,
			s,
			c,
			l,
			u,
			f = n[0],
			d = [],
			p = null,
			m = -1;
		for (s = 1, c = arguments.length; s < c; ++s) {
			if ((r = arguments[s]) instanceof Node) (d[++m] = r), (f += '\x3c!--o:' + m + '--\x3e');
			else if (Array.isArray(r)) {
				for (l = 0, u = r.length; l < u; ++l)
					(o = r[l]) instanceof Node
						? (null === p &&
								((d[++m] = p = document.createDocumentFragment()), (f += '\x3c!--o:' + m + '--\x3e')),
						  p.appendChild(o))
						: ((p = null), (f += o));
				p = null;
			} else f += r;
			f += n[s];
		}
		if (((p = e(f)), ++m > 0)) {
			// 源代码中 document.createTreeWalker 有四个参数，但官方文档此函数只有三个参数，导致 ts 报错
			// for (a = new Array(m), i = document.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null, !1); i.nextNode(); )
			for (a = new Array(m), i = document.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null); i.nextNode(); )
				(o = i.currentNode), /^o:/.test(o.nodeValue as string) && (a[+(o.nodeValue as string).slice(2)] = o);
			for (s = 0; s < m; ++s) (o = a[s]) && o.parentNode.replaceChild(d[s], o);
		}
		return 1 === p.childNodes.length
			? p.removeChild(p.firstChild)
			: 11 === p.nodeType
			? ((o = t()).appendChild(p), o)
			: p;
	};
}

let Inputs = {
	disposal: function ve(e: Element) {
		return new Promise<void>((t) => {
			requestAnimationFrame(() => {
				const n = e.closest('.observablehq');
				if (!n) return t();
				const i = new MutationObserver(() => {
					n.contains(e) || (i.disconnect(), t());
				});
				i.observe(n, {
					childList: !0,
				});
			});
		});
	},
};
/** 函数返回值为 form 元素, 可通过监听 form.input 监听到数据变化, 变化后的值可通过 form.o 获取, 或传递 update 函数 */
interface ScrubberArgs<T> {
	format?: (value: T, index: number, values: T[]) => string | number;
	initial?: number;
	delay?: number | null;
	autoplay?: boolean;
	loop?: boolean;
	loopDelay?: number | null;
	alternate?: boolean;
	update?: (value: T) => any;
}
export default function Scrubber<T>(
	values: T[],
	{
		format = (value) => Object.prototype.toString.call(value),
		initial = 0,
		delay = null,
		autoplay = true,
		loop = true,
		loopDelay = null,
		alternate = false,
		update = () => undefined,
	}: ScrubberArgs<T> = {}
): HTMLFormElement {
	values = Array.from(values);
	const form = html`<form
		style="font: 12px var(--sans-serif); font-variant-numeric: tabular-nums; display: flex; height: 34px; align-items: center;"
	>
		<button
			name="b"
			type="button"
			style="margin-right: 0.4em; width: 5em;"
		></button>
		<label style="display: flex; align-items: center;">
			<input
				name="i"
				type="range"
				min="0"
				max=${values.length - 1}
				value=${initial}
				step="1"
				style="width: 180px;"
			/>
			<output
				name="o"
				style="margin-left: 0.4em;"
			></output>
		</label>
	</form>`;

	let frame: number | null = null;
	let timer: NodeJS.Timeout | null = null;
	let interval: NodeJS.Timeout | null = null;
	let direction = 1;
	function start() {
		form.b.textContent = 'Pause';
		if (delay === null) frame = requestAnimationFrame(tick);
		else interval = setInterval(tick, delay);
	}
	function stop() {
		form.b.textContent = 'Play';
		if (frame !== null) cancelAnimationFrame(frame), (frame = null);
		if (timer !== null) clearTimeout(timer), (timer = null);
		if (interval !== null) clearInterval(interval), (interval = null);
	}
	function running() {
		return frame !== null || timer !== null || interval !== null;
	}
	function tick() {
		if (form.i.valueAsNumber === (direction > 0 ? values.length - 1 : direction < 0 ? 0 : NaN)) {
			if (!loop) return stop();
			if (alternate) direction = -direction;
			if (loopDelay !== null) {
				if (frame !== null) cancelAnimationFrame(frame), (frame = null);
				if (interval !== null) clearInterval(interval), (interval = null);
				timer = setTimeout(() => (step(), start()), loopDelay);
				return;
			}
		}
		if (delay === null) frame = requestAnimationFrame(tick);
		step();
	}
	function step() {
		form.i.valueAsNumber = (form.i.valueAsNumber + direction + values.length) % values.length;
		form.i.dispatchEvent(new CustomEvent('input', { bubbles: true }));
	}

	form.i.oninput = (event: CustomEvent) => {
		if (event && event.isTrusted && running()) stop();
		form.value = values[form.i.valueAsNumber];

		form.o.value = format(form.value, form.i.valueAsNumber, values);
		update(form.value);
	};
	form.b.onclick = () => {
		if (running()) return stop();
		direction = alternate && form.i.valueAsNumber === values.length - 1 ? -1 : 1;
		form.i.valueAsNumber = (form.i.valueAsNumber + direction) % values.length;
		form.i.dispatchEvent(new CustomEvent('input', { bubbles: true }));
		start();
	};
	form.i.oninput();
	if (autoplay) start();
	else stop();
	Inputs.disposal(form).then(stop);
	return form;
}
