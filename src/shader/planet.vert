attribute vec3 a_Position;
varying vec2 vv_Position;

void main() {
    vv_Position = a_Position.xy;
    gl_Position = vec4(a_Position.xyz, 1.0);
}