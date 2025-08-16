import {VsCodeParser} from "./VsCodeParser";
import testTheme from '../../vscodethemes/test-theme/themes/test-theme-color-theme.json'
import {colorsComponents} from "./VSCodeConstants";

describe('VsCodeParser', () => {
    describe('colors', () => {
        describe('get component colors', () => {
            const vsCodeParser = new VsCodeParser(testTheme)

            describe('success', () => {
                for (const colorsComponent of colorsComponents) {
                    it(`gets ${colorsComponent} colors`, () => {
                        const colors = vsCodeParser.getColorsFromComponent(colorsComponent)

                        expect(Object.keys(colors).length).toBeGreaterThan(0)
                    })
                }
            })

            describe('fails', () => {
                it('missing component', () => {
                    expect(() => vsCodeParser.getColorsFromComponent("")).toThrow(new Error('Component type is necessary'))
                });

                it('no colors in theme', function () {
                    const vsCodeParser = new VsCodeParser({...testTheme, colors: {}})

                    expect(() => vsCodeParser.getColorsFromComponent(colorsComponents[0])).toThrow(new Error('There are no colors in theme'))
                });

                it('no colors in theme', function () {
                    const vsCodeParser = new VsCodeParser({...testTheme, colors: undefined})

                    expect(() => vsCodeParser.getColorsFromComponent(colorsComponents[0])).toThrow(new Error('There are no colors in theme'))
                });

                it('no colors for component', function () {
                    const vsCodeParser = new VsCodeParser(testTheme)

                    expect(() => vsCodeParser.getColorsFromComponent('InventedComponent')).toThrow(new Error('There are no colors in for the component InventedComponent'))
                });
            })
        })

        describe('parse colors to css variables', () => {
            const vsCodeParser = new VsCodeParser(testTheme)

            describe('success', () => {
                for (const colorsComponent of colorsComponents) {
                    it(`parse ${colorsComponent} colors to css variables`, () => {
                        const colors = vsCodeParser.getColorsFromComponent(colorsComponent)

                        const cssVariables = vsCodeParser.parseColorsToCssVariables(colors)

                        const cssVariablesKeys = Object.keys(cssVariables)

                        expect(cssVariablesKeys.length).toBeGreaterThan(0)

                        expect(cssVariablesKeys.some(str => str.includes('.'))).toBeFalsy()
                    })
                }
            })

            describe('fails', () => {
                it('no colors', () => {
                    expect(() => vsCodeParser.parseColorsToCssVariables({})).toThrow(new Error('Colors is necessary'))
                });
            })
        })

        describe('parse all colors', () => {
            it('parses all colors in theme', () => {
                const vsCodeParser = new VsCodeParser(testTheme)

                const cssVariables = vsCodeParser.parseAllColors()

                const themeTotalColors = Object.keys(testTheme.colors).length

                const cssVariablesKeys = Object.keys(cssVariables)

                expect(cssVariablesKeys.length).toEqual(themeTotalColors)

                expect(cssVariablesKeys.some(str => str.includes('.'))).toBeFalsy()
            });

            it('fails for undefined colors in theme', () => {
                const vsCodeParser = new VsCodeParser({...testTheme, colors: undefined})

                expect(() => vsCodeParser.parseAllColors()).toThrow(new Error('Theme does not have colors defined'))
            });

            it('fails for empty colors in theme', () => {
                const vsCodeParser = new VsCodeParser({...testTheme, colors: {}})

                expect(() => vsCodeParser.parseAllColors()).toThrow(new Error('Theme does not have colors defined'))
            });
        })
    })
    describe('token colors', () => {
        it('should ', function () {
            const vsCodeParser = new VsCodeParser(testTheme)

            const cssClass = vsCodeParser.getClassFromScope("comment")

            expect(cssClass).toEqual({ color: '#6A9955', 'font-style': 'italic' })
        });
    })
})
