attribute vec3 a_Position;
varying vec2 vv_Position;

uniform mat4 u_VPMatrix;

void main() {
    vv_Position = a_Position.xy;
    gl_Position = u_VPMatrix * vec4(a_Position.xyz, 1.0);
}