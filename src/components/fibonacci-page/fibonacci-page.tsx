import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './fibonacci-page.module.css'
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [array, setArray] = React.useState<number[]>([])
  const [buttonLoader, setButtonLoader] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fibonacci(Number(value))
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const fibonacci = async (n: number) => {
    let arr = [1]
    await new Promise((res) => setTimeout(res, 500))
    setArray([...arr])
    setButtonLoader(true)
    arr.push(1)
    await new Promise((res) => setTimeout(res, 500))
    setArray([...arr])
    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1])
      await new Promise((res) => setTimeout(res, 500))
      setArray([...arr])
    }
    setButtonLoader(false)
    setValue('')
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.content} onSubmit={onSubmit}>
        <Input placeholder="Введите число" isLimitText type="number" max={19} maxLength={2} onChange={handleChangeInput} value={value}></Input>
        <Button isLoader={buttonLoader} type="submit" text="Рассчитать" disabled={(Number(value) >= 1 && Number(value) <= 19) ? false : true}></Button>
      </form>

      <div className={style.container}>
        <div className={style.row}>
          {array.map((item, index) => {
            return <Circle letter={item.toString()} key={index} index={index} />
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
