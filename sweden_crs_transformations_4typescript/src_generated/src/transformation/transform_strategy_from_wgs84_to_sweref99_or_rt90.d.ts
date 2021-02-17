import CrsCoordinate from '../crs_coordinate';
import CrsProjection from '../crs_projection';
import TransformStrategy from './transform_strategy';
/**
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts')
 */
export default class TransformStrategy_from_WGS84_to_SWEREF99_or_RT90 implements TransformStrategy {
    /** @override */
    transform(sourceCoordinate: CrsCoordinate, targetCrsProjection: CrsProjection): CrsCoordinate;
}
//# sourceMappingURL=transform_strategy_from_wgs84_to_sweref99_or_rt90.d.ts.map