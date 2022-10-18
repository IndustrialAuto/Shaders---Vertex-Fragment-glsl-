 precision mediump float;
 uniform vec3 ucolor;
 uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;
//varying float vRandom;

    void main()
    {

        vec4 flag = texture2D(uTexture, vUv);
        flag.rgb *= vElevation *2.0 + 0.7;

        gl_FragColor =  flag;
    }