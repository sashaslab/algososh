import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './list-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./list";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";


interface ITmp {
  value: string;
  index: number | null;
  head: boolean;
}

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = React.useState('');
  const [inputIndex, setInputIndex] = React.useState('');
  const array = React.useRef(new LinkedList([0, 34, 8, 1]))
  const [list, setList] = React.useState(array.current.toArray())
  const [tmp, setTmp] = React.useState<ITmp>({ value: '', index: null, head: true })
  const [color, setColor] = React.useState(ElementStates.Default);
  const [counter, setCounter] = React.useState(-1);
  const [sortByIndex, setSortByIndex] = React.useState(false);
  const [buttonsDisabled, setButtonsDisabled] = React.useState({
    addToHead: false,
    addToTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false
  });
  const [buttonsLoader, setButtonsLoader] = React.useState({
    addToHead: false,
    addToTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false
  });

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleChangeInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value)
  }

  const addToHead = async () => {
    array.current.prepend(Number(inputValue))
    setTmp({ value: inputValue, index: 0, head: true })
    setButtonsLoader({ ...buttonsLoader, addToHead: true })
    setButtonsDisabled({
      ...buttonsDisabled,
      addToTail: true,
      deleteFromHead: true,
      deleteFromTail: true,
      addByIndex: true,
      deleteByIndex: true
    })
    await new Promise((res) => setTimeout(res, 500))
    setList([...array.current.toArray()])
      setTmp({ value: '', index: 0, head: true })
      setInputValue('')
      setButtonsLoader({ ...buttonsLoader, addToHead: false })
      setButtonsDisabled({
        ...buttonsDisabled,
        addToTail: false,
        deleteFromHead: false,
        deleteFromTail: false,
        addByIndex: false,
        deleteByIndex: false
      })
    await new Promise((res) => {
      setTimeout(res, 500)
      setColor(ElementStates.Modified)
    })
    setColor(ElementStates.Default)
  }

  const addToTail = async () => {
    array.current.append(Number(inputValue))
    setTmp({ value: inputValue, index: array.current.size - 2, head: true })
    setButtonsLoader({ ...buttonsLoader, addToTail: true })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: true,
      deleteFromHead: true,
      deleteFromTail: true,
      addByIndex: true,
      deleteByIndex: true
    })
    await new Promise((res) => setTimeout(res, 500))
    setList([...array.current.toArray()])
    setTmp({ value: '', index: array.current.size - 1, head: true })
    setInputValue('')
    setButtonsLoader({ ...buttonsLoader, addToTail: false })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: false,
      deleteFromHead: false,
      deleteFromTail: false,
      addByIndex: false,
      deleteByIndex: false
    })
    await new Promise((res) => {
      setTimeout(res, 500)
      setColor(ElementStates.Modified)
    })
    setColor(ElementStates.Default)
  }

  const deleteFromHead = async () => {
    array.current.deleteHead()
    setTmp({ value: '', index: 0, head: false })
    setButtonsLoader({ ...buttonsLoader, deleteFromHead: true })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: true,
      addToTail: true,
      deleteFromTail: true,
      addByIndex: true,
      deleteByIndex: true
    })
    await new Promise((res) => setTimeout(res, 500))
    setList([...array.current.toArray()]);
    setTmp({ value: '', index: null, head: false })
    setButtonsLoader({ ...buttonsLoader, deleteFromHead: false })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: false,
      addToTail: false,
      deleteFromTail: false,
      addByIndex: false,
      deleteByIndex: false
    })
    setInputValue('')
  }

  const deleteFromTail = async () => {
    array.current.deleteTail()
    setTmp({ value: '', index: array.current.size, head: false })
    setButtonsLoader({ ...buttonsLoader, deleteFromTail: true })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: true,
      addToTail: true,
      deleteFromHead: true,
      addByIndex: true,
      deleteByIndex: true
    })
    await new Promise((res) => setTimeout(res, 500))
    setList([...array.current.toArray()])
    setTmp({ value: '', index: null, head: false })
    setButtonsLoader({ ...buttonsLoader, deleteFromTail: false })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: false,
      addToTail: false,
      deleteFromHead: false,
      addByIndex: false,
      deleteByIndex: false
    })
    setInputValue('')
  }

  const addByIndex = async () => {
    setSortByIndex(true)
    const index = Number(inputIndex)
    array.current.addByIndex(Number(inputValue), Number(inputIndex));
    setButtonsLoader({ ...buttonsLoader, addByIndex: true })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: true,
      addToTail: true,
      deleteFromHead: true,
      deleteFromTail: true,
      deleteByIndex: true
    })
    for (let i = 0; i <= index; i++) {
      await new Promise((res) => setTimeout(res, 500))
      setTmp({ value: inputValue, index: i, head: true })
      setColor(ElementStates.Changing)
      setCounter(i)
    }
    await new Promise((res) => setTimeout(res, 500))
    setCounter(-1)
    setSortByIndex(false)
    setColor(ElementStates.Modified);
    setTimeout(() => {
      setColor(ElementStates.Default);
    }, 500);
    setList([...array.current.toArray()])
    setTmp({ value: '', index: index, head: true })
    setButtonsLoader({ ...buttonsLoader, addByIndex: false })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: false,
      addToTail: false,
      deleteFromHead: false,
      deleteFromTail: false,
      deleteByIndex: false
    })
    setInputValue('')
    setInputIndex('')
  }

  const deleteByIndex = async () => {
    setSortByIndex(true)
    const index = Number(inputIndex);
    array.current.deleteByIndex(Number(inputIndex));
    setButtonsLoader({ ...buttonsLoader, deleteByIndex: true })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: true,
      addToTail: true,
      addByIndex: true,
      deleteFromHead: true,
      deleteFromTail: true
    })
    for (let i = 0; i <= index; i++) {
      await new Promise((res) => setTimeout(res, 500))
      setTmp({ value: inputValue, index: i, head: true })
      setColor(ElementStates.Changing)
      setCounter(i)
    }
    await new Promise((res) => setTimeout(res, 500))
    setTmp({ value: '', index: index, head: false })
    await new Promise((res) => setTimeout(res, 500))
    setList([...array.current.toArray()])
    setTmp({ value: '', index: null, head: true })
    setCounter(-1)
    setSortByIndex(false)
    setColor(ElementStates.Modified);
    setTimeout(() => {
      setColor(ElementStates.Default);
    }, 500);
    setButtonsLoader({ ...buttonsLoader, deleteByIndex: false })
    setButtonsDisabled({
      ...buttonsDisabled, addToHead: false,
      addToTail: false,
      addByIndex: false,
      deleteFromHead: false,
      deleteFromTail: false
    })
    setInputValue('')
    setInputIndex('')
  }

  const inputValueDisabled = buttonsLoader.addToHead || buttonsLoader.addToTail || buttonsLoader.addByIndex || buttonsLoader.deleteByIndex || buttonsLoader.deleteFromHead || buttonsLoader.deleteFromTail

  const inputIndexDisabled = buttonsLoader.addToHead || buttonsLoader.addToTail || buttonsLoader.addByIndex || buttonsLoader.deleteByIndex || buttonsLoader.deleteFromHead || buttonsLoader.deleteFromTail

  return (
    <SolutionLayout title="Связный список">
      <div className={style.container}>
        <form className={style.enter_value}>
          <Input disabled={inputValueDisabled} isLimitText type="text" maxLength={4} extraClass={style.input} placeholder="Введите значение" value={inputValue} onChange={handleChangeInputValue} />
          <div className={style.buttons_value}>
            <Button extraClass={style.button_value} isLoader={buttonsLoader.addToHead} disabled={buttonsDisabled.addToHead} onClick={addToHead} text="Добавить в head" />
            <Button extraClass={style.button_value} isLoader={buttonsLoader.addToTail} disabled={buttonsDisabled.addToTail} text="Добавить в tail" onClick={addToTail} />
            <Button extraClass={style.button_value} isLoader={buttonsLoader.deleteFromHead} disabled={buttonsDisabled.deleteFromHead} text="Удалить из head" onClick={deleteFromHead} />
            <Button extraClass={style.button_value} isLoader={buttonsLoader.deleteFromTail} disabled={buttonsDisabled.deleteFromTail} text="Удалить из tail" onClick={deleteFromTail} />
          </div>
        </form>
        <form className={style.enter_index}>
          <Input disabled={inputIndexDisabled} type="number" extraClass={style.input} placeholder="Введите индекс" onChange={handleChangeInputIndex} value={inputIndex} />
          <div className={style.buttons_index}>
            <Button extraClass={style.button_index} isLoader={buttonsLoader.addByIndex} disabled={buttonsDisabled.addByIndex} text="Добавить по индексу" onClick={addByIndex} />
            <Button extraClass={style.button_index} isLoader={buttonsLoader.deleteByIndex} disabled={buttonsDisabled.deleteByIndex} text="Удалить по индексу" onClick={deleteByIndex} />
          </div>
        </form>
      </div>
      <div className={style.bubble}>
        {list.map((item, index) => {
          return (
            <div className={style.list} key={index}>
              <Circle
                letter={!tmp.head && !tmp.value && index === tmp.index ? '' : item.toString()}
                head={tmp.head && tmp.value && index === tmp.index
                  ? (<Circle letter={tmp.value} isSmall state={ElementStates.Changing} />)
                  : index === 0 ? 'head' : null}
                tail={!tmp.head && !tmp.value && index === tmp.index
                  ? (<Circle letter={item.toString()} isSmall state={ElementStates.Changing} />)
                  : index === list.length - 1
                    ? 'tail'
                    : null}
                index={index}
                state={index < counter ? color : index === tmp.index && !sortByIndex ? color : ElementStates.Default} />
              {index !== list.length - 1 ? <ArrowIcon /> : null}
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
