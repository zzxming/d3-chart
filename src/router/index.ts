import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/Home.vue';

export const routes = [
	{
		path: '/',
		redirect: '/chinamap',
	},
	{
		path: '/chinamap',
		name: 'ChinaMapVue',
		component: () => import('@/views/ChinaMap.vue'),
	},
	{
		path: '/sunburst',
		name: 'SunBurst',
		component: () => import('@/views/SunBurst.vue'),
	},
	{
		path: '/TheWealthAndHealthOfNations',
		name: 'TheWealthAndHealthOfNations',
		component: () => import('@/views/TheWealthAndHealthOfNations.vue'),
	},
	{
		path: '/bar',
		name: 'Bar',
		component: () => import('@/views/Bar.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
