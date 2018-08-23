import { Group, Vector3 } from 'three';
import BasicLights from './Lights.js';
import Tonel from './Tonel';
import Text from './Text';

export default class SeedScene extends Group {
  constructor() {
    super();

    this.text = new Text();
    const lights = new BasicLights();
    this.tonel = new Tonel();
    
    this.add(lights, this.tonel.mesh);

    this.text.load((textMesh) => {
      this.generateTexts(textMesh)
    })
  }

  update(timeStamp, cameraQuaternion) {
    this.setCameraPosition(timeStamp);
    this.updateTexts(cameraQuaternion);
  }

  setCameraPosition(timeStamp) {
    this.cameraParams = {
      normal: new Vector3()
    };
    const binormal = new Vector3();

    const loopTime = 30 * 1000;
    const t = (timeStamp % loopTime) / loopTime;
    this.cameraParams.position = this.tonel.geometry.parameters.path.getPoint(t);

    const segments = this.tonel.geometry.tangents.length;
    const pickt = t * segments;
    const pick = Math.floor(pickt);
    const pickNext = (pick + 1) % segments;
    
    binormal.subVectors(this.tonel.geometry.binormals[pickNext], this.tonel.geometry.binormals[pick]);
    binormal.multiplyScalar(pickt - pick).add(this.tonel.geometry.binormals[pick]);

    const dir = this.tonel.geometry.parameters.path.getTangentAt(t);
    const offset = 0;

    this.cameraParams.normal.copy(binormal).cross(dir);
    this.cameraParams.position.add(this.cameraParams.normal.clone().multiplyScalar(offset));

    this.cameraParams.lookAt = this.tonel.geometry.parameters.path.getPointAt((t + 1 / this.tonel.geometry.parameters.path.getLength()) % 1);
  }

  generateTexts(textMesh) {
    this.texts = []
    for (let i = 0; i < 6; i++) {
      const texts = [];
      let copy = textMesh.clone();
      this.texts.push(copy);
      this.add(copy);
      copy.position.copy(
        this.tonel.geometry.parameters.path.getPointAt(i * .1)
      )
    }
  }

  updateTexts(quaternion) {
    if (this.texts) this.texts.forEach(textObj => textObj.quaternion.copy(quaternion))
  }
}