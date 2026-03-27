import { describe, it, expect } from "vitest";
import { errorSvg } from "../../lib/render/error_svg.js";

describe("errorSvg", () => {
    it("should render SVG with correct error message and theme", () => {
        
        const theme = {
            bg: "#1e1e2e",       
            border: "#f38ba8",   
            text: "#cdd6f4",     
            accent: "#f38ba8"
        };
        const errorType = "An error occurred";
        const message = "Something went wrong";
        const svg = errorSvg({errorType, message});
        expect(svg).toContain(errorType);
        expect(svg).toContain(message);
        expect(svg).toContain(`fill="${theme.bg}"`);
        expect(svg).toContain(`stroke="${theme.border}"`);
        expect(svg).toContain(`fill="${theme.text}"`);
        expect(svg).toContain(`fill="${theme.accent}"`);
        expect(svg).toContain(`fill="${theme.accent}"`);
    });
});