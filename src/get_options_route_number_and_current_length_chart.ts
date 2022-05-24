import { ECBasicOption } from "echarts/types/dist/shared";
import { COMMON_DataOfOneRoute } from "../classic-acs/tsp-interface";
import { create_line_chart_options } from "../functions/create_line_chart_options";

import { ECOption } from "../functions/echarts-line";

export function get_options_route_number_and_current_length_chart(
    dataofoneroute: Pick<
        COMMON_DataOfOneRoute,
        "current_route_length" | "current_search_count"
    >[]
): ECBasicOption & ECOption {
    const title_text = "路径序号和当前路径长度";

    const data: [number, number][] = dataofoneroute.map((a) => [
        a.current_search_count,
        a.current_route_length,
    ]);
    return create_line_chart_options({
        yAxis_min: 0,
        title_text,
        data: data,
    });
}
