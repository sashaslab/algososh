import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './queue-page.module.css'
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const array = React.useRef(new Queue<number>(7))
  const [queue, setQueue] = React.useState<(number | null | string)[]>(Array(7).fill(''));
  const [colorHead, setColorHead] = React.useState(false)
  const [colorTail, setColorTail] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState({
    delete: true,
    clear: true
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    array.current.enqueue(Number(value))
    setButtonDisabled({ ...buttonDisabled, delete: false, clear: false })
    setQueue([...array.current.elements])
    setValue('')
    setColorHead(true)
    await new Promise((res) => setTimeout(res, 500))
    setColorHead(false)
  }

  const onDelete = async() => {
    setColorTail(true);
    await new Promise((res) => setTimeout(res, 500))
    array.current.dequeue()
      setQueue([...array.current.elements])
      setColorTail(false)
  }

  const onClear = () => {
    array.current.clear()
    setQueue(Array(7).fill(''))
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.content}>
          <Input extraClass={style.input} maxLength={4} isLimitText value={value} onChange={handleChangeInput} />
          <Button type="submit" text="Добавить" disabled={value === '' ? true : false} />
          <Button text="Удалить" disabled={array.current.peak() === null ? true : false} onClick={onDelete} />
        </div>
        <Button text="Очистить" disabled={array.current.peak() === null ? true : false} onClick={onClear} />
      </form>
      <div className={style.container}>
        {queue.map((item, index) => {
          return <Circle key={index} letter={item?.toString()} index={index} head={item !== '' && index === array.current.headIndex ? 'head' : ''} tail={item !== '' && index === array.current.tailIndex ? 'tail' : ''} state={(colorHead && index === array.current.tailIndex) || (colorTail && index === array.current.headIndex) ? ElementStates.Changing : ElementStates.Default} />
        })}
      </div>
    </SolutionLayout>
  );
};
