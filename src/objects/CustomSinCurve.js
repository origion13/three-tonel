import {Curve, Vector3} from 'three';

export default class CustomSinCurve extends Curve {
    constructor(scale) {
        super(scale);
        Curve.call(this);

	    this.scale = (scale === undefined) ? 1 : scale;
    }

    getPoint(t) {
        var tx = Math.cos(2 * Math.PI * t);
        var ty = Math.sin(2 * Math.PI * t);
        var tz = .2 * Math.cos(6 * Math.PI * t);
    
        return new Vector3( tx, ty, tz ).multiplyScalar( this.scale );
    
    }
}