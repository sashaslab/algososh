import { render, screen, fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer'
import { Button } from "./button";

describe('Button test', () => {
    test('button with text', () => {
        const tree = renderer
        .create(<Button text="text" />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('button without text', () => {
        const tree = renderer
        .create(<Button />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('button disabled', () => {
        const tree = renderer
        .create(<Button disabled={true} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('button loader', () => {
        const tree = renderer
        .create(<Button isLoader={true} />)
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('correct callback when clicking on a button', () => {
        const onClick = jest.fn();
        render(<Button text="click me" onClick={onClick} />)
        const button = screen.getByText("click me");
        fireEvent.click(button)
        expect(onClick).toHaveBeenCalled()
    })
})
