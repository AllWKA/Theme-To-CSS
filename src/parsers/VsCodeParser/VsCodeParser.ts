import {Colors, ColorsCSSVariables, SemanticTokenColors, Theme, TokenColors} from "./VsCodeTypes";

export class VsCodeParser {
    name: string
    type: string
    colors: Colors | undefined
    tokenColors: Array<TokenColors>
    semanticHighlighting: boolean
    semanticTokenColors: SemanticTokenColors

    constructor(theme: Theme) {
        const {
            name,
            type,
            colors,
            tokenColors,
            semanticHighlighting,
            semanticTokenColors
        } = theme

        this.name = name
        this.type = type
        this.colors = colors
        this.tokenColors = tokenColors
        this.semanticHighlighting = semanticHighlighting
        this.semanticTokenColors = semanticTokenColors
    }

    getColorsFromComponent(component: string): Colors {
        if (!component || !component.length) {
            throw new Error('Component type is necessary')
        }

        if (!this.colors) {
            throw new Error('There are no colors in theme')
        }

        const colorsEntries = Object.entries(this.colors)

        if (!colorsEntries || !colorsEntries.length) {
            throw new Error('There are no colors in theme')
        }

        const colorsFromComponent = colorsEntries.filter(
            colorKeyValue => colorKeyValue[0].startsWith(component)
        )

        if (!colorsFromComponent || !colorsFromComponent.length) {
            throw new Error(`There are no colors in for the component ${component}`)
        }

        return Object.fromEntries(colorsFromComponent)
    }

    parseAllColors(): ColorsCSSVariables {
        if (!this.colors || !Object.keys(this.colors).length) {
            throw new Error('Theme does not have colors defined')
        }

        const colorsEntries = Object.entries(this.colors)

        const cssVariablesEntries = colorsEntries.map(colorKeyValue => {
            const cssName = `--${colorKeyValue[0].replace('.', '-')}`

            const color = colorKeyValue[1]

            return [cssName, color]
        })

        return Object.fromEntries(cssVariablesEntries)
    }

    parseColorsToCssVariables(colors: Colors): ColorsCSSVariables {
        if (!colors || !Object.keys(colors).length) {
            throw new Error('Colors is necessary')
        }

        const colorsEntries = Object.entries(colors)

        const cssVariablesEntries = colorsEntries.map(colorKeyValue => {
            const cssName = `--${colorKeyValue[0].replace('.', '-')}`

            const color = colorKeyValue[1]

            return [cssName, color]
        })

        return Object.fromEntries(cssVariablesEntries)
    }

    getClassFromScope(scope: string) {
        const tokenColorForScope: TokenColors | undefined = this.tokenColors.find(tokenColors => tokenColors.scope.includes(scope))

        if (!tokenColorForScope) {
            return
        }

        const {settings} = tokenColorForScope

        const {
            foreground,
            background,
            fontStyle,
            bold,
            italic,
            underline
        } = settings

        let cssClass: any = {}

        if (foreground) {
            cssClass = {...cssClass, color: foreground,}
        }

        if (fontStyle) {
            cssClass = {...cssClass, 'font-style': fontStyle,}
        }


        if (background) {
            cssClass = {...cssClass, 'background-color': background}
        }

        if (bold) {
            cssClass = {...cssClass, 'font-weight': 'bold'}
        }

        if (italic) {
            cssClass = {...cssClass, 'font-style': 'bold'}
        }

        if (underline) {
            cssClass = {...cssClass, 'text-decoration': 'underline'}
        }

        return cssClass
    }
}
