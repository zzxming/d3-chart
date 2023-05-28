<script setup lang="ts">
	import { routes } from '@/router';

	let loadError = ref(false);

	onErrorCaptured((err) => {
		console.log(err);
		loadError.value = true;
	});

	let reload = () => {
		loadError.value = false;
	};
</script>

<template>
	<div class="nav">
		<RouterLink
			v-for="route in routes.slice(1)"
			:to="route.path"
			class="nav_item"
		>
			{{ route.name }}
		</RouterLink>
	</div>

	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Suspense>
				<!-- 主要内容 -->
				<div
					v-if="loadError"
					class="error"
				>
					<p class="error_tip">something went wrong...</p>
					<button
						class="error_reload"
						@click="reload"
					>
						reload
					</button>
				</div>
				<!-- 路由显示 -->
				<component
					v-else
					:is="Component"
				>
				</component>

				<!-- 加载中状态 -->
				<template #fallback>
					<div>Loading...</div>
				</template>
			</Suspense>
		</template>
	</RouterView>
</template>

<style lang="less" scoped>
	.nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: var(--vt-c-text-light-2);
		color: var(--vt-c-text-dark-2);
		z-index: 1000;
		&_item {
			padding: 4px 8px;
			color: inherit;
			text-decoration: none;
		}
	}
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20px;
		&_tip {
			margin-bottom: 20px;
			font-size: 20px;
		}
		&_reload {
			padding: 4px 8px;
			font-size: 16px;
		}
	}
</style>
