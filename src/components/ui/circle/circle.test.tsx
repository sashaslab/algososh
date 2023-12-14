import { Circle } from './circle'
import renderer from 'react-test-renderer'
import { ElementStates } from '../../../types/element-states'


describe('Testing the Circle Component', () => {
    test('correct rendering of an element without letters', () => {
        const tree = renderer
        .create(<Circle letter=''/>)
        .toJSON()
        expect(tree).toMatchSnapshot();
    })
    test('correct rendering of an element with letters', () => {
        const tree = renderer
        .create(<Circle letter='1' />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of an element with a head', () => {
        const tree = renderer
        .create(<Circle head='1' />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of an element with a react element in the head', () => {
        const tree = renderer
        .create(<Circle head={<Circle />} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of the element with tail', () => {
        const tree = renderer
        .create(<Circle tail='1' />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of an element with a react element in the tail', () => {
        const tree = renderer
        .create(<Circle tail={<Circle />} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of the element with index', () => {
        const tree = renderer
        .create(<Circle index={1} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of an element with the prop isSmall === true', () => {
        const tree = renderer
        .create(<Circle isSmall={true} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of the element in the default state', () => {
        const tree = renderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of an element in the changing state', () => {
        const tree = renderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct rendering of the element in the modified state', () => {
        const tree = renderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
})