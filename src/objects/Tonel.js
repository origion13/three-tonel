import {Curve, Group, Vector3, Mesh, TubeGeometry, MeshBasicMaterial, DoubleSide, ImageUtils, RepeatWrapping } from 'three';
import CustomSinCurve from './CustomSinCurve';

export default class Tonel extends Group {
    constructor() {
        super();
                
        const path = new CustomSinCurve( 10 );
        this.geometry = new TubeGeometry( path, 200, 1, 8, false );
        const material = new MeshBasicMaterial( 
            { 
                side: DoubleSide, 
                map: ImageUtils.loadTexture('src/img/map.png') 
            } 
        );
        material.map.wrapS = RepeatWrapping;
        material.map.wrapT = RepeatWrapping; 
        material.map.repeat.set(10, 1)
        this.mesh = new Mesh( this.geometry, material );
    }
}