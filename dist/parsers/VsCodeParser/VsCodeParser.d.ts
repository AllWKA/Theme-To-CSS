import { Colors, ColorsCSSVariables, SemanticTokenColors, Theme, TokenColors } from "./VsCodeTypes";
export declare class VsCodeParser {
    name: string;
    type: string;
    colors: Colors | undefined;
    tokenColors: Array<TokenColors>;
    semanticHighlighting: boolean;
    semanticTokenColors: SemanticTokenColors;
    constructor(theme: Theme);
    getColorsFromComponent(component: string): Colors;
    parseAllColors(): ColorsCSSVariables;
    parseColorsToCssVariables(colors: Colors): ColorsCSSVariables;
    getClassFromScope(scope: string): any;
}
//# sourceMappingURL=VsCodeParser.d.ts.map