import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import VertShader from './shaders/test/vertex.glsl'
import FragShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const flag = textureLoader.load("./textures/flag.jpg")

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1.3, 1, 32, 32)

const count = geometry.attributes.position.count
const random = new Float32Array(count)

for(let i=0; i<count; i++)
{
    random[i]= Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(random,1))


console.log(geometry)


// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: VertShader,
    fragmentShader: FragShader,
    transparent: true,
    side: THREE.DoubleSide, // to see the object from both sides
    uniforms:
    {
        waveFrequency: { value: new THREE.Vector2(10,5)},
        uTime: {value: 0},
        ucolor: {value: new THREE.Color('cyan')},
        uTexture: {value: flag}
    }
   
    
})

gui.add(material.uniforms.waveFrequency.value, 'x').min(0).max(20.).step(0.01).name('frequencyX')
gui.add(material.uniforms.waveFrequency.value, 'y').min(0).max(20.).step(0.01).name('frequencyY')

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update material
    material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()