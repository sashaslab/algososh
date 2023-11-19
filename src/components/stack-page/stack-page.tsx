import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './stack.module.css';
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../constants/delays";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {

  const [value, setValue] = React.useState<string>('')
  const array = React.useRef(new Stack<number>())
  const [stack, setStack] = React.useState<number[]>([])
  const [color, setColor] = React.useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = React.useState({
    add: false,
    delete: false,
    clear: false
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoader({...buttonLoader, add: true})
    setColor(true)
    array.current.push(Number(value))
    setStack([...array.current.elements])
    setValue('')
    await delay(SHORT_DELAY_IN_MS)
    setColor(false)
    setButtonLoader({...buttonLoader, add: false})
  }

  const onClickDelete = async () => {
    array.current.pop()
    setButtonLoader({...buttonLoader, delete: true})
    setStack([...array.current.elements]);
    setColor(true);
    await delay(SHORT_DELAY_IN_MS)
    setColor(false);
    setButtonLoader({...buttonLoader, delete: false})
  }

  const onClickClear = async () => {
    setButtonLoader({...buttonLoader, clear: true})
    await delay(SHORT_DELAY_IN_MS)
    array.current.clear()
    setStack([...array.current.elements])
    setButtonLoader({...buttonLoader, clear: false})
  }

  return (
    <SolutionLayout title="Стек">
      <form className={style.content} onSubmit={e => {
        if (value !== '') {
          onSubmit(e)
        } else {
          e.preventDefault()
        }
      }
      }>
        <div className={style.container}>
          <Input placeholder="Введите число" isLimitText type="text" maxLength={4} value={value} extraClass={style.input} onChange={handleChangeInput} />
          <Button type="submit" text="Добавить" isLoader={buttonLoader.add} disabled={value === '' ? true : false} />
          <Button text="Удалить" isLoader={buttonLoader.delete} disabled={stack.length === 0 ? true : false} onClick={onClickDelete} />
        </div>
        <Button text="Очистить" isLoader={buttonLoader.clear} disabled={stack.length === 0 ? true : false} onClick={onClickClear} />
      </form>

      <div className={style.bubble}>
        {stack.map((item, index) => {
          return <Circle key={index} letter={item.toString()} head={index === array.current.size - 1 ? 'top' : null} tail={`${index}`} state={color && index === array.current.size - 1 ? ElementStates.Changing : ElementStates.Default} />
        })}
      </div>
    </SolutionLayout>
  );
};
