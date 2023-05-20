import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/Home.vue';

const routes = [
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
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
