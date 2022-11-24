import MailSent from "./EmailIcon.svg";
import Arrow from "./Arrow.svg";
import Card from "./Card.svg";
import Check from "./Check.svg";
import Coupun from "./Coupun.svg";
import Money from "./Money.svg";
import Ping from "./Ping.svg";

type Props = {
    icon: string;
    color: string;
    width: number;
    height: number;
}

const Icon = ({ color, height, icon, width }:Props)=>{
    return(
        <div style={{width, height}}>
            {icon === "mailSent" && <MailSent color={color}/>}
            {icon === "arrow" && <Arrow color={color}/>}
            {icon === "card" && <Card color={color}/>}
            {icon === "check" && <Check color={color}/>}
            {icon === "coupun" && <Coupun color={color}/>}
            {icon === "money" && <Money color={color}/>}
            {icon === "ping" && <Ping color={color}/>}
        </div>
    );
}

export default Icon;