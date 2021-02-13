import CrsCoordinate from '../crs_coordinate';
import CrsProjection from '../crs_projection';
/**
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts')
 */
export default class Transformer {
    /** Implementation of transformations from WGS84 */
    private static readonly _transformStrategy_from_WGS84_to_SWEREF99_or_RT90;
    /** Implementation of transformations to WGS84 */
    private static readonly _transformStrategy_from_SWEREF99_or_RT90_to_WGS84;
    /** Implementation first transforming to WGS84 and then to the real target */
    private static readonly _transFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget;
    /**
     * Transforms a source {@link CrsCoordinate} (which includes the coordinate reference system as a property)
     * to a coordinate in another coordinate reference system i.e. the target {@link CrsProjection}
     * @param sourceCoordinate - The coordinate to become transformed.
     * @param targetCrsProjection - The coordinate reference system you want to transform to.
     */
    static transform(sourceCoordinate: CrsCoordinate, targetCrsProjection: CrsProjection): CrsCoordinate;
}
//# sourceMappingURL=transformer.d.ts.map