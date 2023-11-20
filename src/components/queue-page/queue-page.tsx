import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './queue-page.module.css'
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../constants/delays";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const array = React.useRef(new Queue<string>(7))
  const [queue, setQueue] = React.useState<(null | string)[]>(Array(7).fill(''));
  const [colorHead, setColorHead] = React.useState(false)
  const [colorTail, setColorTail] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState({
    delete: true,
    clear: true
  })
  const [buttonLoader, setButtonLoader] = React.useState({
    delete: false,
    clear: false,
    add: false,
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }



  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoader({ ...buttonLoader, add: true })
    array.current.enqueue(value)
    setButtonDisabled({ ...buttonDisabled, delete: false, clear: false })
    setQueue([...array.current.elements])
    setValue('')
    setColorHead(true)
    await delay(SHORT_DELAY_IN_MS)
    setColorHead(false)
    setButtonLoader({ ...buttonLoader, add: false })
  }

  const onDelete = async () => {
    setColorTail(true);
    setButtonLoader({ ...buttonLoader, delete: true })
    await delay(SHORT_DELAY_IN_MS)
    array.current.dequeue()
    setQueue([...array.current.elements])
    setColorTail(false)
    setButtonLoader({...buttonLoader, delete: false})
  }

  const onClear = async () => {
    setButtonLoader({ ...buttonLoader, clear: true })
    await delay(SHORT_DELAY_IN_MS)
    array.current.clear()
    setQueue(Array(7).fill(''))
    setButtonLoader({ ...buttonLoader, clear: false })
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.content}>
          <Input extraClass={style.input} maxLength={4} isLimitText value={value} onChange={handleChangeInput} />
          <Button type="submit" text="Добавить" isLoader={buttonLoader.add} disabled={value === '' || array.current.tailIndex === 6 ? true : false} />
          <Button text="Удалить" isLoader={buttonLoader.delete} disabled={array.current.peak() === null ? true : false} onClick={onDelete} />
        </div>
        <Button text="Очистить" isLoader={buttonLoader.clear} disabled={array.current.peak() === null ? true : false} onClick={onClear} />
      </form>
      <div className={style.container}>
        {queue.map((item, index) => {
          return <Circle key={index} letter={item?.toString()} index={index} head={item !== '' && index === array.current.headIndex ? 'head' : ''} tail={item !== '' && index === array.current.tailIndex ? 'tail' : ''} state={(colorHead && index === array.current.tailIndex) || (colorTail && index === array.current.headIndex) ? ElementStates.Changing : ElementStates.Default} />
        })}
      </div>
    </SolutionLayout>
  );
};
