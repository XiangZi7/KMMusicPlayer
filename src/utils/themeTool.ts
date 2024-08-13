import { ElMessage } from "element-plus";
/**
 * hex颜色转rgb颜色
 * @param str 颜色值字符串
 * @returns 返回处理后的颜色值
 */
export function hexToRgb(str: string): number[] | void {
    const reg: RegExp = /^#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(str)) {
        ElMessage.warning("输入错误的hex");
        return;
    }
    str = str.replace("#", "");
    const hexs: string[] = str.match(/../g) ?? [];
    const rgb: number[] = hexs.map((h) => parseInt(h, 16));
    return rgb;
}

/**
 * rgb颜色转Hex颜色
 * @param r 代表红色
 * @param g 代表绿色
 * @param b 代表蓝色
 * @returns 返回处理后的颜色值
 */
export function rgbToHex(r: number, g: number, b: number): string | void {
    const reg: RegExp = /^\d{1,3}$/;
    if (!reg.test(String(r)) || !reg.test(String(g)) || !reg.test(String(b))) {
        ElMessage.warning("输入错误的rgb颜色值");
        return;
    }
    const hexs: string[] = [r, g, b].map((n) => n.toString(16).padStart(2, "0"));
    return `#${hexs.join("")}`;
}

/**
 * 加深颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number): string | void {
    const reg: RegExp = /^#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(color)) {
        ElMessage.warning("输入错误的hex颜色值");
        return;
    }
    let rgb: number[] = hexToRgb(color)!;
    rgb = rgb.map((c) => Math.floor(c * (1 - level)));
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * 变浅颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number): string | void {
    const reg: RegExp = /^#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(color)) {
        ElMessage.warning("输入错误的hex颜色值");
        return;
    }
    let rgb: number[] = hexToRgb(color)!;
    rgb = rgb.map((c) => Math.floor((255 - c) * level + c));
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}