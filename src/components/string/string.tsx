import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./string.module.css"
import { Circle } from "../ui/circle/circle";
import { ElementStates } from '../../types/element-states'

export const StringComponent: React.FC = () => {
  const [array, setArray] = useState<string[]>([] );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false)


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  const nextStep = () => {
    if (currentIndex < Math.floor(array.length / 2)) {
      const newArray = [...array];
      const temp = newArray[currentIndex];
      newArray[currentIndex] = newArray[array.length - 1 - currentIndex];
      newArray[array.length - 1 - currentIndex] = temp;
      setButtonLoader(true)
      setArray(newArray);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true)
      setButtonLoader(false)
    }
  };

  React.useEffect(() => {
    if (currentIndex <= Math.floor(array.length / 2)) {
      const timeoutId = setTimeout(() => {
        nextStep();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, array]);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arr = value.split('');
    setArray(arr);
    setValue('');
    setCurrentIndex(0);
    setCompleted(false)
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.content} onSubmit={onSubmit}>
        <Input isLimitText data-testid={'input'} type="text" onChange={handleChangeInput} value={value} maxLength={11}></Input>
        <Button text="Развернуть" data-testid={'button'} isLoader={buttonLoader} type="submit" disabled={value === '' ? true : false}></Button>
      </form>
      <div className={style.container}>
      {array.map((item, index) => {
          return <Circle state={( completed ? ElementStates.Modified : ((index === currentIndex || index === array.length - 1 - currentIndex)) && ((currentIndex !== array.length - 1 - currentIndex)) ? ElementStates.Changing : ((index < currentIndex || index > array.length - 1 - currentIndex)) ? ElementStates.Modified : (currentIndex === array.length - 1 - currentIndex) ? ElementStates.Modified : ElementStates.Default)} letter={item} key={index} />
      })}
      </div>
    </SolutionLayout>
  );
};