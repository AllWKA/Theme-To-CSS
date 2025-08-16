"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsCodeParser = void 0;
class VsCodeParser {
    constructor(theme) {
        const { name, type, colors, tokenColors, semanticHighlighting, semanticTokenColors } = theme;
        this.name = name;
        this.type = type;
        this.colors = colors;
        this.tokenColors = tokenColors;
        this.semanticHighlighting = semanticHighlighting;
        this.semanticTokenColors = semanticTokenColors;
    }
    getColorsFromComponent(component) {
        if (!component || !component.length) {
            throw new Error('Component type is necessary');
        }
        if (!this.colors) {
            throw new Error('There are no colors in theme');
        }
        const colorsEntries = Object.entries(this.colors);
        if (!colorsEntries || !colorsEntries.length) {
            throw new Error('There are no colors in theme');
        }
        const colorsFromComponent = colorsEntries.filter(colorKeyValue => colorKeyValue[0].startsWith(component));
        if (!colorsFromComponent || !colorsFromComponent.length) {
            throw new Error(`There are no colors in for the component ${component}`);
        }
        return Object.fromEntries(colorsFromComponent);
    }
    parseAllColors() {
        if (!this.colors || !Object.keys(this.colors).length) {
            throw new Error('Theme does not have colors defined');
        }
        const colorsEntries = Object.entries(this.colors);
        const cssVariablesEntries = colorsEntries.map(colorKeyValue => {
            const cssName = `--${colorKeyValue[0].replace('.', '-')}`;
            const color = colorKeyValue[1];
            return [cssName, color];
        });
        return Object.fromEntries(cssVariablesEntries);
    }
    parseColorsToCssVariables(colors) {
        if (!colors || !Object.keys(colors).length) {
            throw new Error('Colors is necessary');
        }
        const colorsEntries = Object.entries(colors);
        const cssVariablesEntries = colorsEntries.map(colorKeyValue => {
            const cssName = `--${colorKeyValue[0].replace('.', '-')}`;
            const color = colorKeyValue[1];
            return [cssName, color];
        });
        return Object.fromEntries(cssVariablesEntries);
    }
    getClassFromScope(scope) {
        const tokenColorForScope = this.tokenColors.find(tokenColors => tokenColors.scope.includes(scope));
        if (!tokenColorForScope) {
            return;
        }
        const { settings } = tokenColorForScope;
        const { foreground, background, fontStyle, bold, italic, underline } = settings;
        let cssClass = {};
        if (foreground) {
            cssClass = { ...cssClass, color: foreground, };
        }
        if (fontStyle) {
            cssClass = { ...cssClass, 'font-style': fontStyle, };
        }
        if (background) {
            cssClass = { ...cssClass, 'background-color': background };
        }
        if (bold) {
            cssClass = { ...cssClass, 'font-weight': 'bold' };
        }
        if (italic) {
            cssClass = { ...cssClass, 'font-style': 'bold' };
        }
        if (underline) {
            cssClass = { ...cssClass, 'text-decoration': 'underline' };
        }
        return cssClass;
    }
}
exports.VsCodeParser = VsCodeParser;
//# sourceMappingURL=VsCodeParser.js.map