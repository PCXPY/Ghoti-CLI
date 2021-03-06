require! {
    path
    'chai': { expect, assert }
    '../../../src/func/parser/comments': { addComments, determinLanguage }
}

describe 'test comments adding parser', ->

    specify 'test file type determin1', ->
        const test1 = determinLanguage 'test.js'
        const test2 = determinLanguage 'test.ls'
        const test3 = determinLanguage 'test.ts'
        (expect <| test1) .to.be.equal 'javascript'
        (expect <| test2) .to.be.equal 'livescript'
        (expect <| test3) .to.be.equal 'typescript'
        void
    
    specify 'test file type determin2', ->
        const test1 = determinLanguage 'test.py'
        const test2 = determinLanguage 'test.test.js'
        const test3 = determinLanguage 'test.go'
        (expect <| test1) .to.be.equal 'python'
        (expect <| test2) .to.be.equal 'javascript'
        (expect <| test3) .to.be.equal 'golang'
        void

describe 'test comments adding', ->

    specify 'test add simple overview', ->
        const result1 = [
            '/**'
            ' * @overview generated by ghoti-cli'
            ' * @fileoverview ${|overview|}'
            ' */'
            ''
            'console.log(1)'
        ].join '\r\n'
        const test1 = addComments 'test.js', 'console.log(1)'
        (expect <| test1) .to.be.equal result1
    
    specify 'test add replaces overview', ->
        const result1 = [
            '/**'
            ' * @overview generated by ghoti-cli'
            ' * @fileoverview hahha'
            ' */'
            ''
            'console.log(1)'
        ].join '\r\n'
        const test1 = addComments 'test.js', 'console.log(1)', [
            {
                name: 'overview'
                value: 'hahha'
            }
        ]
        (expect <| test1) .to.be.equal result1
        const result2 = [
            '/**'
            ' * @overview generated by ghoti-cli'
            ' * @fileoverview hahha'
            ' */'
            ''
            'console.log(2)'
        ].join '\r\n'
        const test2 = addComments 'test.js', 'console.log(2)', [
            {
                name: 'overview'
                value: 'hahha'
            }
        ]
        (expect <| test2) .to.be.equal result2