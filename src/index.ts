// import { divide_route_to_2_opt_with_segment } from "../functions/divide_route_to_2-opt-with-segment";
// import { intersection_filter_with_cycle_route_find_one } from "../functions/intersection_filter_with_cycle_route-find-one";
// import { Nodecoordinates } from "../functions/Nodecoordinates";
// import ulysses22 from "../tsp/ulysses22.json";

// if (import.meta.env.DEV) {
//     //测试
//     console.log(ulysses22);
//     console.log(intersection_filter_with_cycle_route_find_one);
//     const route = [
//         0, 7, 21, 17, 3, 16, 1, 2, 15, 11, 12, 13, 6, 5, 14, 4, 10, 8, 9, 18,
//         19, 20,
//     ];
//     console.log(route);
//     const intersection = intersection_filter_with_cycle_route_find_one({
//         nodecoordinates: ulysses22 as Nodecoordinates,
//         cycleroute: route,
//     });
//     console.log(intersection);
//     if (intersection) {
//         console.log(
//             intersection.map((segment) =>
//                 [segment[0], segment[1]].map((city) => ulysses22[city])
//             )
//         );
//         console.log(divide_route_to_2_opt_with_segment(route, intersection));
//     }
// }
import { app } from "./main";
app.config.errorHandler = (e) => {
    throw e;
};
