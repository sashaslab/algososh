import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import style from './sorting.module.css'
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../constants/delays";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<{ number: number, state: ElementStates }[]>([])
  const [checked, setChecked] = React.useState<string>('select');
  const [buttonLoader, setButtonLoader] = React.useState({
    ascending: false,
    descending: false,
  });

  const [buttonDisabled, setButtonDisabled] = React.useState({
    ascending: false,
    descending: false,
    newArray: false
  })

  const handleRadioChanhge = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value)
  }

  const randomArr = () => {
    const length = Math.floor(Math.random() * 15) + 3;
    const min = 0;
    const max = 100;
    const randomArray = [];
    for (let i = 0; i < length; i++) {
      const value = Math.floor(Math.random() * (max - min + 1)) + min;
      randomArray.push({ number: value, state: ElementStates.Default })
    }
    setArray(randomArray)
  }

  React.useEffect(() => {
    randomArr()
  }, [])

  const selectSort = async (type: string) => {
    const newArray = [...array];
    let min;
    for (let i = 0; i < newArray.length - 1; i++) {
      min = i;
      newArray[min].state = ElementStates.Changing;
      setArray([...newArray]);
      await delay(DELAY_IN_MS)
      for (let j = i + 1; j < newArray.length; j++) {
        newArray[j].state = ElementStates.Changing
        setArray([...newArray])
        await delay(DELAY_IN_MS)
        if (type === 'ascending' && newArray[j].number < newArray[min].number) {
          min = j
          newArray[j].state = ElementStates.Default;
          i === min ? newArray[min].state = ElementStates.Changing : newArray[min].state = ElementStates.Default;

        } else if (type === 'descending' && newArray[j].number > newArray[min].number) {
          min = j
          newArray[j].state = ElementStates.Default
          i === min ? newArray[min].state = ElementStates.Changing : newArray[min].state = ElementStates.Default
        }
        if (j !== min) {
          newArray[j].state = ElementStates.Default
        }
        setArray([...newArray])

      }
      const temp = newArray[i];
      newArray[i] = newArray[min];
      newArray[min] = temp
      newArray[min].state = ElementStates.Default
      newArray[i].state = ElementStates.Modified
      setArray(newArray)
    }
    setButtonDisabled({ ...buttonDisabled, ascending: false, descending: false, newArray: false })
    setButtonLoader({ ...buttonLoader, ascending: false, descending: false })
  }

  const bubbleSort = async (type: string) => {
    const newArray = [...array];
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - 1 - i; j++) {
        newArray[j].state = ElementStates.Changing;
        newArray[j + 1].state = ElementStates.Changing
        setArray([...newArray])
        await delay(DELAY_IN_MS)
        if (type === 'ascending' && newArray[j].number > newArray[j + 1].number) {
          const temp = newArray[j].number;
          newArray[j].number = newArray[j + 1].number;
          newArray[j + 1].number = temp
        } else if (type === 'descending' && newArray[j].number < newArray[j + 1].number) {
          const temp = newArray[j].number;
          newArray[j].number = newArray[j + 1].number;
          newArray[j + 1].number = temp
        }
        newArray[j].state = ElementStates.Default
        if (newArray[j + 1]) {
          newArray[j + 1].state = ElementStates.Default
        }
        setArray([...newArray])
      }
      newArray[newArray.length - i - 1].state = ElementStates.Modified
    }
    setButtonDisabled({ ...buttonDisabled, ascending: false, descending: false, newArray: false })
    setButtonLoader({ ...buttonLoader, ascending: false, descending: false })
  }

  const onClickAscending = () => {
    setButtonDisabled({ ...buttonDisabled, descending: true, newArray: true })
    setButtonLoader({ ...buttonLoader, ascending: true })
    if (checked === 'select') {
      selectSort('ascending')
    } else {
      bubbleSort('ascending')
    }
  }

  const onClickDescending = () => {
    setButtonDisabled({ ...buttonDisabled, ascending: true, newArray: true })
    setButtonLoader({ ...buttonLoader, descending: true })
    if (checked === 'select') {
      selectSort('descending')
    } else {
      bubbleSort('descending')
    }
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.content}>
        <div className={style.radio}>
          <RadioInput checked={checked === 'select'} label="Выбор" name="name" value='select' onChange={handleRadioChanhge} />
          <RadioInput checked={checked === 'bubble'} label="Пузырёк" name="name" value='bubble' onChange={handleRadioChanhge} />
        </div>
        <div className={style.sorting}>
          <Button sorting={Direction.Ascending} isLoader={buttonLoader.ascending} disabled={buttonDisabled.ascending} text="По возростанию" onClick={onClickAscending} />
          <Button sorting={Direction.Descending} isLoader={buttonLoader.descending} disabled={buttonDisabled.descending} text="По убыванию" onClick={onClickDescending} />
        </div>
        <Button text="Новый массив" disabled={buttonDisabled.newArray} onClick={randomArr} />
      </div>
      <div className={style.column}>
        {array.map((item, index) => {
          return <Column index={item.number} key={index} state={item.state} />
        })}
      </div>
    </SolutionLayout>
  );
};
