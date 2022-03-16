import { Ref } from "vue";

export function use_reset({
    TSP_terminate,
    disablemapswitching,
    is_running,
}: {
    TSP_terminate: () => void;
    disablemapswitching: Ref<boolean>;
    is_running: Ref<boolean>;
}) {
    return function reset(): void {
        // const element = selecteleref.value;
        // element && (element.selectedIndex = 0);
        // const nodecoordinates = TSP_cities_map.get(element?.value || "");
        TSP_terminate();
        disablemapswitching.value = false;
        is_running.value = false;
    };
}
