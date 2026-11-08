(async () => {
  'use strict';
  const en=document.documentElement.lang==='en';
  const host = document.querySelector('.hero-art');
  const canvas = document.querySelector('#playgroundCanvas');
  const hint = document.querySelector('#playHint');
  const shuffle = document.querySelector('#shuffleToys');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let THREE, renderer;
  try {
    THREE = await import('./vendor/three.module.js');
    renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  } catch (error) {
    hint.textContent = en?'Ideas don’t need to stand in line':'灵感，也可以不按套路摆放';
    shuffle.addEventListener('click', () => {
      const art = document.querySelector('.playground-fallback');
      art.style.transform = `rotate(${Math.random()*24-12}deg)`;
    });
    console.warn('Using the illustrated playground fallback.', error);
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .94;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4,4,3.6,-3.6,.1,50);
  camera.position.set(0,0,12);
  const environment = new THREE.Scene();
  environment.add(new THREE.Mesh(new THREE.BoxGeometry(18,18,18),new THREE.MeshBasicMaterial({color:0xaaa9a1,side:THREE.BackSide})));
  [[-4,5,4,4,5,.1,4],[5,2,3,.1,5,4,2],[0,6,-2,7,.1,5,3]].forEach(([x,y,z,w,h,d,power])=>{
    const panel = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color:new THREE.Color(0xffffff).multiplyScalar(power)}));
    panel.position.set(x,y,z);environment.add(panel);
  });
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(environment,0).texture;
  pmrem.dispose();environment.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
  scene.add(new THREE.HemisphereLight(0xffffff,0xccc9b7,1.1));
  [[0xffffff,2.2,-3,5,6],[0xffffff,.9,5,1,2],[0xf2eddb,1,-3,-3,2]].forEach(([c,p,x,y,z])=>{
    const light=new THREE.DirectionalLight(c,p);light.position.set(x,y,z);scene.add(light);
  });
  const material = color => new THREE.MeshPhysicalMaterial({color,roughness:.25,metalness:.08,clearcoat:1,clearcoatRoughness:.15,envMapIntensity:.55});
  const blue=material(0x123ce4), orange=material(0xff4f19), yellow=material(0xf6cd18);
  function extrude(points,mat,depth=.42,bevel=.16){
    const shape=new THREE.Shape();points.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();
    const geometry=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:6,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:12});
    geometry.center();return new THREE.Mesh(geometry,mat);
  }
  const toys=[];
  function addToy(mesh,name,x,y,z,rx,ry,rz){
    const group=new THREE.Group();group.add(mesh);scene.add(group);
    group.position.set(x,y,z);group.rotation.set(rx,ry,rz);
    const toy={group,name,home:new THREE.Vector3(x,y,z),velocity:new THREE.Vector3(),angle:new THREE.Vector3(rx,ry,rz),spin:new THREE.Vector3(),phase:toys.length*1.8};
    group.traverse(o=>{if(o.isMesh)o.userData.toy=toy;});toys.push(toy);return toy;
  }
  const arms=[];
  for(let i=0;i<6;i++){
    const a=i*Math.PI/3;
    [[1.38,-.18],[1.38,.18],[.49,.40],[.49,.65]].forEach(([r,offset])=>arms.push([Math.cos(a+offset)*r,Math.sin(a+offset)*r]));
  }
  addToy(extrude(arms,blue,.58,.20),(en?'Blue star':'蓝色星星'),-.95,.40,.45,.22,-.26,-.17);
  addToy(new THREE.Mesh(new THREE.TorusGeometry(.95,.38,32,88),orange),(en?'Orange ring':'橙色圆环'),1.04,1.55,-.45,.55,-.42,-.34);
  addToy(extrude([[-.03,1.24],[-.92,-.17],[-.13,-.17],[-.40,-1.31],[.96,.32],[.19,.32],[.50,1.24]],yellow,.32,.12),(en?'Lightning bolt':'黄色闪电'),1.03,-1.13,.6,-.14,.2,-.20);
  // A tiny patterned ball anchors the composition without adding another character.
  const pattern=document.createElement('canvas');pattern.width=256;pattern.height=128;
  const ctx=pattern.getContext('2d');
  for(let y=0;y<8;y++)for(let x=0;x<16;x++){ctx.fillStyle=(x+y)%2?'#f7f6ef':'#343a32';ctx.fillRect(x*16,y*16,16,16);}
  const texture=new THREE.CanvasTexture(pattern);texture.colorSpace=THREE.SRGBColorSpace;
  const ball=new THREE.Mesh(new THREE.SphereGeometry(.34,40,24),new THREE.MeshStandardMaterial({map:texture,roughness:.55}));
  addToy(ball,(en?'Checkered ball':'格纹小球'),-1.52,-1.90,.1,.2,.2,.15);
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;
  const sc=shadowCanvas.getContext('2d');const gradient=sc.createRadialGradient(64,64,4,64,64,62);gradient.addColorStop(0,'rgba(45,49,32,.22)');gradient.addColorStop(1,'rgba(45,49,32,0)');sc.fillStyle=gradient;sc.fillRect(0,0,128,128);
  const shadowTexture=new THREE.CanvasTexture(shadowCanvas);
  toys.forEach(t=>{const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:shadowTexture,transparent:true,depthWrite:false}));sprite.position.set(t.home.x,t.home.y-1.45,-1.3);sprite.scale.set(t.name===(en?'Checkered ball':'格纹小球')?1.1:2.6,.5,1);scene.add(sprite);});
  let visible=!document.querySelector('#homeView').hidden;
  let paused=document.body.classList.contains('motion-paused');
  let dragging=null, frame=0, lastTime=0, elapsed=0, dirty=true;
  const pointer=new THREE.Vector2(), raycaster=new THREE.Raycaster();
  const dragPlane=new THREE.Plane(new THREE.Vector3(0,0,1),0), point=new THREE.Vector3(), offset=new THREE.Vector3();
  let lastDrag=0, downAt={x:0,y:0}, engaged=false;
  function coordinates(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);}
  function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.left=-3.6*w/h;camera.right=3.6*w/h;camera.updateProjectionMatrix();dirty=true;}
  new ResizeObserver(resize).observe(host);resize();
  canvas.addEventListener('pointerdown',e=>{
    coordinates(e);const hit=raycaster.intersectObjects(toys.map(t=>t.group),true)[0];if(!hit)return;
    dragging=hit.object.userData.toy;dragPlane.constant=-dragging.group.position.z;
    raycaster.ray.intersectPlane(dragPlane,point);offset.copy(dragging.group.position).sub(point);
    dragging.velocity.set(0,0,0);lastDrag=performance.now();downAt={x:e.clientX,y:e.clientY};engaged=false;
    canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');hint.textContent=en?`${dragging.name}: let go and see`:`抓住了${dragging.name}，松手试试`;
    // On touch, vertical gestures can still scroll until the browser commits the drag.
    dirty=true;
  });
  canvas.addEventListener('pointermove',e=>{
    coordinates(e);
    if(dragging){
      raycaster.ray.intersectPlane(dragPlane,point);point.add(offset);
      point.x=THREE.MathUtils.clamp(point.x,camera.left+1,camera.right-1);point.y=THREE.MathUtils.clamp(point.y,-2.4,2.4);
      const now=performance.now(),dt=Math.max((now-lastDrag)/1000,.016);
      dragging.velocity.copy(point).sub(dragging.group.position).divideScalar(dt).clampLength(0,12);
      dragging.group.position.copy(point);lastDrag=now;dragging.group.rotation.z=dragging.angle.z+(point.x-dragging.home.x)*.3;
      engaged ||= Math.hypot(e.clientX-downAt.x,e.clientY-downAt.y)>5;dirty=true;
    }else{canvas.style.cursor=raycaster.intersectObjects(toys.map(t=>t.group),true).length?'grab':'default';}
  });
  function release(){
    if(!dragging)return;
    if(performance.now()-lastDrag>120)dragging.velocity.set(0,0,0);
    if(!engaged)dragging.velocity.set((Math.random()-.5)*4,5,0);
    if(reduced.matches||paused){dragging.group.position.copy(dragging.home);dragging.group.rotation.set(...dragging.angle.toArray());dragging.velocity.set(0,0,0);}
    const tossed=dragging.name;dragging=null;canvas.classList.remove('dragging');hint.textContent=en?`${tossed}: a fresh perspective ✦`:`${tossed}：收到一点新灵感 ✦`;dirty=true;
  }
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  shuffle.addEventListener('click',()=>{
    toys.forEach(t=>{
      if(reduced.matches||paused){t.group.rotation.z+=(Math.random()-.5)*1.2;}
      else{t.velocity.set((Math.random()-.5)*19,4+Math.random()*5,0);t.spin.set((Math.random()-.5)*4,(Math.random()-.5)*4,(Math.random()-.5)*5);}
    });
    hint.textContent=en?'A different angle. A fresh idea.':'换个角度，灵感就来了';dirty=true;
  });
  function tick(now){
    frame=0;if(!visible||document.hidden)return;
    const dt=Math.min((now-lastTime)/1000||.016,.035);lastTime=now;
    if(!paused&&!reduced.matches){
      elapsed+=dt;
      for(const t of toys){
        if(t===dragging)continue;
        const target=t.home.clone();target.y+=Math.sin(elapsed*.75+t.phase)*.12;
        const force=target.sub(t.group.position).multiplyScalar(24).addScaledVector(t.velocity,-5.8);
        t.velocity.addScaledVector(force,dt);t.group.position.addScaledVector(t.velocity,dt);
        t.spin.multiplyScalar(Math.exp(-2.4*dt));
        t.group.rotation.x+=(t.angle.x+Math.sin(elapsed*.42+t.phase)*.09-t.group.rotation.x)*dt*3+t.spin.x*dt;
        t.group.rotation.y+=(t.angle.y+Math.cos(elapsed*.35+t.phase)*.13-t.group.rotation.y)*dt*3+t.spin.y*dt;
        t.group.rotation.z+=(t.angle.z+Math.sin(elapsed*.31+t.phase)*.07-t.group.rotation.z)*dt*3+t.spin.z*dt;
      }
      dirty=true;
    }
    if(dirty){renderer.render(scene,camera);dirty=false;}
    frame=requestAnimationFrame(tick);
  }
  function resume(){if(!frame&&visible&&!document.hidden){lastTime=performance.now();frame=requestAnimationFrame(tick);}}
  document.addEventListener('grape-motion',e=>{paused=e.detail.paused;dirty=true;resume();});
  document.addEventListener('grape-page',e=>{visible=e.detail.visible;dirty=true;resume();});
  document.addEventListener('visibilitychange',resume);
  reduced.addEventListener('change',()=>{dirty=true;resume();});
  document.body.classList.add('webgl-ready');canvas.dataset.ready='true';
  renderer.render(scene,camera);resume();
})();
