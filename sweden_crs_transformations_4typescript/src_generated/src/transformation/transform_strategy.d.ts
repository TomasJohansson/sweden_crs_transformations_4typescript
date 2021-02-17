import CrsCoordinate from '../crs_coordinate';
import CrsProjection from '../crs_projection';
/**
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts')
 */
export default interface TransformStrategy {
    /** @virtual */
    transform(sourceCoordinate: CrsCoordinate, targetCrsProjection: CrsProjection): CrsCoordinate;
}
//# sourceMappingURL=transform_strategy.d.ts.map