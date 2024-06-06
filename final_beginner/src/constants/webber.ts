import no1 from "../assets/images/공준혁.jpg";
import no11 from "../assets/images/김규홍.jpg";
import no15 from "../assets/images/김지원.jpeg";
import no20 from "../assets/images/김채현.png";
import no24 from "../assets/images/김한서.jpeg";
import no6 from "../assets/images/남다은.jpg";
import no14 from "../assets/images/서대원.jpeg";
import no8 from "../assets/images/유승연.png";
import no21 from "../assets/images/유태승.jpg";
import no10 from "../assets/images/윤서진.jpeg";
import no18 from "../assets/images/윤신지.png";
import no3 from "../assets/images/이예림.png";
import no2 from "../assets/images/이재훈.png";
import no17 from "../assets/images/이정우.png";
import no5 from "../assets/images/이지민.jpg";
import no23 from "../assets/images/이지은.png";
import no22 from "../assets/images/이진.jpeg";
import no4 from "../assets/images/임화랑.jpeg";
import no19 from "../assets/images/장정안.png";
import no12 from "../assets/images/정도영.png";
import no13 from "../assets/images/정보운.jpeg";
import no9 from "../assets/images/채연.jpg";
import no7 from "../assets/images/최민준.jpg";
import no16 from "../assets/images/최주용.jpeg";

interface PersonPropTypes {
  id: number;
  personName: string;
  imgSrc: string;

  //1. 성격적인 부분 - 친절한가? 재밌는가? 열정적인가? -> 3가지 선택지
  personality: string; // "kind", "fun", "passion"
  //2. 생활패턴 부분 - 아침형 인간인가? 저녁형 인간인가?
  isMorning: boolean;
  //3. 틀이 잡힌 사람(계획적인 사람)? 자유로운 편인 사람(융통적인 사람)?
  isJ: boolean;
  //4. 실력적인 부분 - 실력이 좋은가? 성장 가능성이 높은가?
  isSkil: boolean;
}

export const webber: PersonPropTypes[] = [
  {
    id: 0,
    personName: "공준혁",
    imgSrc: no1,

    personality: "passion",
    isMorning: true,
    isJ: true,
    isSkil: false,
  },
  {
    id: 1,
    personName: "이재훈",
    imgSrc: no2,

    personality: "passion",
    isMorning: true,
    isJ: true,
    isSkil: true,
  },
  {
    id: 2,
    personName: "김한서",
    imgSrc: no24,

    personality: "kind",
    isMorning: true,
    isJ: true,
    isSkil: false,
  },
  {
    id: 3,
    personName: "이예림",
    imgSrc: no3,

    personality: "passion",
    isMorning: true,
    isJ: false,
    isSkil: false,
  },
  {
    id: 4,
    personName: "임화랑",
    imgSrc: no4,

    personality: "passion",
    isMorning: true,
    isJ: false,
    isSkil: true,
  },
  {
    id: 5,
    personName: "이지민",
    imgSrc: no5,

    personality: "passion",
    isMorning: false,
    isJ: false,
    isSkil: false,
  },
  {
    id: 6,
    personName: "남다은",
    imgSrc: no6,

    personality: "passion",
    isMorning: false,
    isJ: false,
    isSkil: true,
  },
  {
    id: 7,
    personName: "최민준",
    imgSrc: no7,

    personality: "passion",
    isMorning: false,
    isJ: true,
    isSkil: false,
  },
  {
    id: 8,
    personName: "유승연",
    imgSrc: no8,

    personality: "passion",
    isMorning: false,
    isJ: true,
    isSkil: true,
  },

  {
    id: 9,
    personName: "박채연",
    imgSrc: no9,

    personality: "fun",
    isMorning: true,
    isJ: true,
    isSkil: false,
  },

  {
    id: 10,
    personName: "윤서진",
    imgSrc: no10,

    personality: "fun",
    isMorning: true,
    isJ: true,
    isSkil: true,
  },
  {
    id: 11,
    personName: "김규홍",
    imgSrc: no11,

    personality: "fun",
    isMorning: true,
    isJ: false,
    isSkil: false,
  },
  {
    id: 12,
    personName: "정도영",
    imgSrc: no12,

    personality: "fun",
    isMorning: true,
    isJ: false,
    isSkil: true,
  },
  {
    id: 13,
    personName: "정보운",
    imgSrc: no13,

    personality: "fun",
    isMorning: false,
    isJ: false,
    isSkil: false,
  },
  {
    id: 14,
    personName: "서대원",
    imgSrc: no14,

    personality: "fun",
    isMorning: false,
    isJ: false,
    isSkil: true,
  },
  {
    id: 15,
    personName: "김지원",
    imgSrc: no15,

    personality: "fun",
    isMorning: false,
    isJ: true,
    isSkil: false,
  },
  {
    id: 16,
    personName: "최주용",
    imgSrc: no16,

    personality: "fun",
    isMorning: false,
    isJ: true,
    isSkil: true,
  },

  /*
  이재훈
  윤서진
  이정우
  남다은
  장정안 - 5
  최주용
  서대원
  유승연
  유태승
  정도영 - 10
  정보운
  이예림
  김지원
  이진 
  김한서 - 15
  이지민 
  최민준
  임화랑
  박채연
  김채현 - 20
  윤신지 
  김규홍
  김건휘 - 23
  이지은 - 24

*/

  {
    id: 17,
    personName: "이정우",
    imgSrc: no17,

    personality: "kind",
    isMorning: true,
    isJ: true,
    isSkil: true,
  },
  {
    id: 18,
    personName: "윤신지",
    imgSrc: no18,

    personality: "kind",
    isMorning: true,
    isJ: false,
    isSkil: false,
  },
  {
    id: 19,
    personName: "장정안",
    imgSrc: no19,

    personality: "kind",
    isMorning: true,
    isJ: false,
    isSkil: true,
  },
  {
    id: 20,
    personName: "김채현",
    imgSrc: no20,

    personality: "kind",
    isMorning: false,
    isJ: false,
    isSkil: false,
  },
  {
    id: 21,
    personName: "유태승",
    imgSrc: no21,

    personality: "kind",
    isMorning: false,
    isJ: false,
    isSkil: true,
  },
  {
    id: 22,
    personName: "이진",
    imgSrc: no22,

    personality: "kind",
    isMorning: false,
    isJ: true,
    isSkil: false,
  },
  {
    id: 23,
    personName: "이지은",
    imgSrc: no23,

    personality: "kind",
    isMorning: false,
    isJ: true,
    isSkil: true,
  },
];
