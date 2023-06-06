<template>
	<div class="mid">
		<div v-if="loading">loading</div>
		<div v-if="!loading && loadError">
			error
			<button
				v-if="reload"
				@click="reload"
			>
				reload
			</button>
		</div>
		<template
			v-if="!loading && !loadError"
			class="chart_box"
		>
			<slot></slot>
		</template>
	</div>
</template>

<style lang="less" scoped></style>

<script lang="ts" setup>
	const props = defineProps<{
		loading: boolean;
		loadError: boolean;
		reload?: () => void;
	}>();
</script>
