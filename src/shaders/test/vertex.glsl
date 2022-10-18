    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    uniform vec2 waveFrequency;
    uniform float uTime;
    
    attribute vec2 uv;
    attribute vec3 position;
    //attribute float aRandom;

    //varying float vRandom;
    varying vec2 vUv;
    varying float vElevation;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        float elevation = sin(modelPosition.x * waveFrequency.x + uTime) * 0.1;
        elevation += sin(modelPosition.y * waveFrequency.y) * 0.1;

        modelPosition.z += elevation;
          //modelPosition.z += aRandom * 0.1;

        vec4 viewPosition = viewMatrix * modelPosition; 
        vec4 projectionPosition =  projectionMatrix * viewPosition;

        gl_Position =  projectionPosition;

        vUv = uv;
        
        vElevation = elevation;

    //vRandom = aRandom;

    }





        
