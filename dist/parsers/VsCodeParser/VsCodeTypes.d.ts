export type SemanticTokenColor = {
    foreground?: string;
    italic?: boolean;
    bold?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    fontStyle?: string;
};
export type Settings = {
    foreground?: string;
    background?: string;
    fontStyle?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
};
export type TokenColors = {
    scope: string | string[];
    settings: Settings;
};
export type Colors = {
    [key: string]: string;
};
export type SemanticTokenColors = {
    [key: string]: string | SemanticTokenColor;
};
export type Theme = {
    name: string;
    type: string;
    colors?: Colors;
    tokenColors: Array<TokenColors>;
    semanticHighlighting: boolean;
    semanticTokenColors: SemanticTokenColors;
};
export type ColorsCSSVariables = {
    [key: `--${string}`]: string;
};
//# sourceMappingURL=VsCodeTypes.d.ts.map