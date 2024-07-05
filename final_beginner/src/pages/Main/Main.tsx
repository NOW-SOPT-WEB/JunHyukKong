import { useEffect, useState } from "react";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";

const Main = () => {
  //템플릿 형식을 지정해주지 않으면 당장은 에러 안나도, 나중에 prop driling할 때, 적절한 타입을 추론하지 못한다.
  //특히, step이 계속 undefinend가 되어 발견했음.
  const [showInitBtn, setShowInitBtn] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(true);
  const [chooseObj, setChooseObj] = useState<any[]>([]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    console.log("현재 chooseObj:", chooseObj);
  }, [chooseObj]);

  //트슈. 곧바로 setInit을 넘기면 타입 에러남
  const handleClickInitBtn = () => {
    setInit(true);
    setShowInitBtn(false);
    setStep(0);
    setChooseObj([]);
  };
  return (
    <>
      <Header
        showInitBtn={showInitBtn}
        handleClickInitBtn={handleClickInitBtn}
      />
      <Body
        isInit={init}
        setInit={setInit}
        setShowInitBtn={setShowInitBtn}
        setChooseObj={setChooseObj}
        setStep={setStep}
        step={step}
        chooseObj={chooseObj}
      />
    </>
  );
};

export default Main;
