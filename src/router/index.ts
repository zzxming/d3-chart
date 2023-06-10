import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
	{
		path: '/',
		redirect: '/ChinaMapVue',
	},
	{
		path: '/ChinaMapVue',
		name: 'ChinaMapVue',
		component: () => import('@/views/ChinaMap.vue'),
	},
	{
		path: '/ZoomableSunBurst',
		name: 'ZoomableSunBurst',
		component: () => import('@/views/ZoomableSunBurst.vue'),
	},
	{
		path: '/SunBurst',
		name: 'SunBurst',
		component: () => import('@/views/SunBurst.vue'),
	},
	{
		path: '/TheWealthAndHealthOfNations',
		name: 'TheWealthAndHealthOfNations',
		component: () => import('@/views/TheWealthAndHealthOfNations.vue'),
	},
	{
		path: '/Bar',
		name: 'Bar',
		component: () => import('@/views/Bar.vue'),
	},
	{
		path: '/StreamgraphTransitions',
		name: 'StreamgraphTransitions',
		component: () => import('@/views/StreamgraphTransitions.vue'),
	},
	{
		path: '/StackedAreaChart,Streamgraph',
		name: 'StackedAreaChart,Streamgraph',
		component: () => import('@/views/StackedAreaChart,Streamgraph.vue'),
	},
	{
		path: '/AnimatedTreemap',
		name: 'AnimatedTreemap',
		component: () => import('@/views/AnimatedTreemap.vue'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
