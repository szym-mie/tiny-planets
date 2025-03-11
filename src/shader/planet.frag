precision mediump float;

varying vec2 vv_Position;
uniform sampler2D u_Texture;
uniform float u_Time;

float sphere_depth(vec2 position) {
    float radius = length(position);
    return sqrt(max(1.0 - radius * radius, 0.0));
}

float sphere_alpha(vec2 position) {
    float center = max(1.0 - length(position), 0.0);
    return smoothstep(0.0, 0.01, center);
}

vec2 map_uv(vec2 position) {
    float width = sqrt(max(1.0 - position.y * position.y, 0.0));
    vec2 squeeze = vec2(width, 1.0);
    return asin(position / squeeze) / 3.14159 + 0.5;
}

vec4 mix_add(vec4 color0, vec4 color1) {
    float alpha0 = color0.a;
    float alpha1 = color1.a;
    return vec4(color0.rgb * (alpha0 - alpha1) + color1.rgb * alpha1, alpha0 + alpha1);
}

float absorb(float x, float density) {
    return 1.0 - 1.0 / (x * density + 1.0);
}

void main() {
    vec2 lito_position = vv_Position * 3.0;
    vec2 atmo_position = vv_Position * 2.0;

    float lito_depth = sphere_depth(lito_position);
    float atmo_depth = sphere_depth(atmo_position) - lito_depth;

    vec2 uv_offset = vec2(u_Time, 0.0) / 50.0;
    vec2 uv = map_uv(lito_position) + uv_offset;

    float lito_alpha = sphere_alpha(lito_position);
    float atmo_alpha = absorb(atmo_depth * (2.0 - lito_alpha), 0.2);

    vec3 lito_base = texture2D(u_Texture, uv).rgb * pow(lito_depth, 0.5);
    vec4 lito_color = vec4(lito_base.rgb, lito_alpha);
    vec4 atmo_color = vec4(0.4, 1.0, 0.2, atmo_alpha);

    gl_FragColor = mix_add(lito_color, atmo_color);
}