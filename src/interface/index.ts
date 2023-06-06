import { ZoomTransform } from 'd3';

export interface ModuleImport<T> {
	default: T;
}
export interface D3ZoomEvent {
	sourceEvent: WheelEvent;
	transform: ZoomTransform;
	type: 'zoom';
}
