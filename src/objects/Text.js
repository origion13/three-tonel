import {Group, MeshBasicMaterial, FontLoader, TextGeometry, Mesh, Object3D} from 'three';

export default class Text extends Group {
    constructor() {
        super();

        // this.mesh = new Object3D();
    }

    load(callback) {
        const loader = new FontLoader();
        loader.load('/src/font/font.json', (font) => {
            const textGeo = new TextGeometry('Hell0!', {
                font: font,
                size: .1,
                height: .01
            });
            textGeo.center();

            const textMat = new MeshBasicMaterial({color: 0xff0000});
            const textMesh = new Mesh(textGeo, textMat);

            // this.mesh.add(textMesh);

            callback(textMesh);
        })
    }
}