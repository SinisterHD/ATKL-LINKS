/* Inspirado en la interacción 3D de heusser-dev/DmnD (Three.js + OrbitControls).
   Código ATKL escrito desde cero, usando EXCLUSIVAMENTE el logo original de ATKL.
   El logo es un volumen visual por capas transparentes, no un archivo STL. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const host = document.getElementById('three-root');
const stage = document.getElementById('logo-stage');
if (host && stage && window.WebGL2RenderingContext) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
    camera.position.set(0,0,15);
    host.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = .08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI/2-.30;
    controls.maxPolarAngle = Math.PI/2+.30;
    controls.minAzimuthAngle = -.53;
    controls.maxAzimuthAngle = .53;
    controls.rotateSpeed = .55;
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    const loader = new THREE.TextureLoader();
    const texture = await loader.loadAsync('./assets/logo-atkl-white-trim.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    const img = texture.image;
    const planeWidth = 9.4;
    const planeHeight = planeWidth*(img.height/img.width);
    const geometry = new THREE.PlaneGeometry(planeWidth,planeHeight);
    for(let i=0;i<20;i++){
      const t = i/19;
      const layer = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({
        map:texture,
        transparent:true,
        alphaTest:.12,
        depthWrite:false,
        opacity: i===19 ? 1 : .72,
        color: i===19 ? 0xffffff : new THREE.Color().setRGB(.13+.46*t,.025+.19*t,.035+.19*t)
      }));
      layer.position.z=-.55+.55*t;
      layer.renderOrder=i;
      logoGroup.add(layer);
    }
    const backGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(planeWidth*1.03,planeHeight*1.03),
      new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.06,opacity:.085,color:0xf21738,depthWrite:false})
    );
    backGlow.position.z=-.66;
    backGlow.renderOrder=-1;
    logoGroup.add(backGlow);

    let w=0,h=0;
    const resize=()=>{
      const b=host.getBoundingClientRect();
      w=Math.max(1,b.width);h=Math.max(1,b.height);
      renderer.setSize(w,h,false);
      camera.aspect=w/h;
      camera.position.z = 15;
      camera.updateProjectionMatrix();
    };
    const obs=new ResizeObserver(resize);obs.observe(host);resize();
    const initialCamera = new THREE.Vector3(0,0,camera.position.z);
    window.resetATKL3D=()=>{
      camera.position.set(0,0,camera.position.z);
      controls.target.set(0,0,0);
      controls.update();
    };
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf,clock=0;
    const animate=(time)=>{
      raf=requestAnimationFrame(animate);
      if (!document.hidden) {
        clock=time||0;
        if(!reduceMotion){logoGroup.rotation.y=Math.sin(clock*.00022)*.11;logoGroup.rotation.x=Math.sin(clock*.00031)*.035;}
        controls.update();
        renderer.render(scene,camera);
      }
    };
    stage.classList.add('three-ready');
    raf=requestAnimationFrame(animate);
    window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);obs.disconnect();controls.dispose();renderer.dispose();texture.dispose();geometry.dispose();logoGroup.traverse(o=>{if(o.isMesh)o.material?.dispose()});},{once:true});
  } catch(err){
    console.warn('ATKL: vista 3D avanzada no disponible; se usa la vista 3D CSS.',err);
    try{renderer?.dispose();host.replaceChildren()}catch(_){}
    stage.classList.remove('three-ready');
  }
}
